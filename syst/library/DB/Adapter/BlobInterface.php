<?php

interface DB_Adapter_BlobInterface
{

    public function read($len);

    public function write($data);

    public function length();

    public function close();
}