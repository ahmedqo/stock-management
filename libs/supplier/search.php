<?php
ob_start();
include_once("../classes.php");
session_start();
$data = array();
$label = $_POST['labelSearch'] ? $_POST['labelSearch'] : "";
$status = $_POST['statusSearch'];
$connection = new connection();
$db = $connection->getconnection();
$query = new supplier($db);
$results = $query->search($label, $status);
if ($results) {
    $data['type'] = "Success";
    $data['message'] = $results;
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
