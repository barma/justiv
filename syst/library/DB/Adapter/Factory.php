<?php

class DB_Adapter_Factory
{

    public static function connect($dsn)
    {
        $config = self::parseDSN($dsn);
        if (!$config) {
            return;
        }

        $driver = self::_loadDriver($config);
        $driver->setIdentPrefix(@$config['ident_prefix']);
        return $driver;
    }

    public static function parseDSN($dsn)
    {
        if (is_array($dsn)) {
            return $dsn;
        }
        $parsed = @parse_url($dsn);
        if (!$parsed) {
            return null;
        }
        if (!empty($parsed['query'])) {
            $params = null;
            parse_str($parsed['query'], $params);
            $parsed += $params;
        }

        $parsed['dsn'] = $dsn;
        return $parsed;
    }

    private static function _loadDriver(array $config)
    {
        $classname = self::_determineDriverClassName($config['scheme']);
        if (!class_exists($classname)) {
            $path = str_replace('_', '/', $classname) . ".php";
            $path = LP . $path;
            if (!file_exists($path)) {
                throw new Exception("$path");
            }
            require_once $path;
        }

        return new $classname($config);
    }

    private static function _determineDriverClassName($dbtype)
    {
        $dbtype = ucfirst($dbtype);
        $class = "DB_Adapter_{$dbtype}_DB";
        return $class;
    }

    private function __construct()
    {

    }
}