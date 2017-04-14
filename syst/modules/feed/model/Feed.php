<?
class Feed extends Model
{

    public function getBlogFeed($count = '10')
    {
        $this->load->model('post', 'blog');
        $data = $this->post->showLastPosts($count);
        return $data;
    }

}

?>