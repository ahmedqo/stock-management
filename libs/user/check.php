<?php
session_start();
$data = array();
if (isset($_SESSION['user'])) {
    $data['type']  = "Success";
    $data['message']['id'] = $_SESSION['user']['id'];
    $data['message']['username'] = $_SESSION['user']['username'];
    $data['message']['type'] = $_SESSION['user']['type'];
} else {
    $data['type']  = "Error";
}
echo json_encode($data);
