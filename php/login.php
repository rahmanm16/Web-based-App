<?php
header('Content-Type: application/json');
/*
    Connects to the PHPMYADMIN database, validates login/signup data, 
    returns JSON response indicating whether operation was successful or not
*/

//Darshan; you must replace the following with your database credentials
//once replaced, next task is to create test case for this
$servername = "brighton";
$username = "";
$password = "";
$dbname = "";

//Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

//Check connection
if($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection Failed: ' . $conn->connect_error]))
}

//Obtain form data
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = $data['password'];

//Can implement below hashing for either username and/or password

//Query database - useful to get data fast
$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
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