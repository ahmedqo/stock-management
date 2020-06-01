<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$name = $_POST['nameAdd'];
$connection = new connection();
$db = $connection->getconnection();
$Brand = new brand($db);
$brand = $Brand->setBrand($name);
if ($brand) {
    $data['type'] = "Success";
    $data['message'] = "Added Successfully";
} elseif ($brand === 0) {
    $data['type'] = "Error";
    $data['message'] = "Name Already Exists";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
