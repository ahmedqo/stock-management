<?php
ob_start();
include_once("../classes.php");
session_start();
$data = array();
$id = $_POST['idEdit'];
$label = $_POST['labelEdit'];
$connection = new connection();
$db = $connection->getconnection();
$query = new category($db);
$results = $query->reset($id, $label);
if ($results) {
    $data['type'] = "Success";
    $data['message'] = "Updated Successfully";
} elseif ($results === 0) {
    $data['type'] = "Error";
    $data['message'] = "Category Already Exists";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
