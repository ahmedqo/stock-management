<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$id = $_POST['id'];
$connection = new connection();
$db = $connection->getconnection();
$Item = new item($db);
$items = $Item->getItems($id);
if ($items) {
    $data['type'] = "Success";
    $data['message'] = $items;
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
