<?php

    // Credentials for the database
    $servername = "brighton";
    $username = "ds1140_gpadmin";
    $password = "Nucger9d";
    $dbname = "ds1140_grouproject";

    // Create connection
    $mysqli = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if($mysqli->connect_error) {
        die("Connection Failed: " . $mysqli->connect_error);
    }
?>

