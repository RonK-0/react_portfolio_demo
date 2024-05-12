<?php
require '../../core/header.php';
require '../../core/functions.php';
require '../../models/Portfolio.php';

$conn = null;
$conn = checkDbConnection();

$portfolio = new Portfolio($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);


if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("portfolioid", $_GET)) {

        checkPayload($data);
        $portfolio->portfolio_aid = $_GET['portfolioid'];
        $portfolio->portfolio_is_active = trim($data["isActive"]);
        $portfolio->portfolio_datetime = date("Y-m-d H:i:s");
        checkId($portfolio->portfolio_aid);
        $query = checkActive($portfolio);
        http_response_code(200);
        returnSuccess($portfolio, "portfolio", $query);
    }
    checkEndpoint();
}

http_response_code(200);
// header('HTTP/1.0 401 Unauthorized');
checkAccess();