<?php
ob_start();
include_once("../classes.php");
session_start();
$data = array();
$connection = new connection();
$db = $connection->getconnection();
$query = new user($db);
$results = $query->getAll();
if ($results) {
    $data['type'] = "Success";
    $data['message'] = $results;
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
