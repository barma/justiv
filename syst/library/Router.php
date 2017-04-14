<?php


class Router
{

    /**
     * List of routes
     *
     * @var array
     * @access public
     */
    var $routes = array();
    /**
     * List of error routes
     *
     * @var array
     * @access public
     */
    var $error_routes = array();
    /**
     * Current class name
     *
     * @var string
     * @access public
     */
    var $class = '';
    /**
     * Current method name
     *
     * @var string
     * @access public
     */
    var $method = 'index';
    /**
     * Sub-directory that contains the requested controller class
     *
     * @var string
     * @access public
     */
    var $directory = '';
    /**
     * Default controller (and method if specific)
     *
     * @var string
     * @access public
     */
    var $default_controller;
    /**
     * Default suffix
     *
     * @var string
     * @access public
     */
    var $suffix = '';

    /**
     * Match url with routing
     *
     * @var bool
     * @access public
     */
    var $match_route = false;

    var $segments = array();
    var $resgments = array();
    var $uri_string = '';

    function match_route() {
        if($this->match_route) {
            $array = array(
                'module'=>$this->fetch_class(),
                'action'=>$this->fetch_method(),
                'id'=>$this->segments[3]?$this->segments[3]:$this->segments[2] // костыль однако
            );
            $array = array_merge($array, $this->segments);
//            ed($array);
            return $array;
        }
    }

    function remove_invisible_characters($str, $url_encoded = true)
    {
        $non_displayables = array();

        // every control character except newline (dec 10)
        // carriage return (dec 13), and horizontal tab (dec 09)

        if ($url_encoded) {
            $non_displayables[] = '/%0[0-8bcef]/'; // url encoded 00-08, 11, 12, 14, 15
            $non_displayables[] = '/%1[0-9a-f]/'; // url encoded 16-31
        }

        $non_displayables[] = '/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/S'; // 00-08, 11, 12, 14-31, 127

        do {
            $str = preg_replace($non_displayables, '', $str, -1, $count);
        } while ($count);

        return $str;
    }

    function _fetch_uri_string()
    {

        // Is the request coming from the command line?
        if (php_sapi_name() == 'cli' or defined('STDIN')) {
            $this->_set_uri_string($this->_parse_cli_args());
            return;
        }

        // Let's try the REQUEST_URI first, this will work in most situations
        if ($uri = $this->_detect_uri()) {
            $this->_set_uri_string($uri);
            return;
        }

        // Is there a PATH_INFO variable?
        // Note: some servers seem to have trouble with getenv() so we'll test it two ways
        $path = (isset($_SERVER['PATH_INFO'])) ? $_SERVER['PATH_INFO'] : @getenv('PATH_INFO');
        if (trim($path, '/') != '' && $path != "/" . SELF) {
            $this->_set_uri_string($path);
            return;
        }

        // No PATH_INFO?... What about QUERY_STRING?
        $path = (isset($_SERVER['QUERY_STRING'])) ? $_SERVER['QUERY_STRING'] : @getenv('QUERY_STRING');
        if (trim($path, '/') != '') {
            $this->_set_uri_string($path);
            return;
        }

        // As a last ditch effort lets try using the $_GET array
        if (is_array($_GET) && count($_GET) == 1 && trim(key($_GET), '/') != '') {
            $this->_set_uri_string(key($_GET));
            return;
        }

        // We've exhausted all our options...
        $this->uri_string = '';
        return;
    }

    function _set_uri_string($str)
    {
        // Filter out control characters
        $str = $this->remove_invisible_characters($str, false);

        // If the URI contains only a slash we'll kill it
        $this->uri_string = ($str == '/') ? '' : $str;
    }


    function _reindex_segments()
    {
        array_unshift($this->segments, null);
        array_unshift($this->rsegments, null);
        unset($this->segments[0]);
        unset($this->rsegments[0]);
    }


