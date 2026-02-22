import { api } from "./api.js";

const tableBody = document.querySelector("tbody");
const emptyState = document.querySelector('[data-testid="empty-state"]');
const loader = document.querySelector('[data-testid="loader"]');

window.loadTransactions = async function () {

  tableBody.innerHTML = "";
  emptyState.textContent = "";
  loader.style.display = "block";

  try {
    const filter = document.getElementById("filterType").value;

    const transactions = await api.getTransactions();

    const filtered =
      filter === "ALL"
        ? transactions
        : transactions.filter(t => t.type === filter);

    loader.style.display = "none";

    if (!filtered.length) {
      emptyState.textContent = "No transactions found";
      return;
    }

    filtered.forEach(t => {

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${t.date}</td>
        <td>${t.type}</td>
        <td>₹ ${t.amount}</td>
        <td>${t.beneficiary}</td>
      `;

      tableBody.appendChild(row);

    });

  } catch (err) {
    loader.style.display = "none";
    emptyState.textContent = "Failed to load transactions";
  }
};

// initial load
loadTransactions();