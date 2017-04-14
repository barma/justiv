<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 05.05.14
 * Time: 23:02
 */

Loader::library('mvc');

class shopController extends Controller
{

    private $error_registration = '';

    public function __construct()
    {
        parent::__construct('shop');
        global $Core;
        $this->core = $Core;
    }

    public function showWindow() {
        $this->load->model('Product');
        $data = $this->product->getProductsWindow();
        $this->load->view('view_window', $data);
    }

    public function showCatalog() {
//        $this->cron();
        $this->load->model('product');
        $this->load->model('category');
        $catalog = $this->getParam('0','G','TEXT',50);
//        ed($catalog);
        $data['category'] = $this->category->getCategoryNameByURL($catalog);
        $data['products'] = $this->product->getListProducts($catalog);
        $this->load->view('view_show_products', $data);
    }


    public function index()
    {
//        $this->load->model('post');
//        $data = $this->post->showLastPosts(10);
//        $this->core->addTitle('Последние посты');
//        $this->core->setKeywords('Разработка, php, mysql, ruby, ruby on rails');
//        $this->load->view('view_show_last_posts', $data);
    }

    public function showProduct($id = null) {
        if(is_null($id)) {
            $id = $this->getParam('id','G','INT',10);
        }
        $this->load->model('product');
        $this->load->model('productImages');

        $data = $this->product->getProduct($id);
        $data['images'] = $this->productImages->getProductsImages($id);
        $this->load->view('view_show_product', $data);
    }

    public function addToBasket() {
        global $Core;
        if(isAjax()){
            $Core->templateOff();
        }
        $this->load->model('Basket');
        $id = $this->getParam('id','G','INT',10);
        $this->basket->addProductToBasket($id);
        if($Core->templateIsOff()){
            die('true');
        } else {
            $this->showProduct($id);
        }
    }

    public function showCart() {
        $this->load->model('basket');
        $data = $this->basket->getBasket();
        $this->load->view('view_basket', $data);
    }

    public function makeOrder() {
        if(isset($_POST['make_order'])) {
            $this->load->model('customer');
            if($this->customer->isCustomer()) {
                Core::redirect('/checkout/');
    //            $this->load->view('view_checkout');
            } else {
                $data['action'] = '/checkout/';
                $this->load->view('view_registration_customer', $data);
            }
        }
    }

    public function checkout() {
        if(isset($_POST['new_user'])) {
            echo "new user";
            $this->registerNewCustomerWrapper();
        }
        $this->load->model('basket');
        $this->basket->checkout();
        $this->load->view('view_checkout', $this->error_registration);
    }

    public function registration() {
        if(isset($_POST) and !empty($_POST)) {
           $this->registerNewCustomer();
        } else {
            $this->load->view('view_registration_customer');
        }
    }

    public function registerNewCustomerWrapper() {
        $this->load->model('customer');
        $response = $this->customer->registerNewCustomer();
        if(true == $response) {
            return true;
        } else {
            $this->error_registration = $response;
            return false;
        }
    }

    public function registerNewCustomer() {
        $data = array();
        if($this->registerNewCustomerWrapper()) {
            $data['cst_name'] = $this->getParam('cst_name','P','TEXT',255);
            $this->load->view('view_end_registration', $data);
        } else {
            $this->load->view('view_registration_customer', $this->error_registration);
        }
    }

    public function Login() {

        $this->load->model('customer');
        $data = array();

        if((!empty($_POST['user']) or !empty($_POST['pass']))
            or (!empty($_GET['user']) or !empty($_GET['pass']))) {
            $user = $this->getParam('user','P','TEXT',50);
            $pass = $this->getParam('pass','P','TEXT',50);
            if(empty($user) and empty($pass)) {
                $user = $this->getParam('user','G','TEXT',50);
                $pass = $this->getParam('pass','G','TEXT',50);
            }

            $data = $this->customer->loginCustomer($user,$pass);
            if(!isAjax() and empty($data)) {
                $this->load->view('view_wrong_login');
            }
        }
        if(empty($data) And (!empty($_SESSION['customer']['login']) and !empty($_SESSION['customer']['hash']))) {
            $data = $this->customer->loginCustomer($_SESSION['customer']['login'],$_SESSION['customer']['hash'],true);
        }

        $this->load->view('view_user_login', $data);
    }