    private function _detect_uri()
    {
        if (!isset($_SERVER['REQUEST_URI']) OR !isset($_SERVER['SCRIPT_NAME'])) {
            return '';
        }

        $uri = $_SERVER['REQUEST_URI'];
        if (strpos($uri, $_SERVER['SCRIPT_NAME']) === 0) {
            $uri = substr($uri, strlen($_SERVER['SCRIPT_NAME']));
        } elseif (strpos($uri, dirname($_SERVER['SCRIPT_NAME'])) === 0) {
            $uri = substr($uri, strlen(dirname($_SERVER['SCRIPT_NAME'])));
        }

        // This section ensures that even on servers that require the URI to be in the query string (Nginx) a correct
        // URI is found, and also fixes the QUERY_STRING server var and $_GET array.
        if (strncmp($uri, '?/', 2) === 0) {
            $uri = substr($uri, 2);
        }
        $parts = preg_split('#\?#i', $uri, 2);
        $uri = $parts[0];
        if (isset($parts[1])) {
            $_SERVER['QUERY_STRING'] = $parts[1];
            parse_str($_SERVER['QUERY_STRING'], $_GET);
        } else {
            $_SERVER['QUERY_STRING'] = '';
//            $_GET = array();
        }

        if ($uri == '/' || empty($uri)) {
            return '/';
        }

        $uri = parse_url($uri, PHP_URL_PATH);

        // Do some final cleaning of the URI and return it
        return str_replace(array('//', '../'), '/', trim($uri, '/'));
    }


    function _remove_url_suffix($suffix = '')
    {
        if ($suffix != "") {
            $this->uri_string = preg_replace("|" . preg_quote($suffix) . "$|", "", $this->uri_string);
        }
    }


    function _explode_segments()
    {
        foreach (explode("/", preg_replace("|/*(.+?)/*$|", "\\1", $this->uri_string)) as $val) {
            // Filter segments for security
            $val = trim($this->_filter_uri($val));

            if ($val != '') {
                $this->segments[] = $val;
            }
        }
    }

    function _filter_uri($str)
    {

        // Convert programatic characters to entities
        $bad = array('$', '(', ')', '%28', '%29');
        $good = array('&#36;', '&#40;', '&#41;', '&#40;', '&#41;');

        return str_replace($bad, $good, $str);
    }


    // --------------------------------------------------------------------

    /**
     * Set the route mapping
     *
     * This function determines what should be served based on the URI request,
     * as well as any "routes" that have been set in the routing config file.
     *
     * @access    private
     * @param     array
     * @return    void
     */
    function _set_routing($route)
    {

        if (isset($route['directory']) and !empty($route['directory'])) {
            $this->set_directory($route['directory']);
        }
        if (isset($route['suffix']) and !empty($route['suffix'])) {
            $this->set_directory($route['suffix']);
        }

        $this->routes = (!isset($route) OR !is_array($route)) ? array() : $route;
        unset($route);

        // Set the default controller so we can display it in the event
        // the URI doesn't correlated to a valid controller.
        $this->default_controller = (!isset($this->routes['default_controller']) OR $this->routes['default_controller'] == '') ? false : strtolower(
            $this->routes['default_controller']
        );

        // Were there any query string segments?  If so, we'll validate them and bail out since we're done.

        $this->_fetch_uri_string();
        // Fetch the complete URI string

        // Is there a URI string? If not, the default controller specified in the "routes" file will be shown.
        if ($this->uri_string == '') {
            return $this->_set_default_controller();
        }

        // Do we need to remove the URL suffix?
        $this->_remove_url_suffix($this->suffix);

        // Compile the segments into an array
        $this->_explode_segments();

        // Parse any custom routing that may exist
        $this->_parse_routes();

        // Re-index the segment array so that it starts with 1 rather than 0
        $this->_reindex_segments();
    }

    // --------------------------------------------------------------------

    /**
     * Set the default controller
     *
     * @access    private
     * @return    void
     */
    function _set_default_controller()
    {
        if ($this->default_controller === false) {
            echo "Unable to determine what should be displayed. A default route has not been specified in the routing file.";
        }
        // Is the method being specified?
        if (strpos($this->default_controller, '/') !== false) {
            $x = explode('/', $this->default_controller);

            $this->set_class($x[0]);
            $this->set_method($x[1]);
            $this->_set_request($x);
        } else {
            $this->set_class($this->default_controller);
            $this->set_method('index');
            $this->_set_request(array($this->default_controller, 'index'));
        }

        // re-index the routed segments array so it starts with 1 rather than 0
        $this->_reindex_segments();

    }

