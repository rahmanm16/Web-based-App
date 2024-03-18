<?php
include 'connection.php'; // Adjust the path as necessary

if ($mysqli) {
    $senderUserID = 1; // Example sender ID
    $receiverUserID = 2; // Example receiver ID
    $messageText = "Hello, test message"; // Example message text

    $stmt = $mysqli->prepare("INSERT INTO tMessages (senderUserID, receiverUserID, messageText) VALUES (?, ?, ?)");
    if ($stmt) {
        $stmt->bind_param("iis", $senderUserID, $receiverUserID, $messageText);

        if($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Message Sent']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Message Failed', 'error' => $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare statement', 'error' => $mysqli->error]);
    }

    $mysqli->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Database connection not established']);
}
?>
