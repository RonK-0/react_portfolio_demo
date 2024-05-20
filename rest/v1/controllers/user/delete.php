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
    // get data
    $user->user_aid = $_GET['userid'];
    checkId($user->user_aid);
    // delete
    $query = checkDelete($user);
    returnSuccess($user, "User", $query);
}

// return 404 error if endpoint not available
checkEndpoint();