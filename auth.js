/* =====================================================
   StudySphere Auth System — FINAL VERSION
   ===================================================== */

/* ================= SIGNUP ================= */

const signupForm = document.getElementById("signupForm");

signupForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("signupName")?.value.trim();
  const email = document.getElementById("signupEmail")?.value.trim();
  const password = document.getElementById("signupPassword")?.value.trim();
  const msg = document.getElementById("signupMsg");

  if (!name || !email || !password) return;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  // 🚫 Already registered
  if (storedUser && storedUser.email === email) {
    if (msg) {
      msg.textContent = "⚠️ User already registered. Please login.";
      msg.style.color = "#ef4444";
    }
    return;
  }

  // ✅ Create real student profile
  const userData = {
    name,
    email,
    password,
    studyHours: 0,
    assignmentsDue: 0,
    goalsDone: 0,
    streak: 0,
    createdAt: new Date().toISOString()
  };

  localStorage.setItem("user", JSON.stringify(userData));

  if (msg) {
    msg.textContent = "✅ Account created! Redirecting to login...";
    msg.style.color = "#22c55e";
  }

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1200);
});


/* ================= LOGIN ================= */

const loginForm = document.getElementById("loginForm");

loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  // ❌ Not registered
  if (!storedUser) {
    alert("User not registered. Please sign up first.");
    return;
  }

  // ❌ Wrong credentials
  if (storedUser.email !== email || storedUser.password !== password) {
    alert("Invalid email or password");
    return;
  }

  // ✅ Login success
  localStorage.setItem("isLoggedIn", "true");
  window.location.href = "dashboard.html";
});


/* ================= DASHBOARD PROTECTION ================= */

if (window.location.pathname.includes("dashboard.html")) {
  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "login.html";
  }
}


/* ================= LOAD USER NAME ON DASHBOARD ================= */

const userNameEl = document.getElementById("userName");
const storedUser = JSON.parse(localStorage.getItem("user"));

if (userNameEl && storedUser?.name) {
  userNameEl.textContent = storedUser.name;
}


/* ================= FORGOT PASSWORD ================= */

const forgotForm = document.getElementById("forgotForm");

forgotForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("forgotEmail")?.value.trim();
  const msg = document.getElementById("forgotMsg");

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser || storedUser.email !== email) {
    if (msg) {
      msg.textContent = "❌ Email not registered.";
      msg.style.color = "#ef4444";
    }
    return;
  }

  if (msg) {
    msg.textContent = "✅ Password reset link sent successfully.";
    msg.style.color = "#22c55e";
  }
});


/* ================= LOGOUT ================= */

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}