<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user = new User($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("userid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    $user->user_aid = $_GET['userid'];
    $user->user_name = checkIndex($data, "user_name");
    $user->user_datetime = date("Y-m-d H:i:s");
    checkId($user->user_aid);
    // update
    $query = checkUpdate($user);
    returnSuccess($user, "User ", $query);
}

// return 404 error if endpoint not available
checkEndpoint();