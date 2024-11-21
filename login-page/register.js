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
            <input type="text" id="username" class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Username" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="fullname">Full Name</label>
            <input type="text" id="fullname" class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Full Name" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="email">Email Address</label>
            <input type="email" id="email" class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Email Address" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="password">Password</label>
            <input type="password" id="password" class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Password" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Confirm Password" required>
          </div>
          <button type="submit" class="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition">Sign Up</button>
        </form>
        <div id="verificationCodeSection" class="hidden mt-8 text-center">
          <label for="verificationCode" class="block text-gray-800 font-bold mb-4">Enter Verification Code</label>
          <input type="text" id="verificationCode" class="w-full max-w-md p-3 border rounded focus:outline-none mb-4" placeholder="Verification Code">
          <button id="verifyCodeButton" class="w-full max-w-md bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition mb-4">Verify</button>
          <button id="goBackButton" class="w-full max-w-md bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 transition">Go Back to Home</button>
        </div>
      </div>
    `;
  
    root.innerHTML = htmlContent;
  
    const form = document.getElementById('registrationForm');
    const errorMessages = document.getElementById('errorMessages');
    const verificationCodeSection = document.getElementById('verificationCodeSection');
    const verifyCodeButton = document.getElementById('verifyCodeButton');
    const goBackButton = document.getElementById('goBackButton');
    const verificationCodeInput = document.getElementById('verificationCode');
  
    let generatedCode = '';
  
    // Form submission logic
    form.addEventListener('submit', (e) => {
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
  
      // Simulate sending a verification code to the email
      generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      console.log(`Verification code sent to ${email}: ${generatedCode}`);
  
      verificationCodeSection.classList.remove('hidden');
      form.classList.add('hidden');
      errorMessages.classList.add('hidden');
    });
  
    // Code verification logic
    verifyCodeButton.addEventListener('click', () => {
      const enteredCode = verificationCodeInput.value.trim();
  
      if (enteredCode === generatedCode) {
        alert('Email verified successfully!');
        window.location.href = 'index.html'; // Redirect to login page
      } else {
        alert('Invalid verification code!');
      }
    });
  
    // Go back button logic
    goBackButton.addEventListener('click', () => {
      window.location.href = 'index.html'; // Redirect to login page
    });
  });
  