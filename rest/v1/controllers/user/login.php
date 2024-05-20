<?php

// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
// use JWT
require '../../jwt/vendor/autoload.php';
// use needed classes
require '../../models/User.php';

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user = new User($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    $user->user_email = $data['user_email'];
    $password = $data['password'];

    $key = "jwt_admin_ko_ito";

    $result = checkLogin($user);

    $row = $result->fetch(PDO::FETCH_ASSOC);
    extract($row);

    loginAccess(
        $password,
        $user_password,
        $user_email,
        $row,
        $result,
        $key
    );
}

http_response_code(200);