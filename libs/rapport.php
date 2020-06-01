<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$start = $_POST['startDate'];
$end = $_POST['endDate'];
$connection = new connection();
$db = $connection->getconnection();
$Order = new order($db);
$orders = $Order->rapportOrder($start, $end);
if ($orders) {
    $data['type'] = "Success";
    $data['message'] = $orders;
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
