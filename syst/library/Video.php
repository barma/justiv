<?php

class Video
{

    protected $_video = '';
    protected $_preview = '';
    protected $_comment = '';

    public function show($video, $preview = '', $comment = '')
    {
        $this->_video = $video;
        if ($preview) {
            $this->_preview = $preview;
        }
        if ($comment) {
            $this->_comment = $comment;
        }
        $content = "<object id=\"videoplayer1178\" width=\"500\" height=\375\">
            <param name=\"bgcolor\" value=\"#ffffff\" />
            <param name=\"allowFullScreen\" value=\"true\" />
            <param name=\"allowScriptAccess\" value=\"always\" />
            <param name=\"movie\" value=\"" . HN . FC . "library/Video/player.swf\" />
            <param name='flashvars' value='comment=$this->_comment&amp;m=video&amp;file=$this->_video' />
            <embed src=\"" . HN . FC . "library/Video/player.swf\"
                   type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\"
                   allowfullscreen=\"true\"
                   flashvars=\"comment=$this->_comment&amp;m=video&amp;file=$this->_video&image=$this->_preview\"
                   bgcolor=\"#ffffff\" width=\"500\" height=\"375\">
            </embed>
        </object>";
        return $content;
    }
}

?>
