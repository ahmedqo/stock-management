<?php
ob_start();
include_once("../classes.php");
session_start();
$data = array();
$order = $_POST['idNew'];
$amount = $_POST['amountNew'];
$type = $_POST['typeNew'];
$connection = new connection();
$db = $connection->getconnection();
$query = new payment($db);
$results = $query->set($order, $amount, $type);
if ($results == 'true') {
    $data['type'] = "Success";
    $data['message'] = "Added Successfully";
} else if ($results) {
    $data['type'] = "Error";
    $data['message'] = "Max Payment Is " . $results . " MAD";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
