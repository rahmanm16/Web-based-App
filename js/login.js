//Send form data to server

fetch('php/login.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
})
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'chat-menu.html';
        } else {
            console.error('Login failed:', data.message);
        }
    })
    //Error handling
    .catch(error => {
        console.error('Error:', error);
    });