    public function restoreCustomerPassword() {
        $email = $this->getParam('email','P','TEXT',40);
        $customer = $this->db->selectRow("SELECT * FROM ?_shop_customers WHERE cst_email = ?", $email);
        if(empty($customer)) {
            $res = "Такого email не существует. Создать аккаунт?";
        } else {
            $hash = sha1(SALT.$email);
            $this->db->query("UPDATE ?_shop_customers SET cst_temp_hash = ? WHERE cst_id = ?",$hash, $customer['cst_id']);
            $link = SN.'/updateCustomerPassword/?hash='.$hash;
            mail($email,'Восстановление пароля',
                'Для восстановления пароля пройдите по ссылке '.$link.'\n Если Вы не запрашивали сброс пароля, пожалуйста сообщите нам по адресу:'.$this->adminEmail);
            $res = "На Ваш email отправлена ссылка для восстановления пароля.";
        }
        return $res;
    }

    public function updateCustomerPassword(){
        $hash = $this->getParam('hash','G','HTML',50);
        if(!empty($hash)) {
            $customer = $this->db->selectRow("SELECT * FROM ?_shop_customers WHERE cst_temp_hash = ?", $hash);
            if(!empty($customer)) {
                return $this->load->view('view_update_customer_password', $data = ['hash' => $hash]);
            }
        }
        $hash = $this->getParam('hash','P','HTML',50);
        if(!empty($hash)) {
            $customer = $this->db->selectRow("SELECT * FROM ?_shop_customers WHERE cst_temp_hash = ?", $hash);
            if(!empty($customer)) {
                $pass = $this->getParam('pass','P','TEXT',50);
                $repPass = $this->getParam('$repPass','P','TEXT',50);

                if($pass !== $repPass) {
                    return $this->load->view('view_restore_password_error','Пароли не совпадают!');
                }
                $this->load->model('customer');
                if($this->customer->updateCustomerPassword($pass, $hash)){
                    return $this->load->view('view_update_customer_password', $data = ['hash' => $hash]);
                } else {
                    return $this->load->view('view_restore_password_error', $data = ['msg' => 'При обновлении пароля произошла ошибка, попробуйте повторить процедуру еще раз!']);
                }
            }
        }
        $this->load->view('view_restore_password_error',$data = ['msg'=>'Ссылка не действительна или устарела']);
    }

    public function showCustomerProfile() {
        $this->load->model('orders');
        $this->load->model('positions');
        $this->load->model('customer');
        $cst_id = $this->customer->getCustomerId();

        if(!empty($_POST)) {
            $data['cst_name'] = $this->getParam('name','P','TEXT',50);
            $data['cst_email'] = $this->getParam('email','P','TEXT',50);
            $data['cst_phone'] = $this->getParam('phone','P','TEXT',50);
            $this->customer->updateCustomerData($data, $cst_id);
        }
        $data['orders'] = $this->orders->getCustomerOrders($cst_id);
        $data['positions'] = $this->positions->getCustomerPositions($cst_id);
        $data['customer'] = $this->customer->getCustomerData($cst_id);
        $this->load->view('view_customer_data', $data);
    }

    public function getCategoriesList() {
        $this->load->model('category');
        $data = $this->category->getListCategories();
        $this->load->view('view_categories_list', $data);
    }

    public function getCategoriesListArray() {
        $this->load->model('category');
        $data = $this->category->getListCategories();
        return $data;
    }

    public function showMenu() {
        $this->load->model('category');
        $data = $this->category->getMenu();
        $this->load->view('view_show_menu', $data);
    }

    public function cron() {
        $this->load->model('cron');
        $this->cron->run();
    }

    public function test() {
        ed($_GET);
        ed($_POST);
    }
}