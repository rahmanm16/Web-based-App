// Wait for the DOM to fully load before attaching event handlers
window.addEventListener('DOMContentLoaded', (event) => {
  const toggleLogin = document.getElementById('toggle-login');
  const toggleSignup = document.getElementById('toggle-signup');
  const loginFormPanel = document.getElementById('login-form');
  const signupFormPanel = document.getElementById('signup-form');

  // Add click event for 'Log In' button
  toggleLogin.addEventListener('click', function () {
    loginFormPanel.classList.add('active');
    signupFormPanel.classList.remove('active');
    this.classList.add('active');
    toggleSignup.classList.remove('active');
  });

  // Add click event for 'Sign Up' button
  toggleSignup.addEventListener('click', function () {
    signupFormPanel.classList.add('active');
    loginFormPanel.classList.remove('active');
    this.classList.add('active');
    toggleLogin.classList.remove('active');
  });

  // Handle form submissions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission
      const formInputs = this.querySelectorAll('input');
      const formData = Array.from(formInputs).reduce((acc, input) => {
        acc[input.type] = input.value;
        return acc;
      }, {});
      console.log('Form data:', formData);

    });
  });
});

