<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$id = $_POST['idEdit'];
$title = $_POST['titleEdit'];
$image = $_FILES['imageEdit'];
$brand = $_POST['brandEdit'];
$category = $_POST['categoryEdit'];
$quantity = $_POST['quantityEdit'];
$price = $_POST['priceEdit'];
$connection = new connection();
$db = $connection->getconnection();
$Product = new product($db);
$product = $Product->resetProduct($id, $title, $image, $brand, $category, $quantity, $price);
if ($product) {
    $data['type'] = "Success";
    $data['message'] = "Updated Successfully";
} elseif ($product === 0) {
    $data['type'] = "Error";
    $data['message'] = "Name Already Exists";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
