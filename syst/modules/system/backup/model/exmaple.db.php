<?php
//Core::templateOff();
//include class 
require_once('mysql_dump.php');


//create new instance of MySQLDump 
global $Config;
$backup = new MySQLDump($Config);

//set drop table if exists 
$backup->droptableifexists = true;

//connect to mysql server (host, user, pass, db) 
//$backup->connect('localhost','root','','mysql'); 

//if not connected, display error 
//if (!$backup->connected) { die('Error: '.$backup->mysql_error); } 

//dump single table 
/*
$backup->dump_table('example_table'); 
echo "<pre>".htmlspecialchars($backup->output."</pre>"; //we can use htmlspecialchars in case that there are some html tags in database 
*/
//dump entire db
$backup->dump();
$dump = $backup->output; //we can use htmlspecialchars in case that there are some html tags in database

/*
$date = date("m.d.y_H.i.s");
$path_to_dump = SP.'tmp/backup/'.$date.".sql";
$file = fopen($path_to_dump, 'w');

if(!fwrite($file, $dump)) {
	echo "произошла ошибка записи данных в файл!!";
}

fclose($file);

*/

echo "test begin!";
$Config2 = new Config();
$Config2->driver = 'mysql';
$Config2->host = '77.222.40.209';
$Config2->login = 'justivru';
$Config2->password = 'gggh5ty7q';
$Config2->db_name = 'justivru_test';
$Config2->encoding = 'UTF8';
$Config2->prefix = 'jus_';
print_r($Config2);
$db = DB::Connect($Config2);
//$db->query($dump);
$data = $db->select("SELECT * FROM ?_tt");
print_r($data);

//dump few tables 
/*
$backup->dump_table('example_table');  //include
$backup->dump_table('second_table', false); //set 2nd argument to false to keep previous table(s) in output stream 
echo "<pre>".htmlspecialchars($backup->output."</pre>"; //we can use htmlspecialchars in case that there are some html tags in database 
*/
?>