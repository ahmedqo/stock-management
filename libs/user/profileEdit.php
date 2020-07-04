<?php
ob_start();
include_once("../classes.php");
session_start();
$data = array();
$id = $_SESSION['user']['id'];
$username = $_POST['usernameEdit'];
$password = $_POST['passwordEdit'];
$connection = new connection();
$db = $connection->getconnection();
$query = new user($db);
$results = $query->reset($id, $username, $password, '');
if ($results) {
    $data['type'] = "Success";
    $data['message'] = "Updated Successfully";
} elseif ($results === 0) {
    $data['type'] = "Error";
    $data['message'] = "User Already Exists";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
