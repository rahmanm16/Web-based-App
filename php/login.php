<?php
header('Content-Type: application/json');
/*
    Connects to the PHPMYADMIN database, validates login/signup data, 
    returns JSON response indicating whether operation was successful or not
*/


$servername = "brighton";
$username = "ds1140_gpadmin";
$password = "Nucger9d";
$dbname = "ds1140_grouproject";

//Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if($conn->connect_error){
    die("Connection Failed: " . $conn->connect_error);
}


//Obtain form data
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = $data['password'];

//Can implement below hashing for either username and/or password

//Query database - useful to get data fast
$sql = "SELECT * FROM tUsers WHERE username = '$username' AND password = '$password'";
$result = $conn->query($sql);

if($result->num_rows > 0) {
    //login success
    echo json_encode(['success' => true, 'message' => 'Login Successful']);
} else {
    //login failed
    echo json_encode(['success' => false, 'message' => 'Login Failed']);
}

$conn->close();
?>