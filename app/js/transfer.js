import { api } from "./api.js";

const msg = document.querySelector('[data-testid="msg"]');
const loader = document.querySelector('[data-testid="loader"]');
const btn = document.querySelector('[data-testid="transfer-btn"]');

window.transfer = async function () {

  msg.textContent = "";
  loader.classList.remove("hidden");
  btn.disabled = true;

  try {

    const beneficiary = document.getElementById("beneficiary").value;

    const amount = Number(
      document.getElementById("amount").value.trim()
    );

    // ✅ basic UI validation
    if (!beneficiary) throw "Select beneficiary";
    if (!amount || amount <= 0) throw "Invalid amount";

    await api.transfer(amount, beneficiary);

    msg.style.color = "green";
    msg.textContent = "Transfer successful ✅";

    // small delay → better UX
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 800);

  } catch (err) {

    msg.style.color = "red";
    msg.textContent = err;

  }

  loader.classList.add("hidden");
  btn.disabled = false;
};