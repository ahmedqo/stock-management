<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$id = $_POST['id'];
$connection = new connection();
$db = $connection->getconnection();
$Category = new category($db);
$category = $Category->getCategory($id);
if ($category) {
    $data['type'] = "Success";
    $data['message'] = $category;
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
