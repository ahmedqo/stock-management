<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$name = $_POST['nameAdd'];
$phone = $_POST['phoneAdd'];
$address = $_POST['addressAdd'];
$total = $_POST['totalAdd'];
$payment = $_POST['paymentAdd'];
$products = $_POST['produitAdd'];
$quantities = $_POST['quantiteAdd'];
$prices = $_POST['prixAdd'];
$connection = new connection();
$db = $connection->getconnection();
$Order = new order($db);
$order = $Order->setOrder($name, $phone, $address, $total, $payment, $products, $quantities, $prices);
if ($order) {
    $data['type'] = "Success";
    $data['message'] = "Added Successfully";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
