<?php

require_once LP . 'DB/Adapter/DBInterface.php';

define('DB_ADAPTER_SKIP', log(0));

abstract class DB_Adapter_Generic_DB implements DB_Adapter_DBInterface
{
    const ARRAY_KEY_COL = 'ARRAY_KEY';
    const PARENT_KEY_COL = 'PARENT_KEY';
    const MAX_LOG_ROW_LEN = 128;

    private $_identPrefix = '';
    private $_statistics = array(
        'time' => 0,
        'count' => 0,
    );

    protected $_lastQuery;
    private $_logger;
    private $_placeholderArgs, $_placeholderNativeArgs, $_placeholderCache = array();
    private $_placeholderNoValueFound;

    public function getLastQuery($inline = false)
    {
        $q = $this->_lastQuery;
        if (is_array($q)) {
            $this->_expandPlaceholders($q);
            $q = $q[0];
        }
        if ($inline) {
            $q = preg_replace('{(\s{2,})}', ' ', trim($q));
        }
        return $q;
    }

    public function blob($blob_id = null)
    {
        return $this->_performNewBlob($blob_id);
    }

    public function transaction($mode = null)
    {
        $this->_logQuery('-- START TRANSACTION ' . $mode);
        return $this->_performTransaction($mode);
    }

    public function commit()
    {
        $this->_logQuery('-- COMMIT');
        return $this->_performCommit();
    }

    public function rollback()
    {
        $this->_logQuery('-- ROLLBACK');
        return $this->_performRollback();
    }

    public function select($query)
    {
        $total = false;
        $args = func_get_args();
        return $this->_query($args, $total);
    }

    public function selectPage(&$total, $query)
    {
        $total = true;
        $args = func_get_args();
        array_shift($args);
        return $this->_query($args, $total);
    }

    public function selectRow($query)
    {
        $total = false;
        $args = func_get_args();
        $rows = $this->_query($args, $total);
        if (!is_array($rows)) {
            return $rows;
        }
        if (!count($rows)) {
            return array();
        }
        reset($rows);
        return current($rows);
    }

    public function selectCol($query)
    {
        $total = false;
        $args = func_get_args();
        $rows = $this->_query($args, $total);
        if (!is_array($rows)) {
            return $rows;
        }
        $this->_shrinkLastArrayDimensionCallback($rows);
        return $rows;
    }

    public function selectCell($query)
    {
        $total = false;
        $args = func_get_args();
        $rows = $this->_query($args, $total);
        if (!is_array($rows)) {
            return $rows;
        }
        if (!count($rows)) {
            return null;
        }
        reset($rows);
        $row = current($rows);
        if (!is_array($row)) {
            return $row;
        }
        reset($row);
        return current($row);
    }

    public function query($query)
    {
        $total = false;
        $args = func_get_args();
        return $this->_query($args, $total);
    }

    public function escape($s, $isIdent = false)
    {
        return $this->_performEscape($s, $isIdent);
    }

    public function setLogger(DB_Adapter_LoggerInterface $logger)
    {
        $prev = $this->_logger;
        $this->_logger = $logger;
        return $prev;
    }

    public function setIdentPrefix($prefix = null)
    {
        $old = $this->_identPrefix;
        if (!is_null($prefix)) {
            $this->_identPrefix = $prefix;
        }
        return $old;
    }

    public function getStatistics()
    {
        return $this->_statistics;
    }

    protected abstract function _performEscape($s, $isIdent = false);

    protected abstract function _performNewBlob($blobid = null);

    protected abstract function _performGetBlobFieldNames($result);

    protected abstract function _performTransformQuery(array& $queryMain, $how);

    protected abstract function _performQuery(array $queryMain);

    protected abstract function _performFetch($result);

    protected abstract function _performTransaction($mode = null);

    protected abstract function _performCommit();

    protected abstract function _performRollback();

    protected abstract function _performGetPlaceholderIgnoreRe();

    protected abstract function _performGetNativePlaceholderMarker($n);

