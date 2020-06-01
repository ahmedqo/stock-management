<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$title = $_POST['titleAdd'];
$image = $_FILES['imageAdd'];
$brand = $_POST['brandAdd'];
$category = $_POST['categoryAdd'];
$quantity = $_POST['quantityAdd'];
$price = $_POST['priceAdd'];
$connection = new connection();
$db = $connection->getconnection();
$Product = new product($db);
$product = $Product->setProduct($title, $image, $brand, $category, $quantity, $price);
if ($product) {
    $data['type'] = "Success";
    $data['message'] = "Added Successfully";
} elseif ($product === 0) {
    $data['type'] = "Error";
    $data['message'] = "Name Already Exists";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
