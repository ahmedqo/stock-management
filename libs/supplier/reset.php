<?php
ob_start();
include_once("../classes.php");
session_start();
$data = array();
$id = $_POST['idEdit'];
$name = $_POST['nameEdit'];
$contact = $_POST['contactEdit'];
$address = $_POST['addressEdit'];
$connection = new connection();
$db = $connection->getconnection();
$query = new supplier($db);
$results = $query->reset($id, $name, $contact, $address);
if ($results) {
    $data['type'] = "Success";
    $data['message'] = "Updated Successfully";
} elseif ($results === 0) {
    $data['type'] = "Error";
    $data['message'] = "Supplier Already Exists";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
