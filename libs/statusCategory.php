<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$id = $_POST['id'];
$status = $_POST['status'];
$connection = new connection();
$db = $connection->getconnection();
$Category = new category($db);
$category = $Category->statusCategory($status, $id);
if ($category) {
    $data['type'] = "Success";
    $data['message'] = "Updated Successfully";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
