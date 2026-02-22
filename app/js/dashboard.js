import { api } from "./api.js";

async function loadDashboard() {

  try {

    const user = await api.getAccount();

    document.querySelector('[data-testid="welcome"]').textContent = user.name;
    document.querySelector('[data-testid="account"]').textContent = user.account;
    document.querySelector('[data-testid="balance"]').textContent = user.balance;

  } catch {

    window.location.href = "login.html";

  }
}

loadDashboard();

window.logout = function () {

  localStorage.removeItem("bank2147_session");

  window.location.href = "login.html";
};