    private function _query(array $query, &$total)
    {
        $this->attributes = $this->_transformQuery($query, 'GET_ATTRIBUTES');
        if ($total) {
            $this->_transformQuery($query, 'CALC_TOTAL');
        }

        $this->_logQuery($query);
        $qStart = $this->_microtime();
        $result = $this->_performQuery($query);
        $fetchTime = $firstFetchTime = 0;

        if (is_resource($result)) {
            $rows = array();
            $fStart = $this->_microtime();
            $row = $this->_performFetch($result);
            $firstFetchTime = $this->_microtime() - $fStart;

            if (!is_null($row)) {
                $rows[] = $row;
                while ($row = $this->_performFetch($result)) {
                    $rows[] = $row;
                }
            }
            $fetchTime = $this->_microtime() - $fStart;
        } else {
            $rows = $result;
        }

        $queryTime = $this->_microtime() - $qStart;
        $this->_logQueryStat($queryTime, $fetchTime, $firstFetchTime, $rows);
        $blobs_exist = is_array($rows) && !empty($this->attributes['BLOB_OBJ']);

        if ($blobs_exist) {
            $blobFieldNames = $this->_performGetBlobFieldNames($result);
            foreach ($blobFieldNames as $name) {
                for ($r = count($rows) - 1; $r >= 0; $r--) {
                    $rows[$r][$name] = & $this->_performNewBlob($rows[$r][$name]);
                }
            }
        }

        $result = $this->_transformResult($rows);
        if (is_array($result) && $total) {
            $this->_transformQuery($query, 'GET_TOTAL');
            $total = $this->selectCell($query);
        }

        return $result;
    }

    private function _transformQuery(array& $query, $how)
    {
        // Do overriden transformation.
        $result = $this->_performTransformQuery($query, $how);
        if ($result === true) {
            return $result;
        }

        // Do common transformations.
        switch ($how) {
            case 'GET_ATTRIBUTES':
            {
                $options = array();
                $q = $query[0];
                $m = null;

                while (preg_match('/^ \s* -- [ \t]+ (\w+): ([^\r\n]+) [\r\n]* /sx', $q, $m)) {
                    $options[$m[1]] = trim($m[2]);
                    $q = substr($q, strlen($m[0]));
                }

                return $options;
                break;
            }
        }
    }

    protected function _expandPlaceholders(&$queryAndArgs, $useNative = false)
    {
        $cacheCode = null;
        // @todo Determine, why Dmitry use PH cache only with logging
        if ($this->_logger) {
            // Serialize is much faster than placeholder expansion. So use caching.
            $cacheCode = md5(serialize($queryAndArgs) . '|' . $useNative . '|' . $this->_identPrefix);
            if (isset($this->_placeholderCache[$cacheCode])) {
                $queryAndArgs = $this->_placeholderCache[$cacheCode];
                return;
            }
        }

        if (!is_array($queryAndArgs)) {
            $queryAndArgs = array($queryAndArgs);
        }

        $this->_placeholderNativeArgs = $useNative ? array() : null;
        $this->_placeholderArgs = array_reverse($queryAndArgs);
        $query = array_pop($this->_placeholderArgs);
        // Do all the work.
        $this->_placeholderNoValueFound = false;
        $query = $this->_expandPlaceholdersFlow($query);

        if ($useNative) {
            array_unshift($this->_placeholderNativeArgs, $query);
            $queryAndArgs = $this->_placeholderNativeArgs;
        } else {
            $queryAndArgs = array($query);
        }

        if ($cacheCode) {
            $this->_placeholderCache[$cacheCode] = $queryAndArgs;
        }
    }

