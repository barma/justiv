<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Barma
 * Date: 14.08.13
 * Time: 22:28
 * To change this template use File | Settings | File Templates.
 */
class Counter extends Model
{

    private function _getData()
    {
        $data = array();
        $data['ip'] = $_SERVER['REMOTE_ADDR'];
        if (empty($data['ip'])) {
            $data['ip'] = '0.0.0.0';
        }
        $data['reff'] = urldecode(getenv('HTTP_REFERER'));
        $useragent = $_SERVER['HTTP_USER_AGENT'];

        $os = '';
        if (substr($useragent, 0, 12) == "StackRambler") {
            $os = 'robot_rambler';
        }
        if (substr($useragent, 0, 9) == "Googlebot") {
            $os = 'robot_google';
        }
        if (substr($useragent, 0, 6) == "Yandex") {
            $os = 'robot_yandex';
        }
        if (substr($useragent, 0, 5) == "Aport") {
            $os = 'robot_aport';
        }
        if (substr($useragent, 0, 6) == "msnbot") {
            $os = 'robot_msnbot';
        }
        $data['robot'] = $os;

        $search = '';
        // Выясняем принадлежность к поисковым системам
        if (strpos($data['reff'], "yandex")) {
            $search = 'yandex';
        }
        if (strpos($data['reff'], "rambler")) {
            $search = 'rambler';
        }
        if (strpos($data['reff'], "google")) {
            $search = 'google';
        }
        if (strpos($data['reff'], "mail") && strpos($reff, "search")) {
            $search = 'mail';
        }
        if (strpos($data['reff'], "msn") && strpos($reff, "results")) {
            $search = 'msn';
        }
        if (strpos($data['reff'], $_SERVER["SERVER_NAME"])) {
            $search = 'own_site';
        }
        $data['searcher'] = $search;

        switch ($search) {
            case 'yandex':
            {
                preg_match("/text=([^&]*)/i", $reff . "&", $query);
                if (strpos($reff, "yandpage") != null) {
                    $quer = convert_cyr_string(urldecode($query[1]), "k", "w");
                } else {
                    $quer = $query[1];
                }
                break;
            }
            case 'rambler':
            {
                preg_match("/words=([^&]*)/i", $reff . "&", $query);
                $quer = $query[1];
                break;
            }
            case 'mail':
            {
                preg_match("/q=([^&]*)/i", $reff . "&", $query);
                $quer = $query[1];
                break;
            }
            case 'google':
            {
                preg_match("/q=([^&]*)/i", $reff . "&", $query);
                $tmpstr = $query[1];
                $quer = $tmpstr;
                break;
            }
            case 'msn':
            {
                preg_match("/q=([^&]*)/i", $reff . "&", $query);
                $tmpstr = $query[1];
                $tmpstr;
                break;
            }
            case 'aport':
            {
                preg_match("/r=([^&]*)/i", $reff . "&", $query);
                $quer = $query[1];
                break;
            }
        }
        $symbols = array("\"", "'", "(", ")", "+", ",", "-");
        if(!isset($quer)) {
            $quer = '';
        }
        $quer = str_replace($symbols, " ", $quer);
        $quer = trim($quer);
        $quer = preg_replace('|[\s]+|', ' ', $quer);
        $data['query'] = $quer;
        $data['url'] = $_SERVER["REQUEST_URI"];

        return $data;
    }

    public function addRow()
    {
        $data = $this->_getData();
        $id = $this->db->query("INSERT INTO ?_counter SET ?a", $data);
        $this->db->query("UPDATE ?_counter SET `date` = NOW() WHERE `id` = ?", $id);
    }

    public function getMainData()
    {
        $query = "SELECT COUNT(*) FROM `jus_counter`WHERE `date` >= DATE_SUB(CURRENT_DATE, INTERVAL ? DAY)";
        $data['month'] = $this->db->selectCell($query, 31);
        $data['week'] = $this->db->selectCell($query, 7);
        $data['day'] = $this->db->selectCell($query, 1);
        return $data;
    }

    public function getLastThousand()
    {
        $data = $this->db->select("SELECT * FROM ?_counter ORDER BY `id` DESC LIMIT 1000");
        return $data;
    }

    public function getDataByParam($param)
    {
        switch ($param) {
            case "month":
                $query = "SELECT * FROM `jus_counter`WHERE `date` >= DATE_SUB(CURRENT_DATE, INTERVAL 31 DAY) AND `url` <> '/' ";
                break;
            case "week":
                $query = "SELECT * FROM `jus_counter`WHERE `date` >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY) AND `url` <> '/' ";
                break;
            case "day":
                $query = "SELECT * FROM `jus_counter`WHERE `date` >= DATE_SUB(CURRENT_DATE, INTERVAL 1 DAY) AND `url` <> '/' ";
                break;
            case "search":
                $query = "SELECT * FROM `jus_counter`WHERE `date` >= DATE_SUB(CURRENT_DATE, INTERVAL 31 DAY)
                    AND `searcher` <> '' AND `searcher` <> 'own_site' ";
                break;
            case "bot":
                $query = "SELECT * FROM `jus_counter`WHERE `date` >= DATE_SUB(CURRENT_DATE, INTERVAL 31 DAY) AND `robot` <> '' ";
                break;
            case "ref":
                $query = "SELECT * FROM `jus_counter`WHERE `date` >= DATE_SUB(CURRENT_DATE, INTERVAL 31 DAY) AND `reff` <> '' ";
                break;
        }
        return $this->db->select($query);
    }


}