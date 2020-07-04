<?php
ob_start();
include_once("../classes.php");
session_start();
$data = array();
$id = $_SESSION['user']['id'];
$connection = new connection();
$db = $connection->getconnection();
$query = new user($db);
$results = $query->get($id);
if ($results) {
    $data['type'] = "Success";
    $data['message'] = $results;
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
