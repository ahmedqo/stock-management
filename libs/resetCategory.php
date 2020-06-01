<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$id = $_POST['idEdit'];
$name = $_POST['nameEdit'];
$connection = new connection();
$db = $connection->getconnection();
$Category = new category($db);
$category = $Category->resetCategory($id, $name);
if ($category) {
    $data['type'] = "Success";
    $data['message'] = "Updated Successfully";
} elseif ($category === 0) {
    $data['type'] = "Error";
    $data['message'] = "Name Already Exists";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
