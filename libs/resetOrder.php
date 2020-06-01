<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$id = $_POST['idEdit'];
$name = $_POST['nameEdit'];
$phone = $_POST['phoneEdit'];
$address = $_POST['addressEdit'];
$total = $_POST['totalEdit'];
$payment = $_POST['paymentEdit'];
$products = $_POST['produitEdit'];
$quantities = $_POST['quantiteEdit'];
$prices = $_POST['prixEdit'];
$connection = new connection();
$db = $connection->getconnection();
$Order = new order($db);
$order = $Order->resetOrder($id, $name, $phone, $address, $total, $payment, $products, $quantities, $prices);
if ($order) {
    $data['type'] = "Success";
    $data['message'] = "Updated Successfully";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
