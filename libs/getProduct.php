<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$id = $_POST['id'];
$connection = new connection();
$db = $connection->getconnection();
$Product = new product($db);
$product = $Product->getProduct($id);
if ($product) {
    $data['type'] = "Success";
    $data['message'] = $product;
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
