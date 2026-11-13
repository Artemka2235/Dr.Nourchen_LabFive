// Registan Travel — booking page logic
// Live price + discount, and validation without page reload.

var form = document.getElementById("booking-form");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var tourSelect = document.getElementById("tour");
var travellersInput = document.getElementById("travellers");
var totalBox = document.getElementById("total");
var successBox = document.getElementById("success");

// Keep the number of travellers between 1 and 12
function getTravellers() {
  var n = parseInt(travellersInput.value, 10);
  if (isNaN(n) || n < 1) {
    n = 1;
  }
  if (n > 12) {
    n = 12;
  }
  return n;
}

// Calculate the total price; groups of 5 or more get 10% off
function calculateTotal() {
  var price = Number(tourSelect.value);
  var people = getTravellers();
  var total = price * people;
  var text = "Total: " + people + " × " + price + " = " + total + " USD";

  if (people >= 5) {
    var discounted = total * 0.9;
    text = "Total: " + people + " × " + price + " = " + total +
           " USD − 10% group discount = " + discounted + " USD";
    total = discounted;
  }

  totalBox.textContent = text;
  return total;
}

// Live update when the tour or the number of travellers changes
tourSelect.addEventListener("change", calculateTotal);
travellersInput.addEventListener("input", calculateTotal);

// Show or hide the error for one field
function setError(input, errorId, hasError) {
  var message = document.getElementById(errorId);
  if (hasError) {
    input.classList.add("is-error");
    message.hidden = false;
  } else {
    input.classList.remove("is-error");
    message.hidden = true;
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();               // no page reload
  successBox.hidden = true;

  var name = nameInput.value.trim();
  var email = emailInput.value.trim();

  var nameBad = name === "";
  var emailBad = email.indexOf("@") === -1;

  setError(nameInput, "name-error", nameBad);
  setError(emailInput, "email-error", emailBad);

  if (nameBad || emailBad) {
    return;
  }

  var total = calculateTotal();
  successBox.textContent = "Thank you, " + name + "! Your booking request is received. Total: " + total + " USD.";
  successBox.hidden = false;
});

// Show the starting total when the page loads
calculateTotal();
