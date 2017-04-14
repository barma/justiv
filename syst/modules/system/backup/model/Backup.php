<?php
class Backup Extends Model
{

    private $_pathToBackups = '';
    private $_urlToBackups = '';

    public function __construct()
    {
        parent::__construct();
        $this->_pathToBackups = SP . 'tmp/backup/';
        $this->_urlToBackups = '/' . FC . 'tmp/backup/';
    }

    public function createFullBackup()
    {
        $dump = $this->createBackupDB();
        $this->moveLastBackupDB($dump);
        $this->createBackupFiles();
        return true;
    }

    public function createBackupFiles()
    {

    }

    public function createBackupDB()
    {
        require_once('mysql_dump.php');
        $backup = new MySQLDump($Config);
        $backup->droptableifexists = true;
        $backup->dump();
        $dump = $backup->output;
        $date = date("m.d.y_H.i.s");
        $path_to_dump = SP . 'tmp/backup/' . $date . ".sql";
        $file = fopen($path_to_dump, 'w');

        if (!fwrite($file, $dump)) {
            throw new Exception("произошла ошибка записи данных в файл!!");
        }

        fclose($file);
        return $path_to_dump;
    }

    public function moveLastBackupDB($backup)
    {

    }

    public function rollBack($id)
    {

    }

    public function rollBackDB($file)
    {
        $dump = file_get_contents(DR . $file);
        $q = '';
        $state = 0;
        for ($i = 0; $i < strlen($dump); $i++) {
            switch ($dump{$i}) {
                case '"':
                    if ($state == 0) {
                        $state = 1;
                    } elseif ($state == 1) {
                        $state = 0;
                    }
                    break;
                case "'":
                    if ($state == 0) {
                        $state = 2;
                    } elseif ($state == 2) {
                        $state = 0;
                    }
                    break;
                case "`":
                    if ($state == 0) {
                        $state = 3;
                    } elseif ($state == 3) {
                        $state = 0;
                    }
                    break;
                case ";":
                    if ($state == 0) {
                        //echo $q."\n;\n";
                        $this->db->query($q);
                        $q = '';
                        $state = 4;
                    }
                    break;
                case "\\":
                    if (in_array($state, array(1, 2, 3))) {
                        $q .= $dump[$i++];
                    }
                    break;
            }
            if ($state == 4) {
                $state = 0;
            } else {
                $q .= $dump{$i};
            }
        }
    }


    public function getListBackups()
    {
        $data = array();
        $data['DB'] = $this->getListBackupByExtension('.sql');
        return $data;
    }

    public function getListBackupByExtension($extension)
    {
        Loader::library('File');
        $files = new File();
        $backups = $files->getListFilesInFolder($this->_pathToBackups);
        $listBackup = array();
        foreach ($backups as $backup) {
            if (stristr($backup, $extension)) {
                $listBackup[] = array(
                    'path' => $this->_urlToBackups . $backup,
                    'name' => $backup,
                    'size' => sprintf(
                        '%01.2f',
                        filesize(DR . $this->_urlToBackups . $backup) / 1024
                    )
                );
            }
        }
        return $listBackup;
    }

}

?>