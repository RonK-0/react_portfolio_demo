<?php
// set http header
require '../../core/header.php';
require '../../core/Encryption.php';
// use neunctions
require '../../core/functions.php';
// use nelasses
require '../../models/User.php';

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user = new User($conn);
$response = new Response();
$encrypt = new Encryption();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);
    $user->user_password = $encrypt->doPasswordHash($data["new_password"]);
    $user->user_key = $data["key"];
    $user->user_datetime = date("Y-m-d H:i:s");
    $query = checkSetPassword($user);
    http_response_code(200);
    returnSuccess($user, "Key", $query);
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();