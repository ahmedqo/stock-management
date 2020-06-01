<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$connection = new connection();
$db = $connection->getconnection();
$report = new report($db);
$products = $report->prods();
if ($products) {
    $data['type'] = "Success";
    $data['message'] = $products;
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
