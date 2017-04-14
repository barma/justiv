<?php

require_once LP . 'DB/Adapter/Generic/DB.php';

class DB_Adapter_Postgresql_DB extends DB_Adapter_Generic_DB
{
    private $link;
    private $config;
    private $prepareCache = array();

    public function __construct(array $config)
    {
        $this->config = $config;
        $this->link = $this->_connect();
    }

    private function _connect()
    {
        $connectionParams = array();
        $recognizedParams = array('host', 'port', 'user');
        foreach ($recognizedParams as $param) {
            if (!empty($this->config[$param])) {
                $connectionParams[] = $param . '=' . $this->config[$param];
            }
        }

        if (!empty($this->config['pass'])) {
            $connectionParams[] = 'password=' . $this->config['pass'];
        }

        $dbname = preg_replace('{^/}s', '', $this->config['path']);
        if (!empty($dbname)) {
            $connectionParams[] = 'dbname=' . $dbname;
        }

        $connectionString = join(' ', $connectionParams);
        $link = @pg_connect($connectionString);

        if (!$link) {
            if (!error_reporting()) {
                return;
            }
            require_once LP . 'DB/Adapter/Exception/ConnectionError.php';
            throw new DB_Adapter_Exception_ConnectionError(
                0, 'Connection failed', "pg_connect('{$connectionString}')", $this
            );
        }
        return $link;
    }

    protected function _performEscape($s, $isIdent = false)
    {
        if (!$isIdent) {
            return "E'" . pg_escape_string($this->link, $s) . "'";
        } else {
            return '"' . str_replace('"', '_', $s) . '"';
        }
    }

    protected function _performNewBlob($blobid = null)
    {
        require_once LP . 'DB/Adapter/Postgresql/Blob.php';
        $obj = new DB_Adapter_Postgresql_Blob($this, $blobid);
        return $obj;
    }

    protected function _performGetBlobFieldNames($result)
    {
        $blobFields = array();
        for ($i = pg_num_fields($result) - 1; $i >= 0; $i--) {
            $type = pg_field_type($result, $i);
            if (strpos($type, "BLOB") !== false) {
                $blobFields[] = pg_field_name($result, $i);
            }
        }
        return $blobFields;
    }

    protected function _performTransformQuery(array& $queryMain, $how)
    {
        switch ($how) {
            // Prepare total calculation (if possible)
            case 'CALC_TOTAL':
                // Not possible
                return true;

            // Perform total calculation.
            case 'GET_TOTAL':
                // TODO: GROUP BY ... -> COUNT(DISTINCT ...)
                $re = '/^
                    (?> -- [^\r\n]* | \s+)*
                    (\s* SELECT \s+)                                             #1
                    (.*?)                                                        #2
                    (\s+ FROM \s+ .*?)                                           #3
                        ((?:\s+ ORDER \s+ BY \s+ .*?)?)                          #4
                        ((?:\s+ LIMIT \s+ \S+ \s* (?: OFFSET \s* \S+ \s*)? )?)   #5
                $/six';
                $m = null;
                if (preg_match($re, $queryMain[0], $m)) {
                    $queryMain[0] = $m[1] . $this->_fieldList2Count($m[2]) . " AS C" . $m[3];
                    $skipTail = substr_count($m[4] . $m[5], '?');
                    if ($skipTail) {
                        array_splice($queryMain, -$skipTail);
                    }
                }
                return true;
        }

        return false;
    }

    protected function _performQuery(array $queryMain)
    {
        $this->_lastQuery = $queryMain;
        $isInsert = preg_match('/^\s* INSERT \s+/six', $queryMain[0]);

        if (!$isInsert) {
            $this->_expandPlaceholders($queryMain, true);
            $hash = md5($queryMain[0]);
            if (!isset($this->prepareCache[$hash])) {
                $this->prepareCache[$hash] = true;
                $prepared = @pg_prepare($this->link, $hash, $queryMain[0]);
                if ($prepared === false) {
                    return $this->_raiseError($queryMain[0], pg_last_error($this->link));
                }
            } else {
                // Prepare cache hit!
            }
            $result = @pg_execute($this->link, $hash, array_slice($queryMain, 1));
        } else {
            $this->_expandPlaceholders($queryMain, false);
            $result = @pg_query($this->link, $queryMain[0]);
        }

        if ($result === false) {
            return $this->_raiseError($queryMain[0], pg_last_error($this->link));
        }
        if (!pg_num_fields($result)) {
            if ($isInsert) {
                return @pg_last_oid($result);
            }
            // Non-SELECT queries return number of affected rows, SELECT - resource.
            return @pg_affected_rows($result);
        }
        return $result;
    }

    protected function _performFetch($result)
    {
        $row = @pg_fetch_assoc($result);
        if (pg_last_error($this->link)) {
            return $this->_raiseError($this->_lastQuery);
        }
        if ($row === false) {
            return null;
        }
        return $row;
    }

    protected function _performTransaction($mode = null)
    {
        return $this->query('BEGIN');
    }

    protected function _performCommit()
    {
        return $this->query('COMMIT');
    }

    protected function _performRollback()
    {
        return $this->query('ROLLBACK');
    }

    protected function _performGetPlaceholderIgnoreRe()
    {
        return '
            "   (?> [^"\\\\]+|\\\\"|\\\\)*    "   |
            \'  (?> [^\'\\\\]+|\\\\\'|\\\\)* \'   |
            /\* .*?                          \*/      # comments
        ';
    }

    protected function _performGetNativePlaceholderMarker($n)
    {
        return '$' . ($n + 1);
    }

    private function _raiseError($query, $error = null)
    {
        $this->rollback();
        $this->_lastQuery = $query;
        if (!error_reporting()) {
            return;
        }
        require_once LP . 'DB/Adapter/Exception/QueryError.php';
        throw new DB_Adapter_Exception_QueryError(
            null, $this->getLastQuery(), empty($error) ? pg_last_error($this->link) : $error, $this
        );
    }
}