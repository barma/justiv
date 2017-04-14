<?php
namespace Helper;
// here you can define custom actions
// all public methods declared in helper class will be available in $I
class Redirects extends \Codeception\Module
{
    /**
     * Check that a 301 HTTP Status is returned with the correct Location URL.
     *
     * @since 1.0.0
     *
     * @param string $url Relative or absolute URL of redirect destination.
     */
    public function seePermanentRedirectTo($url)
    {
        // Allow relative URLs.
        $testDomain     = \Codeception\Configuration::suiteSettings('redirects', \Codeception\Configuration::config())['modules']['enabled'][1]['REST']['url'];
        $url            = (strpos($url, '://') === false ? $testDomain : '') . $url;
        $response       = $this->getModule('PhpBrowser')->client->getInternalResponse();
        $responseCode   = $response->getStatus();
        $locationHeader = $response->getHeaders()['Location'][0];
        $this->assertEquals(301, $responseCode);
        $this->assertEquals($url, $locationHeader);
    }
    /**
     * Check that a 301 HTTP Status is returned with the correct Location URL.
     *
     * @since 1.0.0
     *
     * @param string $url Relative or absolute URL of redirect destination.
     */
    public function seePermanentRedirectToHttpsFor($url)
    {
        $this->getModule('REST')->sendHead($url);
        // Allow relative URLs.
        $testDomain      = \Codeception\Configuration::suiteSettings('redirects', \Codeception\Configuration::config())['modules']['enabled'][1]['REST']['url'];
        $testDomainHttps = str_replace( 'http://', 'https://', $testDomain );
        $url             = (strpos($url, '://') === false ? $testDomainHttps : '') . $url;
        $client          = $this->getModule('PhpBrowser')->client;
        $responseCode    = $client->getInternalResponse()->getStatus();
        $responseUri     = $client->getHistory()->current()->getUri();
        $this->assertEquals(200, $responseCode);
        $this->assertEquals($url, $responseUri);
    }
    /**
     * Toggle redirections on and off.
     *
     * By default, BrowserKit will follow redirections, so to check for 30*
     * HTTP status codes and Location headers, they have to be turned off.
     *
     * @since 1.0.0
     *
     * @param bool $followRedirects Optional. Whether to follow redirects or not.
     *                              Default is true.
     */
    function followRedirects( $followRedirects = true ) {
        $this->getModule('PhpBrowser')->client->followRedirects($followRedirects);
    }
}