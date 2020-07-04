<?php
ob_start();
include_once("../classes.php");
session_start();
$data = array();
$title = $_POST['titleNew'];
$brand = $_POST['brandNew'];
$category = $_POST['categoryNew'];
$supplier = $_POST['supplierNew'];
$cost = $_POST['costNew'];
$profit = $_POST['profitNew'];
$quantity = $_POST['quantityNew'];
$connection = new connection();
$db = $connection->getconnection();
$query = new product($db);
$results = $query->set($title, $brand, $category, $supplier, $cost, $profit, $quantity);
if ($results) {
    $data['type'] = "Success";
    $data['message'] = "Added Successfully";
} elseif ($results === 0) {
    $data['type'] = "Error";
    $data['message'] = "Product Already Exists";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
