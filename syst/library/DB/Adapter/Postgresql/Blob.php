<?php

require_once LP . 'DB/Adapter/Generic/Blob.php';

class DB_Adapter_Postgresql_Blob extends DB_Adapter_Generic_Blob
{
    private $_blob;
    private $_id;
    private $_database;

    public function __construct($database, $id = null)
    {
        $this->_database = $database;
        $this->_database->transaction();
        $this->_id = $id;
        $this->_blob = null;
    }

    public function read($len)
    {
        if ($this->_id === false) {
            return '';
        }
        if (!($e = $this->_firstUse())) {
            return $e;
        }

        $data = @pg_lo_read($this->_blob, $len);
        if ($data === false) {
            return $this->_raiseError('read');
        }
        return $data;
    }

    public function write($data)
    {
        if (!($e = $this->_firstUse())) {
            return $e;
        }

        $ok = @pg_lo_write($this->_blob, $data);
        if ($ok === false) {
            return $this->_raiseError('add data to');
        }

        return true;
    }

    public function close()
    {
        if (!($e = $this->_firstUse())) {
            return $e;
        }
        if ($this->_blob) {
            $id = @pg_lo_close($this->_blob);
            if ($id === false) {
                return $this->_raiseError('close');
            }
            $this->_blob = null;
        } else {
            $id = null;
        }
        $this->_database->commit();
        return $this->_id ? $this->_id : $id;
    }

    public function length()
    {
        if (!($e = $this->_firstUse())) {
            return $e;
        }

        @pg_lo_seek($this->_blob, 0, PGSQL_SEEK_END);
        $len = @pg_lo_tell($this->_blob);
        @pg_lo_seek($this->_blob, 0, PGSQL_SEEK_SET);

        if (!$len) {
            return $this->_raiseError('get length of');
        }
        return $len;
    }

    private function _firstUse()
    {
        if (is_resource($this->_blob)) {
            return true;
        }

        if ($this->_id !== null) {
            $this->_blob = @pg_lo_open($this->_database->link, $this->_id, 'rw');
            if ($this->_blob === false) {
                return $this->_raiseError('open');
            }
        } else {
            $this->_id = @pg_lo_create($this->_database->link);
            $this->_blob = @pg_lo_open($this->_database->link, $this->_id, 'w');
            if ($this->_blob === false) {
                return $this->_raiseError('create');
            }
        }
        return true;
    }

    private function _raiseError($query)
    {
        return;
        $hId = $this->_id === null ? "null" : ($this->_id === false ? "false" : $this->_id);
        $query = "-- $query BLOB $hId";
    }
}