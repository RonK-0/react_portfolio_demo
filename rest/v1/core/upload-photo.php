<?php

require "Response.php";
// use needed classes
$response = new Response();
$error = [];
$returnData = [];

if ($_FILES['photo']) {
    $photo = $_FILES["photo"]["name"];
    // if (move_uploaded_file($_FILES["photo"]["tmp_name"], "../../../gla/img/" . $photo)) { // if online
    if (move_uploaded_file($_FILES["photo"]["tmp_name"], "../../../public/img/" . $photo)) { // if localhost
        $returnData["success"] = true;
        $returnData["message"] = "Photo success.";
        $response->setData($returnData);
        $response->send();
        exit;
    } else {
        $response->setSuccess(false);
        $error["success"] = false;
        $error['error'] = "Photo error.";
        $response->setData($error);
        $response->send();
        exit;
    }
} else {
    $response->setSuccess(false);
    $error["count"] = 0;
    $error["success"] = false;
    $error['error'] = "No photo.";
    $response->setData($error);
    $response->send();
    exit;
}