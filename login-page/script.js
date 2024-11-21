document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');

  const htmlContent = `
    <div class="min-h-screen flex">
      <div class="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 bg-white">
        <img src="images/logo.png" alt="Logo" class="mb-4">
        <h2 class="text-2xl font-bold mb-2">Welcome Back!</h2>
        <p class="text-zinc-600 mb-6">Please enter your details</p>
        <form id="loginForm" class="w-full max-w-sm">
          <div class="mb-4">
            <label class="block text-zinc-700 text-sm font-bold mb-2" for="email">
              Email Address
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email Address" required>
          </div>
          <div class="mb-4">
            <label class="block text-zinc-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" required>
          </div>
          <div class="flex items-center justify-between mb-4">
            <label class="flex items-center">
              <input class="mr-2 leading-tight" type="checkbox">
              <span class="text-sm text-zinc-600">Remember me</span>
            </label>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
          <button id="loginButton" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Login →
          </button>
          <p class="text-center text-zinc-600 text-xs mt-4">
            By creating an account, you agree to our <a href="#" class="text-blue-500">Terms of Service</a> and <a href="#" class="text-blue-500">Privacy Policy</a>
          </p>
          <p class="text-center text-zinc-600 text-xs mt-4">
            Don't have an account? <a href="register.html" class="text-blue-500">Sign Up</a>
          </p>
        </form>
      </div>
      <div class="hidden lg:flex flex-col justify-center items-center w-1/2 bg-purple-600 text-white p-8">
        <img src="images/illustration.png" alt="Illustration" class="mb-4">
        <h2 class="text-2xl font-bold mb-2">Seamless work experience</h2>
        <p class="text-zinc-200">Everything you need to know about testing.</p>
      </div>
    </div>
  `;

  root.innerHTML = htmlContent;

  // Handle login form submission
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get input values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validate inputs
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      // Send login request to backend
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        alert('Login successful!');
        // Redirect to dashboard or home page
        window.location.href = 'dashboard.html';
      } else {
        // Show error message from server
        alert(data.message || 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred while trying to log in. Please try again.');
    }
  });
});
