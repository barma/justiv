<?php
Loader::library('mvc');

class sitemapController extends Controller
{

    public function __construct() {
        parent::__construct('sitemap');
    }

    public function createSitemapXML() {

        $this->load->model('sitemap');
        $content = $this->load->returnView('header');
        $data = $this->sitemap->getData();
        $content .= $this->load->returnView('structure', $data);
        $content .= $this->load->returnView('footer');
        file_put_contents(DR."/sitemap.xml", $content);
    }

}