<?php

class DB_Adapter_Exception extends Exception
{
    public $primaryInfo;
    public $message;
    public $code;
    private $_dbo;

    public function __construct($code, $primaryInfo, $message, $dbo)
    {
        parent::__construct($message, $code);
        $this->primaryInfo = $primaryInfo;
        $this->message = $message;
        $this->code = $code;
        $this->_dbo = $dbo;
    }

    public function __toString()
    {
        $context = "unknown";
        require_once LP . 'DB/Adapter/ErrorTracker.php';
        $trace = DB_Adapter_ErrorTracker::findCaller($this->getTrace());
        if ($trace) {
            $context = (isset($trace[0]['file']) ? $trace[0]['file'] : '?');
            $context .= (isset($trace[0]['line']) ? "({$trace[0]['line']})" : '?');
            $traceAsString = $this->_traceToString($trace);
        }

        $errmsg = get_class($this) . ($context ? " in {$context}" : "");
        $errmsg .= "\n" . rtrim($this->message);
        $errmsg .= "\n" . "Error occurred in {$this->primaryInfo}";
        if ($traceAsString) {
            $errmsg .= "\n" . "Stack trace:\n" . $traceAsString;
        }
        return $errmsg;
    }

    private function _traceToString($trace)
    {
        $srep = '';
        $levels = 0;
        foreach ($trace as $level => $frame) {
            $func = (isset($frame['class']) ? "{$frame['class']}::" : '') . $frame['function'];
            $srep .= "#{$level} {$frame['file']}({$frame['line']}): {$func}(...)\n";
            $levels++;
        }
        $srep .= "#{$levels} {main}";
        return $srep;
    }
}