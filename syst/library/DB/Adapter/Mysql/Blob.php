<?php

require_once LP . 'DB/Adapter/Generic/Blob.php';

class DB_Adapter_MySQL_Blob extends DB_Adapter_Generic_Blob
{
    private $_blobdata = null;
    private $_curSeek = 0;

    public function __construct($database, $blobdata = null)
    {
        $this->_blobdata = $blobdata;
        $this->_curSeek = 0;
    }

    public function read($len)
    {
        $p = $this->_curSeek;
        $this->_curSeek = min($this->_curSeek + $len, strlen($this->_blobdata));
        return substr($this->_blobdata, $this->_curSeek, $len);
    }

    public function write($data)
    {
        $this->_blobdata .= $data;
    }

    public function close()
    {
        return $this->_blobdata;
    }

    public function length()
    {
        return strlen($this->_blobdata);
    }
}