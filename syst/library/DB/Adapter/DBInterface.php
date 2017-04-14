<?php

interface DB_Adapter_DBInterface
{

    public function getLastQuery($inline = false);

    public function blob($blob_id = null);

    public function transaction($mode = null);

    public function commit();

    public function rollback();

    public function select($query);

    public function selectPage(&$total, $query);

    public function selectRow($query);

    public function selectCol($query);

    public function selectCell($query);

    public function query($query);

    public function escape($s, $isIdent = false);

    public function setLogger(DB_Adapter_LoggerInterface $logger);

    public function setIdentPrefix($prefix = null);

    public function getStatistics();
}