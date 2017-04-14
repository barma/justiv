<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 27.04.14
 * Time: 20:15
 */

class Helper {

    public $db = '';

    public function __constuct() {
        Loader::library('DB');
        global $DB;
        $this->db = $DB;
    }

    public static function select($name, $data, $selectedId = null, $classes = '', $multi = false){
        $multi = $multi?"multiple":"";
        $content = "<select name='$name' ".(!empty($classes)?"class='$classes'":"")." ".(($multi)?"multi'":"").">\n";
        if($data == "") {
            return"";
        }
        foreach($data as $key => $value)
        {
            // если это вложенный массив, повезет только первым двум элементам
            if(is_array($value)) {
                list($key, $value) = array_values($value);
            }

            if($key == $selectedId) {
                $content .= "<option value='$key' selected>$value</option>\n";
            } else {
                $content .= "<option value='$key'>$value</option>\n";
            }
        }
        $content .="</content>";
        return $content;
    }

}