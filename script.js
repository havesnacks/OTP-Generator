const inputs = document.querySelectorAll(".otp-input-fields input");
const mixBut = document.getElementById("mixBut");

// Loop through each input field
inputs.forEach((input, index) => {
// Add index as a custom data attribute
input.dataset.index = index;

// Add event listeners for input events
input.addEventListener("focus", clear);
input.addEventListener("keydown", clear);
input.addEventListener("paste", onPaste);
input.addEventListener("keyup", onKeyUp);
});

// Button click event listener
mixBut.addEventListener("click", generateOTP);

// Generate a random OTP
function generateOTP() {
let otp = "";
const length = inputs.length;

// Generate random digits for each input field
for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10); // Random digit (0-9)
    inputs[i].value = otp[i]; // Fill input field with digit
}

// Submit the OTP
submit();
}

// Clear the input field
function clear(event) {
event.target.value = "";
}

// Prevent pasting into input fields
function onPaste(event) {
event.preventDefault();
}

// Handle keyup event
function onKeyUp(event) {
const input = event.target;
const value = input.value;
const fieldIndex = +input.dataset.index; // Get index of current input field

// Move focus to previous input field if Backspace is pressed and not the first field
if (event.key === "Backspace" && fieldIndex > 0) {
    input.previousElementSibling.focus();
}

// Move focus to next input field if value is not empty and not the last field
if (value && fieldIndex < inputs.length - 1) {
    input.nextElementSibling.focus();
}

// If value is not empty and the last field, submit the OTP
if (value && fieldIndex === inputs.length - 1) {
    submit();
}
}

// Submit the OTP
function submit() {
let otp = "";

// Concatenate input values to form OTP
inputs.forEach((input) => {
    otp += input.value;
    input.disabled = true; // Disable input field
});

// Log OTP to console
console.log("OTP Generated:", otp);
}

