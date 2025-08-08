const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");
const passwordDisplay = document.getElementById("passwordDisplay");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const strengthBar = document.getElementById("strengthBar");
const themeToggle = document.getElementById("themeToggle");

// Length slider update
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

// Copy button with toast
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordDisplay.value);
  showToast("Password Copied!");
});

function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// Password Generator
generateBtn.addEventListener("click", () => {
  const length = parseInt(lengthSlider.value);
  let characters = "";
  let password = "";

  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{};:,.<>?";

  if (uppercase.checked) characters += upperChars;
  if (lowercase.checked) characters += lowerChars;
  if (numbers.checked) characters += numberChars;
  if (symbols.checked) characters += symbolChars;

  if (characters === "") {
    passwordDisplay.value = "Select at least one option!";
    return;
  }

  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * characters.length);
    password += characters[randIndex];
  }

  passwordDisplay.value = password;
  evaluateStrength(password);
});

// Strength bar
function evaluateStrength(password) {
  let strength = 0;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  if (password.length >= 12) strength++;

  let percentage = (strength / 5) * 100;
  strengthBar.style.setProperty("width", `${percentage}%`);
  strengthBar.style.setProperty("background", getColor(strength));
}

function getColor(strength) {
  switch (strength) {
    case 1: return "red";
    case 2: return "orange";
    case 3: return "yellow";
    case 4: return "#99cc00";
    case 5: return "green";
    default: return "#ccc";
  }
}

// Light/Dark Mode Toggle
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
});
window.addEventListener("load", () => {
  document.body.classList.add("dark");
});

// Random Tips
const tips = [
  "Never reuse the same password twice.",
  "Use at least 12 characters.",
  "Include symbols, numbers, and both cases.",
  "Don't use your birthdate or name.",
  "Change your passwords regularly.",
  "Use a password manager for safety.",
  "Avoid dictionary words or patterns."
];
setInterval(() => {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  document.getElementById("tipBox").textContent = randomTip;
}, 6000);
