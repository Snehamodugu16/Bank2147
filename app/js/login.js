import { api } from "./api.js";

// 👁 SHOW / HIDE PASSWORD
window.togglePassword = function () {
  const pwd = document.getElementById("password");
  pwd.type = pwd.type === "password" ? "text" : "password";
};

// 🔐 LOGIN
window.login = async function () {

  const loader = document.querySelector('[data-testid="loader"]');
  const errorMsg = document.querySelector('[data-testid="error-msg"]');

  loader.classList.remove("hidden");
  errorMsg.textContent = "";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {

    await api.login(username, password);

    // optional remember-me flag
    if (document.getElementById("rememberMe").checked) {
      localStorage.setItem("rememberMe", "true");
    }

    window.location.href = "dashboard.html";

  } catch (err) {

    errorMsg.textContent = err;

  }

  loader.classList.add("hidden");
};

// 🔁 AUTO REDIRECT IF SESSION EXISTS
window.onload = async () => {
  try {
    await api.getAccount();
    window.location.href = "dashboard.html";
  } catch {
    // stay on login page
  }
};