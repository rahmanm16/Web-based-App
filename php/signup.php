<?php

header('Content-Type: application/json');

$servername = "mr988.brighton.domains";
$username = "mr988_adminChat";
$password = "airpodpro@12";
$dbname = "mr988_GPChatApp";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => "Connection failed: " . $conn->connect_error]));
}

$data = $_POST;

// Handle user signup
if (isset($data['action']) && $data['action'] === 'signup') {
    $username = $conn->real_escape_string($data['username']);
    $email = $conn->real_escape_string($data['email']);
    $password = $conn->real_escape_string($data['password']);

    $sql = $conn->prepare("SELECT id FROM tUsers WHERE username = ? OR email = ?");
    $sql->bind_param("ss", $username, $email);
    $sql->execute();
    $result = $sql->get_result();
    if ($result->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'Username or Email already exists!']);
        exit;
    }

    $hashedPassword = password_hash($spassword, PASSWORD_DEFAULT);
    $insert = $conn->prepare("INSERT INTO tUsers (username, email, password) VALUES (?, ?, ?)");
    $insert->bind_param("sss", $username, $email, $hashedPassword);
    $insert->execute();

    echo json_encode(['success' => $insert->affected_rows > 0, 'message' => $insert->affected_rows > 0 ? 'Registration Successful' : 'Registration Failed']);
    exit;
}

// Handle user login
if (isset($data['action']) && $data['action'] === 'login') {
    $username = $conn->real_escape_string($data['username']);
    $password = $conn->real_escape_string($data['password']);

    $sql = $conn->prepare("SELECT password FROM tUsers WHERE username = ?");
    $sql->bind_param("s", $username);
    $sql->execute();
    $result = $sql->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode([
            'success' => password_verify($password, $row['password']),
            'message' => password_verify($password, $row['password']) ? 'Login Successful' : 'Invalid password'
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'User does not exist']);
    }
    exit;
}

$conn->close();
