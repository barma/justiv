<?php

require_once LP . 'DB/Adapter/Generic/DB.php';

class DB_Adapter_Mysqli_DB extends DB_Adapter_Generic_DB
{
    private $_link;
    private $_config;

    public function __construct(array $config)
    {
        $this->_config = $config;
        $this->_link = $this->_connect();
        $this->_selectDB();
        if (isset($config["charset"])) {
            $this->query('SET NAMES ?', $config["charset"]);
        }
    }

    private function _connect()
    {
        $c = $this->_config;
        if (!empty($c['port'])) {
            $c['host'] .= ":{$c['port']}";
        }
        if (!isset($c['pass'])) {
            $c['pass'] = '';
        }
        $con = mysqli_connect($c['host'], $c['user'], $c['pass']);
//        ed(array(mysqli_error($con), mysqli_errno($con)));
//die('asd');
        if (!$con) {


            $this->_raiseConnectionError(
                'mysqli_connect',
                array($c['host'], $c['user'], $c['pass'])
            );
        }

        return $con;
    }

    private function _selectDB()
    {
        $dbname = preg_replace('{^/}s', '', $this->_config['path']);
        $db_selected = mysqli_select_db($this->_link, $dbname);
        if (!$db_selected) {
            return $this->_raiseConnectionError('mysql_select_db', array($dbname));
        }
    }

    protected function _performEscape($s, $isIdent = false)
    {
        if (!$isIdent) {
            $s = mysqli_real_escape_string($this->_link, $s);
            return "'{$s}'";
        }

        $s = str_replace('`', '``', $s);
        return "`{$s}`";
    }

    protected function _performTransaction($parameters = null)
    {
        return $this->query('BEGIN');
    }

    protected function _performNewBlob($blobid = null)
    {
        require_once 'DB/Adapter/Mysql/Blob.php';
        return new DB_Adapter_Mysql_Blob($this, $blobid);
    }

    protected function _performGetBlobFieldNames($result)
    {
        $blob_fields = array();
        for ($i = mysqli_num_fields($result) - 1; $i >= 0; $i--) {
            $its_blob = strpos(mysqli_fetch_field_direct($result, $i), "BLOB") !== false;
            if ($its_blob) {
                $blob_fields[] = mysqli_fetch_field_direct($result, $i);
            }
        }

        return $blob_fields;
    }

    protected function _performCommit()
    {
        return $this->query('COMMIT');
    }

    protected function _performRollback()
    {
        return $this->query('ROLLBACK');
    }

    protected function _performTransformQuery(array& $queryMain, $how)
    {
        switch ($how) {
            // Prepare total calculation (if possible)
            case 'CALC_TOTAL':
                $m = null;
                if (preg_match('/^(\s* SELECT)(.*)/six', $queryMain[0], $m)) {
                    $queryMain[0] = $m[1] . ' SQL_CALC_FOUND_ROWS' . $m[2];
                }
                break;

            // Perform total calculation.
            case 'GET_TOTAL':
                $queryMain = array('SELECT FOUND_ROWS()');
                break;

            default:
                return false;
                break;
        }
        return true;
    }

    protected function _performQuery(array $queryMain)
    {
        $this->_lastQuery = $queryMain;
        $this->_expandPlaceholders($queryMain, false);
        $result = mysqli_query($this->_link, $queryMain[0]);

        if ($result === false) {
            return $this->_raiseQueryError();
        }
        if (!is_resource($result)) {
            // INSERT queries return generated ID.
            if (preg_match('/^\s* INSERT \s+/six', $queryMain[0])) {
                return mysqli_insert_id($this->_link);
            }
            // Non-SELECT queries return number of affected rows, SELECT - resource.
            return mysqli_affected_rows($this->_link);
        }
        return $result;
    }

    protected function _performFetch($result)
    {
        $row = @mysqli_fetch_assoc($result);
        if (mysqli_error($this->_link)) {
            return $this->_raiseQueryError();
        }
        if ($row === false) {
            return null;
        }
        return $row;
    }

    protected function _performGetPlaceholderIgnoreRe()
    {
        return '
            "   (?> [^"\\\\]+|\\\\"|\\\\)*    "   |
            \'  (?> [^\'\\\\]+|\\\\\'|\\\\)* \'   |
            `   (?> [^`]+ | ``)*              `   |   # backticks
            /\* .*?                          \*/      # comments
        ';
    }

    private function _raiseQueryError()
    {
        if (!error_reporting()) {
            return;
        }
        require_once LP . 'DB/Adapter/Exception/QueryError.php';
        throw new DB_Adapter_Exception_QueryError(
            mysqli_errno($this->_link), $this->getLastQuery(), mysqli_error($this->_link), $this
        );
    }

    private function _raiseConnectionError($func, $conn_params)
    {
        if (!error_reporting()) {
            return;
        }
        $errno = $this->_link ? mysqli_errno($this->_link) : mysqli_errno();
        $error = $this->_link ? mysqli_error($this->_link) : mysqli_error();
        $str_params = join("', '", $conn_params);
        $primary_info = "{$func} ('{$str_params}')";
        require_once LP . 'DB/Adapter/Exception/ConnectionError.php';
        throw new DB_Adapter_Exception_ConnectionError($errno, $primary_info, $error, $this);
    }

    protected function  _performGetNativePlaceholderMarker($n)
    {
        return '?';
    }
}