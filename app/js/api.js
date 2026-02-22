// app/js/api.js

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const DB_KEYS = {
  USERS: "bank2147_users",
  SESSION: "bank2147_session",
  TRANSACTIONS: "bank2147_transactions"
};

// ---------------- DB HELPERS ----------------

function getUsers() {
  return JSON.parse(localStorage.getItem(DB_KEYS.USERS)) || [];
}

function saveUsers(users) {
  localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
}

function getSession() {
  return JSON.parse(localStorage.getItem(DB_KEYS.SESSION));
}

function setSession(user) {
  localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(DB_KEYS.SESSION);
}

function getTransactionsFromDB() {
  return JSON.parse(localStorage.getItem(DB_KEYS.TRANSACTIONS)) || [];
}

function saveTransactions(txns) {
  localStorage.setItem(DB_KEYS.TRANSACTIONS, JSON.stringify(txns));
}

// ---------------- SEED DEFAULT USER ----------------

(function seedDefaultUser() {
  const users = getUsers();

  if (!users.find(u => u.username === "testuser")) {
    users.push({
      username: "testuser",
      password: "Test@123",
      name: "Test User",
      account: "2147",
      balance: 5000
    });

    saveUsers(users);
  }
})();

// ---------------- API ----------------

export const api = {

  // 🔐 LOGIN
  async login(username, password) {

    await delay(500);

    const users = getUsers();

    const user = users.find(
      u => u.username === username.trim() &&
           u.password === password.trim()
    );

    if (!user) throw "Invalid credentials";

    setSession(user);

    return user;
  },

  // 👤 GET LOGGED-IN ACCOUNT
  async getAccount() {

    await delay(300);

    const session = getSession();

    if (!session) throw "No active session";

    return session;
  },

  // 📝 REGISTER
  async register(data) {

    await delay(500);

    const users = getUsers();

    if (users.find(u => u.username === data.username)) {
      throw "User already exists";
    }

    const newUser = {
      ...data,
      account: Date.now().toString().slice(-6),
      balance: 0
    };

    users.push(newUser);
    saveUsers(users);

    return newUser;
  },

  // 💸 TRANSFER
  async transfer(amount, beneficiary) {

    await delay(800);

    const users = getUsers();
    const session = getSession();

    if (!session) throw "No active session";

    const user = users.find(u => u.username === session.username);

    if (!user) throw "User not found";

    if (!beneficiary) throw "Select beneficiary";
    if (!amount || amount <= 0) throw "Invalid amount";
    if (amount > user.balance) throw "Insufficient balance";

    // 💰 debit balance
    user.balance -= amount;

    // ✅ update users DB
    saveUsers(users);

    // ✅ update session with new balance
    setSession(user);

    // 🧾 store transaction
    const txns = getTransactionsFromDB();

    txns.push({
      id: Date.now(),
      type: "DEBIT",
      amount,
      beneficiary,
      date: new Date().toLocaleString()
    });

    saveTransactions(txns);

    return user;
  },

  // 📜 GET TRANSACTIONS
  async getTransactions() {

    await delay(300);

    return getTransactionsFromDB().reverse();
  },

  // 🚪 LOGOUT
  logout() {
    clearSession();
  }

};