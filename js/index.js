document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('username-form');
  const usernameInput = document.getElementById('username');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = usernameInput.value.trim();
    if (username) {
      // Store username in session storage
      sessionStorage.setItem('username', username);
      // Redirect to chat menu
      window.location.href = 'chat-menu.html';
    }
  });

});