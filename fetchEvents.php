<?php
include_once('database.php');
include_once('debug.php');
header("Content-Type: application/json");
session_start();
ini_set("session.cookie_httponly",1);
$username = $_SESSION["user"];
$day = mysql_real_escape_string(htmlentities($_POST["day"]));

$sql = "SELECT title, time FROM events WHERE (username = '$username' AND date='$day');";
$res = mysql_query($sql);
$events = array();
//echo("<script>console.log('hello');</script>");
while($event = mysql_fetch_array($res)){
    array_push($events, $event);
}
if(!empty($events)){
    echo json_encode(
        array(
            "eventExisted" => true,
            "events" => $events
        )
    );
    exit();
}else{
    echo json_encode(
        array(
            "eventExisted" => false,
            "message" => mysql_fetch_array($res),
            "events" => $events
        )
    );
    exit();    
}
?>