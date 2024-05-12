<?php

// Turn off all error reporting = 0
// error_reporting(0);
// Report all PHP errors = E_ALL, -1
error_reporting(E_ALL);
header("Content-Type: application/json; charset=UTF-8");
// header('WWW-Authenticate: Basic realm="Protected zone"');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
// date_default_timezone_set("Asia/Manila");
date_default_timezone_set("Asia/Taipei");