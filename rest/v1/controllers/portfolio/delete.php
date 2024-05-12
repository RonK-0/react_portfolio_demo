<?php
$conn = null;
$conn = checkDbConnection();
$portfolio = new Portfolio($conn);

$error = [];
$returnData = [];
if (array_key_exists("portfolioid", $_GET)) {
    $portfolio->portfolio_aid = $_GET['portfolioid'];
    checkId($portfolio->portfolio_aid);

    $query = checkDelete($portfolio);
    returnSuccess($portfolio, "portfolio", $query);
}

checkEndpoint();