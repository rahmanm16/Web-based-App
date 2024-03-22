<?php
// Include database conection file
include 'connection.php'; // Adjust the path as necessary

// Check if the connection was successful
if ($mysqli) {
    $senderUserID = 1; // Example sender ID
    $receiverUserID = 2; // Example receiver ID
    $messageText = "Hello, test message"; // Example message text

    // Prepare the SQL statement for inserting example message into database
    $stmt = $mysqli->prepare("INSERT INTO tMessages (senderUserID, receiverUserID, messageText) VALUES (?, ?, ?)");
    if ($stmt) {
        // Bind sender receiver and message text to the prepared sql statement
        $stmt->bind_param("iis", $senderUserID, $receiverUserID, $messageText);
        // if executed, return success message or error message
        if($stmt->execute()) {
            // Return success message
            echo json_encode(['success' => true, 'message' => 'Message Sent']);
        } else {
            // Return error message
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
