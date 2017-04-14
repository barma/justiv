<?
class MySQLDump
{

    var $tables = array();
    var $connected = false;
    var $output;
    var $droptableifexists = false;
    var $mysql_error;

    function connect($host, $user, $pass, $db)
    {
        $return = true;
        $conn = @mysql_connect($host, $user, $pass);
        if (!$conn) {
            $this->mysql_error = mysql_error();
            $return = false;
        }
        $seldb = @mysql_select_db($db);
        if (!$seldb) {
            $this->mysql_error = mysql_error();
            $return = false;
        }
        $this->connected = $return;
        return $return;
    }

    function list_tables()
    {
        $return = true;
        if (!$this->connected) {
            $return = false;
        }
        $this->tables = array();
        $sql = mysql_query("SHOW TABLES");
        while ($row = mysql_fetch_array($sql)) {
            array_push($this->tables, $row[0]);
        }
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
        $sql = mysql_query("SELECT * FROM $tablename");
        $this->output .= "\n\n-- Dumping data for table: $tablename\n\n";
        while ($row = mysql_fetch_array($sql)) {
            $broj_polja = count($row) / 2;
            $this->output .= "INSERT INTO `$tablename` VALUES(";
            $buffer = '';
            for ($i = 0; $i < $broj_polja; $i++) {
                $vrednost = trim($row[$i]);
                $vrednost = str_replace("\n", '', $vrednost);
                if (!is_integer($vrednost)) {
                    $vrednost = "'" . addslashes($vrednost) . "'";
                }
                $buffer .= $vrednost . ', ';
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
            $this->output .= "DROP TABLE IF EXISTS `$tablename`;\nCREATE TABLE `$tablename` (\n";
        }
        $sql = mysql_query("SHOW CREATE TABLE $tablename");
        $this->output .= mysql_result($sql, 0, 'Create Table') . ';'; //"  PRIMARY KEY  (`$primary`)\n);\n";

    }

}

?>