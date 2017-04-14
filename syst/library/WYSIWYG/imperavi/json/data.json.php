<?
$content = '';
function directoryMap($source_dir, $top_level_only = false, $hidden = false)
{
    global $content;
    if ($fp = opendir($_SERVER['DOCUMENT_ROOT'].$source_dir)) {
        $source_dir = rtrim($source_dir, '/') . '/';

        while (false !== ($file = readdir($fp))) {
            if (($hidden == false && strncmp($file, '.', 1) == 0) OR ($file == '.' OR $file == '..')) {
                continue;
            }
            if ($top_level_only == false && is_dir($_SERVER['DOCUMENT_ROOT'].$source_dir . $file)) {
                directoryMap($source_dir . $file . '/', $top_level_only, $hidden);
            } else {
                $content .= ',
                { "thumb": "'.$source_dir.$file.'", "image": "'.$source_dir.$file.'", "folder": "'.$source_dir.'"  }';
            }
        }
        closedir($fp);
        return $content;
    } else {
        return false;
    }
}

$files = directoryMap('/media/');
$files = ltrim($files, ',');
$files = '[ '.$files.'
 ]';
echo $files;