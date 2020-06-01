<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$username = $_POST["username"];
$password = $_POST["password"];
$connection = new connection();
$db = $connection->getconnection();
$Login = new login($db);
$login = $Login->getUser($username, $password);
if ($login) {
    $_SESSION['user']['id'] = $login['id_utilisateur'];
    $_SESSION['user']['username'] = $login['pseudo'];
    $_SESSION['user']['type'] = $login['type'];
    $data['type'] = "Success";
    $data['message'] = "Login Successfull";
} elseif ($login == 0) {
    $data['type'] = 'Error';
    $data['message'] = 'An Error Producced';
} else {
    $data['type'] = 'Error';
    $data['message'] = 'Username Or Password Innccorect';
}
echo json_encode($data);
