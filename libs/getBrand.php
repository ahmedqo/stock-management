<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$id = $_POST['id'];
$connection = new connection();
$db = $connection->getconnection();
$Brand = new brand($db);
$brand = $Brand->getBrand($id);
if ($brand) {
    $data['type'] = "Success";
    $data['message'] = $brand;
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
