<?php
ob_start();
include_once("../classes.php");
session_start();
$data = array();
$username = $_POST['username'];
$password = $_POST['password'];
$connection = new connection();
$db = $connection->getconnection();
$query = new user($db);
$results = $query->login($username, $password);
if ($results) {
    if ($results[4] == 1) {
        $_SESSION['user']['id'] = $results[0];
        $_SESSION['user']['username'] = $results[1];
        $_SESSION['user']['type'] = $results[3];
        $data['type'] = "Success";
        $data['message'] = "Login Successfully";
    } else {
        $data['type'] = "Error";
        $data['message'] = "Your Account Is Inactive";
    }
} elseif ($results == 0) {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
} else {
    $data['type'] = 'Error';
    $data['message'] = 'Username Or Password Innccorect';
}
echo json_encode($data);
