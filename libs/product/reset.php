<?php
ob_start();
include_once("../classes.php");
session_start();
$data = array();
$id = $_POST['idEdit'];
$title = $_POST['titleEdit'];
$brand = $_POST['brandEdit'];
$category = $_POST['categoryEdit'];
$supplier = $_POST['supplierEdit'];
$cost = $_POST['costEdit'];
$profit = $_POST['profitEdit'];
$quantity = $_POST['quantityEdit'];
$connection = new connection();
$db = $connection->getconnection();
$query = new product($db);
$results = $query->reset($id, $title, $brand, $category, $supplier, $cost, $profit, $quantity);
if ($results) {
    $data['type'] = "Success";
    $data['message'] = "Updated Successfully";
} elseif ($results === 0) {
    $data['type'] = "Error";
    $data['message'] = "Product Already Exists";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
