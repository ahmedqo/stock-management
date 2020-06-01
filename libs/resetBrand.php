<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$id = $_POST['idEdit'];
$name = $_POST['nameEdit'];
$connection = new connection();
$db = $connection->getconnection();
$Brand = new brand($db);
$brand = $Brand->resetBrand($id, $name);
if ($brand) {
    $data['type'] = "Success";
    $data['message'] = "Updated Successfully";
} elseif ($brand === 0) {
    $data['type'] = "Error";
    $data['message'] = "Name Already Exists";
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
