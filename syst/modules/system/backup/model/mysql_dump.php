<?php
/* 
MySQL Dump PHP class by Avram, avramyu@gmail.com 
*/

class MySQLDump
{

    var $tables = array();
    var $connected = false;
    var $output;
    var $droptableifexists = false;
    var $mysql_error;


    public function __construct($Config)
    {
        $this->connect($Config);
    }

    function connect($Config)
    {
        Loader::library('db');
        $this->connected = DB::connect($Config);
        if ($this->connected) {
            return true;
        } else {
            return false;
        }

    }

    function list_tables()
    {
        $return = true;
        if (!$this->connected) {
            $return = false;
        }
        $this->tables = array();
        $this->tables = $this->connected->selectCol("SHOW TABLES");
        return $return;
    }

    function dump()
    {
        $this->output = "";
        $this->list_tables() or trigger_error($this->mysql_error, E_USER_ERROR);
        foreach ($this->tables as $table) {
            $this->dump_table($table, false);
        }
        return true;
    }

    function list_values($tablename)
    {

        $data = $this->connected->select("SELECT * FROM " . $tablename);

        foreach ($data as $id_row => $row) {

            $count = count($row);
            $this->output .= "INSERT INTO `$tablename` VALUES(";
            $buffer = '';
            //for ($i=0; $i < $count; $i++) {
            foreach ($row as $val) {
                $value = trim($val);
                //echo "v = $value"; 
                //$value = str_replace("\n",'',$value); 
                $value = mysql_real_escape_string($value);
                if (!is_integer($value)) {
                    $value = "'" . addslashes($value) . "'";
                }
                $buffer .= $value . ', ';
            }
            $buffer = substr($buffer, 0, count($buffer) - 3);
            $this->output .= $buffer . ");\n";
        }

    }

    function dump_table($tablename, $single = true)
    {
        if ($single == true) {
            $this->output = "";
        }
        $this->get_table_structure($tablename);
        $this->list_values($tablename);
    }

    function get_table_structure($tablename)
    {
        $this->output .= "\n\n-- Dumping structure for table: $tablename\n\n";
        if ($this->droptableifexists) {
            $this->output .= "DROP TABLE IF EXISTS `$tablename`;\n";
        }
        $sql = $this->connected->selectRow("SHOW CREATE TABLE " . $tablename);
        $this->output .= $sql['Create Table'] . ";\n\n";
    }

}

?>