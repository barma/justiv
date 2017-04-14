<?php

class DB_Adapter_ErrorTracker
{
    private static $ignoresInTraceRe = 'DB_Adapter_.*::.* | call_user_func.*';

    public static function findCaller($trace = null, $returnCaller = false)
    {
        $smart = array();
        $framesSeen = 0;
        $ignoresRe = self::$ignoresInTraceRe;
        $ignoresRe = "/^(?>{$ignoresRe})$/six";
        if (is_null($trace)) {
            $trace = debug_backtrace();
        }

        for ($i = 0, $n = count($trace); $i < $n; $i++) {
            $t = $trace[$i];
            if (!$t) {
                continue;
            }

            // Next frame
            $next = isset($trace[$i + 1]) ? $trace[$i + 1] : null;
            // Dummy frame before call_user_func* frames
            // Skip call_user_func on next iteration
            if (!isset($t['file'])) {
                $t['over_function'] = $trace[$i + 1]['function'];
                $t = $t + $trace[$i + 1];
                $trace[$i + 1] = null;
            }

            // Skip myself frame
            if (++$framesSeen < 2) {
                continue;
            }
            // Skip frames for functions
            // situated in ignored places
            if ($next) {
                $frameCaller = '';
                if (isset($next['class'])) {
                    $frameCaller .= $next['class'] . '::';
                }
                if (isset($next['function'])) {
                    $frameCaller .= $next['function'];
                }
                if (preg_match($ignoresRe, $frameCaller)) {
                    continue;
                }
            }

            // On each iteration we consider ability to add PREVIOUS frame
            // to $smart stack.
            if ($returnCaller) {
                return $t;
            }
            $smart[] = $t;
        }

        return $smart;
    }
}