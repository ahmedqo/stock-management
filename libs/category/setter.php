<?php
ob_start();
include_once("../classes.php");
session_start();
$data = array();
$label = $_POST['labelNew'];
$connection = new connection();
$db = $connection->getconnection();
$query = new category($db);
$results = $query->set($label);
if ($results) {
    $data['type'] = "Success";
    $data['message'] = "Added Successfully";
} elseif ($results === 0) {
    $data['type'] = "Error";
    $data['message'] = "Category Already Exists";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
