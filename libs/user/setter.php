<?php
ob_start();
include_once("../classes.php");
session_start();
$data = array();
$username = $_POST['usernameNew'];
$password = $_POST['passwordNew'];
$type = $_POST['typeNew'];
$connection = new connection();
$db = $connection->getconnection();
$query = new user($db);
$results = $query->set($username, $password, $type);
if ($results) {
    $data['type'] = "Success";
    $data['message'] = "Added Successfully";
} elseif ($results === 0) {
    $data['type'] = "Error";
    $data['message'] = "User Already Exists";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
