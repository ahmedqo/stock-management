<?php
session_start();
$data = array();
if (isset($_SESSION['user']['id'])) {
    $data['loged_in']  = true;
} else {
    $data['loged_in']  = false;
}
echo json_encode($data);
