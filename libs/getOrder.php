<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$id = $_POST['id'];
$connection = new connection();
$db = $connection->getconnection();
$Order = new order($db);
$order = $Order->getOrder($id);
if ($order) {
    $data['type'] = "Success";
    $data['message'] = $order;
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
