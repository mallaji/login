document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');

  // HTML content for the registration form
  const htmlContent = `
    <div class="min-h-screen flex justify-center items-center bg-gray-100">
      <form id="registrationForm" class="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-3xl font-bold mb-6 text-gray-800 text-center">Create Your Account</h2>
        <div id="errorMessages" class="mb-4 text-red-500 hidden"></div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="username">Username</label>
          <input type="text" id="username" class="w-full p-3 border rounded focus:outline-none" placeholder="Username" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="fullname">Full Name</label>
          <input type="text" id="fullname" class="w-full p-3 border rounded focus:outline-none" placeholder="Full Name" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="email">Email Address</label>
          <input type="email" id="email" class="w-full p-3 border rounded focus:outline-none" placeholder="Email Address" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="password">Password</label>
          <input type="password" id="password" class="w-full p-3 border rounded focus:outline-none" placeholder="Password" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" class="w-full p-3 border rounded focus:outline-none" placeholder="Confirm Password" required>
        </div>
        <button type="submit" class="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded">Sign Up</button>
      </form>
    </div>
  `;

  root.innerHTML = htmlContent;

  const form = document.getElementById('registrationForm');
  const errorMessages = document.getElementById('errorMessages');

  // Form submission logic
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const username = document.getElementById('username').value.trim();
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validation
    const errors = [];
    if (!username) errors.push('Username is required.');
    if (!fullname) errors.push('Full Name is required.');
    if (!email || !/\S+@\S+\.\S+/.test(email)) errors.push('A valid Email Address is required.');
    if (!password || password.length < 8) errors.push('Password must be at least 8 characters long.');
    if (password !== confirmPassword) errors.push('Passwords do not match.');

    if (errors.length > 0) {
      errorMessages.innerHTML = errors.join('<br>');
      errorMessages.classList.remove('hidden');
      return;
    }

    // Make API call to register user
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, fullname, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful! Check your email for the verification code.');
        window.location.href = 'verify.html'; // Redirect to verification page
      } else {
        errorMessages.innerHTML = data.message || 'Something went wrong.';
        errorMessages.classList.remove('hidden');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering.');
    }
  });
});
