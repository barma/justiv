<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 02.03.14
 * Time: 23:26
 */

class Sitemap Extends Model
{

    public function updateDynamicPages(){
        $this->db->query("TRUNCATE TABLE ?_sitemap_dynamic_pages");
        $this->insertDataFromBlog();
    }

    public function insertDataFromBlog(){

        $data = $this->db->selectRow("SELECT * FROM ?_sitemap_config WHERE `section` = 'blog'");

        $this->db->query("INSERT INTO ?_sitemap_dynamic_pages (
            SELECT '' as `id`, CONCAT(? ,COALESCE (NULLIF(`post_url`,''), `post_id`), '/') as `post_url`, `post_date`, ? as `changefreg`,
            ? as `priority`, ? as `section`, `post_id` as `section_id` FROM ?_posts
            )", $data['url'], $data['changefreg'], $data['priority'], $data['section']);

        $data = $this->db->selectRow("SELECT * FROM ?_sitemap_config WHERE `section` = 'blog/tags'");

        $this->db->query("INSERT INTO ?_sitemap_dynamic_pages (
            SELECT '' as id, CONCAT(NULLIF(?,''), tag_url,'/') as url, NOW() as `data`, ? as `changefreg`, ? as `priority`, ? as `section`, `tag_id` as section_id
            FROM ?_tags
        )", $data['url'], $data['changefreg'], $data['priority'], $data['section']);

        return true;
    }

    public function getData() {
        $hn = HN;
        $hn = substr($hn,0,strlen($hn)-1);
        //DATE_FORMAT(`lastmod`, '%Y-%d-%m')
        $data1 = $this->db->select("SELECT CONCAT(?, `url`) as `url`, DATE_FORMAT(`lastmod`, '%Y-%m-%dT%H:%i:%S+00:00') AS `lastmod`,`changefreg`,`priority` FROM ?_sitemap", $hn);
        $data2 = $this->db->select("SELECT CONCAT(?, `url`) as `url`, DATE_FORMAT(`lastmod`, '%Y-%m-%dT%H:%i:%S+00:00') AS `lastmod`,`changefreg`,`priority` FROM ?_sitemap_dynamic_pages", $hn);
        $data = array_merge($data1, $data2);
        return $data;
    }

    public function getListPermanentPages() {
        $data = $this->db->select("SELECT * FROM ?_sitemap");
        return $data;
    }

    public function getListDinamycPages() {
        $data = $this->db->select("SELECT * FROM ?_sitemap_dynamic_pages");
        return $data;
    }

    public function getConfig() {
        $data = $this->db->select("SELECT * FROM ?_sitemap_config");
        return $data;
    }

    public function addConfig() {
        $data = $this->__addConfigData();
        return $this->db->query("INSERT INTO ?_sitemap_config SET ?a", $data);
    }

    public function changeConfig() {
        $data = $this->__addConfigData();
        $id = $this->getParam('id','P','INT',10);
        return $this->db->query("UPDATE ?_sitemap_config SET ?a WHERE `id` = ?", $data, $id);
    }

    private function __addLinkData() {
        $data['url'] = $this->getParam('url','P','HTML',255);
        $data['lastmod'] = $this->getParam('lastmod','P','TEXT',255);
        $data['changefreg'] = $this->getParam('changefreg','P','TEXT',255);
        $data['priority'] = $this->getParam('priority','P','TEXT',255);
        return $data;
    }

    private function __addConfigData() {
        $data = $this->__addLinkData();
        unset($data['lastmod']);
        $data['section'] = $this->getParam('section','P','TEXT',255);
        return $data;
    }

    public function changeLink() {
        $data = $this->__addLinkData();
        $id = $this->getParam('id','P','INT',10);
        return $this->db->query("UPDATE ?_sitemap SET ?a WHERE `id` = ?", $data, $id);
    }

    public function addLink($temp = false){
        $data = $this->__addLinkData();
        if($temp) {
            return $this->db->query("INSERT INTO ?_sitemap_dynamic_pages SET ?a", $data);
        } else {
            return $this->db->query("INSERT INTO ?_sitemap SET ?a", $data);
        }
    }

    public function deleteLink($temp = false) {
        $id = $this->getParam('id','P','INT',10);
        if($temp) {
            return $this->db->query("DELETE FROM ?_sitemap_dynamic_pages WHERE `id` = ?", $id);
        } else {
            return $this->db->query("DELETE FROM ?_sitemap WHERE `id` = ?", $id);
        }
    }

}