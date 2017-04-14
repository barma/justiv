<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 09.10.14
 * Time: 23:17
 */

namespace Task;
use Mage\Task\AbstractTask;

class Dbupdate extends AbstractTask
{

    public function getName()
    {
        return 'Fixing file privileges';
    }

    public function run()
    {

        # Получаем список выполненных миграций
        $executed = file('../../../../data/executed.migrations');


//        $work['login'] = 'justivru_shop';
//        $work['password'] = 'Z2uYdetFxU';
//        $work['db_name'] = 'justivru_shop';

        # Получаем список всех миграций
        $files = glob('../../../../data/migrations/*');
        foreach ( $files as $file ) {
            if ( in_array($file, $executed) ) continue;
            # Выполняем миграцию
            exec('mysql justivru_shop -u justivru_shop -pZ2uYdetFxU < ' . $file, $o, $r);
            # Если нет ошибки, помечаем миграцию, как выполненную
            if ( !$r ) $executed[] = $file;
        }

        file_put_contents('../../../../data/executed.migrations', implode("\n", $executed));

//        $command = 'chown 33:33 . -R';
//        $result = $this->runCommandRemote($command);
//        return $result;
        return 'OK';
    }
}
