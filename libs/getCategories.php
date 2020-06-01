<?php
ob_start();
include_once("classes.php");
session_start();
$data = array();
$search = isset($_POST['search']) ? $_POST['search'] : "";
$status = isset($_POST['status']) ? $_POST['status'] : "";
$connection = new connection();
$db = $connection->getconnection();
$Category = new category($db);
$categories = $Category->getCategories($search, $status);
if ($categories) {
    $data['type'] = "Success";
    $data['message'] = $categories;
} else {
    $data['type'] = "Error";
    $data['message'] = "Something Goes Wrong";
}
echo json_encode($data);
