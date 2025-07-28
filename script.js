let display = document.getElementById("display");
let historyList = document.getElementById("historyList");
let justCalculated = false; // Flag to detect "=" was just pressed

function appendValue(value) {
  if (justCalculated && !isOperator(value)) {
    display.value = ""; // Start fresh if number after "="
  }
  display.value += value;
  justCalculated = false;
}

function isOperator(char) {
  return "+-*/.%**".includes(char);
}

function clearDisplay() {
  display.value = "";
  justCalculated = false;
}

function deleteChar() {
  display.value = display.value.slice(0, -1);
}

function sqrt() {
  try {
    let result = Math.sqrt(eval(display.value));
    updateHistory(`√(${display.value}) = ${result}`);
    display.value = result;
    justCalculated = true;
  } catch {
    display.value = "Error";
  }
}

function calculate() {
  try {
    let result = eval(display.value);
    updateHistory(`${display.value} = ${result}`);
    display.value = result;
    justCalculated = true;
  } catch {
    display.value = "Error";
  }
}

function updateHistory(entry) {
  const li = document.createElement("li");
  li.textContent = entry;
  historyList.prepend(li);
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  if ((e.key >= '0' && e.key <= '9') || "+-*/.%()".includes(e.key)) {
    appendValue(e.key);
  } else if (e.key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (e.key === "Backspace") {
    deleteChar();
  } else if (e.key === "Escape") {
    clearDisplay();
  } else if (e.key === "^") {
    appendValue("**");
  } else if (e.key === "r") {
    sqrt();
  }
});

// Theme toggle logic
function toggleTheme() {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById("themeBtn");
  btn.textContent = theme === "dark" ? "☀️" : "🌙";
}

// Apply saved theme on load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
  updateThemeIcon(savedTheme);
});
