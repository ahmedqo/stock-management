<?php
ob_start();
include_once("../classes.php");
session_start();
$data = array();
$name = $_POST['nameNew'];
$contact = $_POST['contactNew'];
$address = $_POST['addressNew'];
$connection = new connection();
$db = $connection->getconnection();
$query = new supplier($db);
$results = $query->set($name, $contact, $address);
if ($results) {
    $data['type'] = "Success";
    $data['message'] = "Added Successfully";
} elseif ($results === 0) {
    $data['type'] = "Error";
    $data['message'] = "Supplier Already Exists";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
