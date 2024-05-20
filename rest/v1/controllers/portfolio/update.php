<?php
$conn = null;
$conn = checkDbConnection();
$portfolio = new Portfolio($conn);
$error = [];
$returnData = [];
if (array_key_exists("portfolioid", $_GET)) {
    checkPayload($data);
    $portfolio->portfolio_aid = $_GET['portfolioid'];
    $portfolio->portfolio_title = checkIndex($data, "portfolio_title");
    $portfolio->portfolio_photo = checkIndex($data, "portfolio_photo");
    $portfolio->portfolio_category = checkIndex($data, "portfolio_category");
    $portfolio->portfolio_description = checkIndex($data, "portfolio_description");
    $portfolio->portfolio_publish_date = checkIndex($data, "portfolio_publish_date");
    $portfolio->portfolio_datetime = date("Y-m-d H:i:s");

    checkId($portfolio->portfolio_aid);
    // $portfolio_name_old = checkIndex($data, "portfolio_name_old");
    // compareName($portfolio, $portfolio_name_old, $portfolio->portfolio_name);
    $query = checkUpdate($portfolio);
    returnSuccess($portfolio, "portfolio", $query);
}

checkEndpoint();