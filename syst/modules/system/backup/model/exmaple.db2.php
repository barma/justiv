<?

global $Config;
$Config2 = new Config();
$Config2->driver = 'mysql';
$Config2->host = '77.222.40.209';
$Config2->login = 'justivru';
$Config2->password = 'gggh5ty7q';
$Config2->db_name = 'justiv_test';
$Config2->encoding = 'UTF8';
$Config2->prefix = 'jus_';
$db = DB::Connect($Config2);

//Loader::module('mvc');
//$obj = new Controller('system');
$db->query($dump);
?>