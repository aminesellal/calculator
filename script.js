// --- Fonctions mathématiques ---
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return "Erreur : division par zéro";
  return a / b;
}
function operate(a, b, operator) {
  a = Number(a); b = Number(b);
  if (operator === "+") return add(a, b);
  if (operator === "-") return subtract(a, b);
  if (operator === "*") return multiply(a, b);
  if (operator === "/") return divide(a, b);
  return "Erreur : opérateur inconnu";
}

// --- DOM & état ---
const display = document.getElementById('display');
const buttons = document.querySelectorAll('#buttons button');

let firstNumber = "";
let currentOperator = "";
let shouldResetDisplay = false;

// --- Écoute des boutons ---
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent.trim();

    // Clear
    if (value === "C") {
      display.value = "0";
      firstNumber = "";
      currentOperator = "";
      shouldResetDisplay = false;
      return;
    }

    // Chiffre
    if (!isNaN(value)) {
      if (display.value === "0" || shouldResetDisplay) {
        display.value = value;
        shouldResetDisplay = false;
      } else {
        display.value += value;
      }
      return;
    }

    // Opérateur (+ - * /)
    if (["+", "-", "*", "/"].includes(value)) {
      // si un opérateur est déjà présent et que l'utilisateur n'a pas juste cliqué un opérateur,
      // on calcule d'abord pour permettre l'enchaînement (12 + 7 - 1)
      if (currentOperator !== "" && !shouldResetDisplay) {
        const intermediate = operate(firstNumber, display.value, currentOperator);
        display.value = intermediate;
        firstNumber = String(intermediate);
      } else {
        firstNumber = display.value;
      }
      currentOperator = value;
      shouldResetDisplay = true;
      return;
    }

    // Égal
    if (value === "=") {
      if (currentOperator === "" || shouldResetDisplay) return;
      const secondNumber = display.value;
      const result = operate(firstNumber, secondNumber, currentOperator);
      display.value = result;
      firstNumber = String(result);
      currentOperator = "";
      shouldResetDisplay = true;
      return;
    }
  });
});
