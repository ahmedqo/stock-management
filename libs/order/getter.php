<?php
ob_start();
include_once("../classes.php");
session_start();
$data = array();
$id = $_POST['id'];
$connection = new connection();
$db = $connection->getconnection();
$query = new order($db);
$results = $query->get($id);
if ($results) {
    $data['type'] = "Success";
    $data['message'] = $results;
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
