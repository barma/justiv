<?php

class DB
{

    public static function connect($Config = '')
    {

        global $hooks;
        $dsn = $Config->driver . '://' . $Config->login . ':' . $Config->password . '@' . $Config->host . '/' . $Config->db_name . '?charset=' . $Config->encoding . '&ident_prefix=' . $Config->prefix;

        require_once LP."DB/DbSimple/Generic.php";

        $DB = DbSimple_Generic::connect($dsn);
        if (!empty($hooks)) {
            foreach ($hooks as $hook) {
                $DB->query($hook);
            }
        }
        return $DB;

    }

}