    private function _expandPlaceholdersFlow($query)
    {
        $re = '{
            (?>
                # Ignored chunks.
                (?>
                    # Comment.
                    -- [^\r\n]*
                )
            |
                (?>
                    # DB-specifics.
                    ' . trim($this->_performGetPlaceholderIgnoreRe()) . '
                )
            )
        |
            (?>
                # Optional blocks
                \{
                    # Use "+" here, not "*"! Else nested blocks are not processed well.
                    ( (?> (?>[^{}]+)  |  (?R) )* )             #1
                \}
            )
        |
            (?>
                # Placeholder
                (\?) ( [_dsafn\#]? )                           #2 #3
            )
        }sx';

        $query = preg_replace_callback($re, array($this, '_expandPlaceholdersCallback'), $query);
        return $query;
    }

    private function _expandPlaceholdersCallback($m)
    {
        // Placeholder.
        if (!empty($m[2])) {
            $type = $m[3];

            // Idenifier prefix.
            if ($type == '_') {
                return $this->_identPrefix;
            }

            // Value-based placeholder.
            if (!$this->_placeholderArgs) {
                return 'DB_ADAPTER_ERROR_NO_VALUE';
            }

            $value = array_pop($this->_placeholderArgs);
            if (DB_ADAPTER_SKIP === $value) {
                $this->_placeholderNoValueFound = true;
                return '';
            }

            // First process guaranteed non-native placeholders.
            switch ($type) {
                case 'a': // Array
                    if (!$value) {
                        $this->_placeholderNoValueFound = true;
                    }
                    if (!is_array($value)) {
                        return 'DB_ADAPTER_ERROR_VALUE_NOT_ARRAY';
                    }

                    $parts = array();
                    foreach ($value as $k => $v) {
                        if ($v === null) {
                            $v = 'NULL';
                        } elseif (is_string($v)) {
                            $v = $this->escape($v);
                        } elseif (is_bool($v)) {
                            $v = (int)$v;
                        } elseif (!is_numeric($v)) {
                            $v = 'DB_ADAPTER_ERROR_VALUE';
                        }

                        if (!is_int($k)) {
                            $k = $this->escape($k, $isIdent = true);
                            $parts[] = "$k=$v";
                        } else {
                            $parts[] = $v;
                        }
                    }
                    return join(', ', $parts);
                    break;

                case "#": // Identifier
                    if (!is_array($value)) {
                        return $this->escape($value, $isIdent = true);
                    }
                    $parts = array();
                    foreach ($value as $table => $identifier) {
                        if (!is_string($identifier)) {
                            return 'DB_ADAPTER_ERROR_ARRAY_VALUE_NOT_STRING';
                        }
                        // Else we gonna construct simething like `field` or `tbl`.`field`
                        $parts[] = (!is_int($table) ? $this->escape($table, true) . '.' : '')
                            . $this->escape($identifier, true);
                    }
                    return join(', ', $parts);
                    break;

                case 'n': // Key
                    return empty($value) ? 'NULL' : intval($value);
                    break;
            }

            // Native arguments are not processed.
            if ($this->_placeholderNativeArgs !== null) {
                $this->_placeholderNativeArgs[] = $value;
                return $this->_performGetNativePlaceholderMarker(count($this->_placeholderNativeArgs) - 1);
            }

            // In non-native mode arguments are quoted.
            if ($value === null) {
                return 'NULL';
            }

            switch ($type) {
                case '':
                    if (!is_scalar($value)) {
                        return 'DB_ADAPTER_ERROR_VALUE_NOT_SCALAR';
                    } else {
                        return $this->escape($value);
                    }
                    break;

                case 'd':
                    return intval($value);
                    break;

                case 'f':
                    return str_replace(',', '.', floatval($value));
                    break;
            }
            // By default - escape as string
            return $this->escape($value);
        }

        // Optional block
        if (isset($m[1]) && strlen($block = $m[1])) {
            $prev = @$this->_placeholderNoValueFound;
            $block = $this->_expandPlaceholdersFlow($block);
            $block = $this->_placeholderNoValueFound ? '' : ' ' . $block . ' ';
            $this->_placeholderNoValueFound = $prev; // recurrent-safe
            return $block;
        }
        // Default: skipped part of the string.
        return $m[0];
    }

    private static function _microtime()
    {
        $t = explode(' ', microtime());
        return $t[0] + $t[1];
    }

    protected static function _fieldList2Count($fields)
    {
        $m = null;
        if (preg_match('/^\s* DISTINCT \s* (.*)/sx', $fields, $m)) {
            $fields = $m[1];
            $fields = preg_replace('/\s+ AS \s+ .*? (?=,|$)/sx', '', $fields);
            return "COUNT(DISTINCT $fields)";
        } else {
            return 'COUNT(*)';
        }
    }

    private static function _transformResult($rows)
    {
        // Process ARRAY_KEY feature.
        if (is_array($rows) && $rows) {
            // Find ARRAY_KEY* AND PARENT_KEY fields in field list.
            $pk = null;
            $ak = array();
            foreach (current($rows) as $fieldName => $dummy) {
                if (0 == strncasecmp($fieldName, self::ARRAY_KEY_COL, strlen(self::ARRAY_KEY_COL))) {
                    $ak[] = $fieldName;
                } elseif (0 == strncasecmp($fieldName, self::PARENT_KEY_COL, strlen(self::PARENT_KEY_COL))) {
                    $pk = $fieldName;
                }
            }

            natsort($ak);
            if ($ak) {
                // Tree-based array? Fields: ARRAY_KEY, PARENT_KEY
                if ($pk !== null) {
                    return self::_transformResultToForest($rows, $ak[0], $pk);
                }
                // Key-based array? Fields: ARRAY_KEY.
                return self::_transformResultToHash($rows, $ak);
            }
        }
        return $rows;
    }

    private static function _transformResultToHash($rows, $arrayKeys)
    {
        $result = array();
        foreach ($rows as $row) {
            $current = & $result;
            // Iterate over all of ARRAY_KEY* fields and build array dimensions.
            foreach ($arrayKeys as $ak) {
                $key = $row[$ak];
                unset($row[$ak]); // remove ARRAY_KEY* field from result row
                if ($key !== null) {
                    $current = & $current[$key];
                } else {
                    // IF ARRAY_KEY field === null, use array auto-indices.
                    // we use $tmp, because don't know the value of auto-index
                    $tmp = array();
                    $current[] = & $tmp;
                    $current = & $tmp;
                    unset($tmp);
                }
            }
            $current = $row; // save the row in last dimension
        }
        return $result;
    }

    private static function _transformResultToForest($rows, $idName, $pidName)
    {
        $ids = array();
        $children = array();
        // Collect who are children of whom.
        foreach ($rows as $i => $r) {
            $row = & $rows[$i];
            $id = $row[$idName];
            $pid = $row[$pidName];

            if ($id === null) {
                continue; // Bug of tree structure
            }
            if ($id == $pid) {
                $pid = null; // Strange tree implementation
            }

            $children[$pid][$id] = & $row;
            if (!isset($children[$id])) {
                $children[$id] = array();
            }

            $ids[$id] = true;
            $row['childNodes'] = & $children[$id];
        }

        // Root elements are elements with non-found PIDs.
        $forest = array();
        foreach ($rows as $i => $r) {
            $row = & $rows[$i];
            $id = $row[$idName];
            $pid = $row[$pidName];

            if ($pid == $id) {
                $pid = null;
            }
            if (!isset($ids[$pid])) {
                $forest[$row[$idName]] = & $row;
            }
            unset($row[$idName]);
            unset($row[$pidName]);
        }
        return $forest;
    }

    private static function _shrinkLastArrayDimensionCallback(&$v)
    {
        if (!$v) {
            return;
        }
        reset($v);

        if (!is_array($firstCell = current($v))) {
            $v = $firstCell;
        } else {
            array_walk($v, array(__CLASS__, '_shrinkLastArrayDimensionCallback'));
        }
    }

    protected function _logQuery($query, $noTrace = false)
    {
        if (!$this->_logger) {
            return;
        }

        $this->_expandPlaceholders($query, $useNative = false);
        $message = $query[0];
        $context = null;
        if (!$noTrace) {
            require_once 'DB/Adapter/ErrorTracker.php';
            $context = DB_Adapter_ErrorTracker::findCaller($trace = null, $returnCaller = true);
        }
        $this->_logger->log($context, $message);
    }

    private function _logQueryStat($queryTime, $fetchTime, $firstFetchTime, $rows)
    {
        // Always increment counters.
        $this->_statistics['time'] += $queryTime;
        $this->_statistics['count']++;

        // If no logger, economize CPU resources and actually log nothing.
        if (!$this->_logger) {
            return;
        }

        $dt = round($queryTime * 1000);
        $firstFetchTime = round($firstFetchTime * 1000);
        $tailFetchTime = round($fetchTime * 1000) - $firstFetchTime;

        $log = "  -- ";
        if ($firstFetchTime + $tailFetchTime) {
            $log = sprintf(
                "  -- %d ms = %d+%d" . ($tailFetchTime ? "+%d" : ""),
                $dt,
                $dt - $firstFetchTime - $tailFetchTime,
                $firstFetchTime,
                $tailFetchTime
            );
        } else {
            $log = sprintf("  -- %d ms", $dt);
        }

        $log .= "; returned ";
        if (!is_array($rows)) {
            $log .= $this->escape($rows);
        } else {
            $detailed = null;
            if (count($rows) == 1) {
                $len = 0;
                $values = array();
                foreach ($rows[0] as $k => $v) {
                    $len += strlen($v);
                    if ($len > self::MAX_LOG_ROW_LEN) {
                        break;
                    }
                    $values[] = $v === null ? 'NULL' : $this->escape($v);
                }

                if ($len <= self::MAX_LOG_ROW_LEN) {
                    $detailed = "(" . preg_replace("/\r?\n/", "\\n", join(', ', $values)) . ")";
                }
            }

            if ($detailed) {
                $log .= $detailed;
            } else {
                $log .= count($rows) . " row(s)";
            }
        }

        $this->_logQuery($log, true);
    }
}