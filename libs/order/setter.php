<?php
ob_start();
include_once("../classes.php");
session_start();
$data = array();
$name = $_POST['nameNew'];
$contact = $_POST['contactNew'];
$address = $_POST['addressNew'];
$total = $_POST['totalNew'];
$products = $_POST['productsNew'];
$prices = $_POST['pricesNew'];
$quantities = $_POST['quantitiesNew'];
$connection = new connection();
$db = $connection->getconnection();
$query = new order($db);
$results = $query->set($name, $contact, $address, $total, $products, $prices, $quantities);
if ($results) {
    $data['type'] = "Success";
    $data['message'] = "Added Successfully";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
