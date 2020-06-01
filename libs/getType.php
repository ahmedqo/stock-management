<?php
session_start();
$data = array();
if (isset($_SESSION['user']['id'])) {
    $data['type']  = $_SESSION['user']['type'];
}
echo json_encode($data);