    // --------------------------------------------------------------------

    /**
     * Set the Route
     *
     * This function takes an array of URI segments as
     * input, and sets the current class/method
     *
     * @access    private
     * @param    array
     * @param    bool
     * @return    void
     */
    function _set_request($segments = array())
    {

        if (count($segments) == 0) {
            return $this->_set_default_controller();
        }

        $this->set_class($segments[0]);

        if (isset($segments[1])) {
            // A standard method request
            $this->set_method($segments[1]);
        } else {
            // This lets the "routed" segment array identify that the default
            // index method is being used.
            $segments[1] = 'index';
        }

        // Update our "routed" segment array to contain the segments.
        // Note: If there is no custom routing, this array will be
        // identical to $this->segments
        $this->rsegments = $segments;
    }


    // --------------------------------------------------------------------

    /**
     *  Parse Routes
     *
     * This function matches any routes that may exist in
     * the config/routes.php file against the URI to
     * determine if the class/method need to be remapped.
     *
     * @access    private
     * @return    void
     */
    function _parse_routes()
    {
        // Turn the segment array into a URI string
        $uri = implode('/', $this->segments);

        // Is there a literal match?  If so we're done
        if (isset($this->routes[$uri])) {
            $this->match_route = true;
            return $this->_set_request(explode('/', $this->routes[$uri]));
        }
        // Loop through the route array looking for wild-cards
        foreach ($this->routes as $key => $val) {
            // Convert wild-cards to RegEx
            $key = str_replace(':any', '.+', str_replace(':num', '[0-9]+', $key));
            // Does the RegEx match?
            if (preg_match('#^' . $key . '$#', $uri)) {
                // Do we have a back-reference?
                if (strpos($val, '$') !== false AND strpos($key, '(') !== false) {
                    $val = preg_replace('#^' . $key . '$#', $val, $uri);
                }
                $this->match_route = true;
                return $this->_set_request(explode('/', $val));
            }
        }

        // If we got this far it means we didn't encounter a
        // matching route so we'll set the site default route
        $this->_set_request($this->segments);
    }

    // --------------------------------------------------------------------

    /**
     * Set the class name
     *
     * @access    public
     * @param    string
     * @return    void
     */
    function set_class($class)
    {
        $this->class = str_replace(array('/', '.'), '', $class);
    }

    // --------------------------------------------------------------------

    /**
     * Fetch the current class
     *
     * @access    public
     * @return    string
     */
    function fetch_class()
    {
        return $this->class;
    }

    // --------------------------------------------------------------------

    /**
     *  Set the method name
     *
     * @access    public
     * @param    string
     * @return    void
     */
    function set_method($method)
    {
        $this->method = $method;
    }

    // --------------------------------------------------------------------

    /**
     *  Fetch the current method
     *
     * @access    public
     * @return    string
     */
    function fetch_method()
    {
        if ($this->method == $this->fetch_class()) {
            return 'index';
        }

        return $this->method;
    }

    // --------------------------------------------------------------------

    /**
     *  Set the directory name
     *
     * @access    public
     * @param    string
     * @return    void
     */
    function set_directory($dir)
    {
        $this->directory = str_replace(array('/', '.'), '', $dir) . '/';
    }

    // --------------------------------------------------------------------

    /**
     *  Fetch the sub-directory (if any) that contains the requested controller class
     *
     * @access    public
     * @return    string
     */
    function fetch_directory()
    {
        return $this->directory;
    }

    // --------------------------------------------------------------------

    /**
     *  Set the controller overrides
     *
     * @access    public
     * @param    array
     * @return    null
     */
    function _set_overrides($routing)
    {
        if (!is_array($routing)) {
            return;
        }

        if (isset($routing['directory'])) {
            $this->set_directory($routing['directory']);
        }

        if (isset($routing['controller']) AND $routing['controller'] != '') {
            $this->set_class($routing['controller']);
        }

        if (isset($routing['function'])) {
            $routing['function'] = ($routing['function'] == '') ? 'index' : $routing['function'];
            $this->set_method($routing['function']);
        }
    }


}
// END Router Class

/* End of file Router.php */