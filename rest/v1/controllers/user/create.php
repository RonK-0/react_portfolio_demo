<?php
require '../../notification/verify-account.php';

$conn = null;
$conn = checkDbConnection();
// make instance of classes

$user = new User($conn);
$encrypt = new Encryption();


if (array_key_exists("userid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$user->user_name = checkIndex($data, "user_name");
$user->user_is_active = 1;
$user->user_email = checkIndex($data, "user_email");
$user->user_key = $encrypt->doHash(rand());
$user->user_created = date("Y-m-d H:i:s");
$user->user_datetime = date("Y-m-d H:i:s");

$password_link = "/create-password";
// check email
// isEmailExist($user, $user->user_email);

// send email notification

sendEmail(
    $password_link,
    $user->user_name,
    $user->user_email,
    $user->user_key
);

// create
$query = checkCreate($user);
// checkCreateAccount($user);



returnSuccess($user, "User", $query);