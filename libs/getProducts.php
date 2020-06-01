<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$search = isset($_POST['search']) ? $_POST['search'] : "";
$status = isset($_POST['status']) ? $_POST['status'] : "";
$connection = new connection();
$db = $connection->getconnection();
$Product = new product($db);
$products = $Product->getProducts($search, $status);
if ($products) {
    $data['type'] = "Success";
    $data['message'] = $products;
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
