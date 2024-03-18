<?php

    // Credentials for the database
    $servername = "brighton";
    $username = "mr988_admin";
    $password = "qwerty@1999";
    $dbname = "mr988_GPChatApp";

    // Create connection
    $mysqli = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if($mysqli->connect_error) {
        die("Connection Failed: " . $mysqli->connect_error);
    }
?>

