<?php
ob_start();
include_once("../classes.php");
session_start();
$data = array();
$id = $_POST['idEdit'];
$name = $_POST['nameEdit'];
$contact = $_POST['contactEdit'];
$address = $_POST['addressEdit'];
$total = $_POST['totalEdit'];
$products = $_POST['productsEdit'];
$prices = $_POST['pricesEdit'];
$quantities = $_POST['quantitiesEdit'];
$connection = new connection();
$db = $connection->getconnection();
$query = new order($db);
$results = $query->reset($id, $name, $contact, $address, $total, $products, $prices, $quantities);
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
