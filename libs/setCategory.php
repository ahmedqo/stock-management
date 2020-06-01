<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$name = $_POST['nameAdd'];
$connection = new connection();
$db = $connection->getconnection();
$Category = new category($db);
$category = $Category->setCategory($name);
if ($category) {
    $data['type'] = "Success";
    $data['message'] = "Added Successfully";
} elseif ($category === 0) {
    $data['type'] = "Error";
    $data['message'] = "Name Already Exists";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
