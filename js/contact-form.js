// Restriction to disallow letters in the "Phone" field
document.addEventListener("DOMContentLoaded", function() {
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('keypress', function(e) {
    const char = String.fromCharCode(e.which);
    // Allowed characters: digits, spaces, +, -, parentheses
    if (!/[0-9+\-\s\(\)]/.test(char)) {
      e.preventDefault();
    }
  });
});

function sendForm(event) {
  event.preventDefault(); // Prevent default form behavior

  let valid = true;
  
  // Read field values and trim whitespace
  const firstName = document.getElementById('firstName').value.trim();
  const lastName  = document.getElementById('lastName').value.trim();
  const email     = document.getElementById('email').value.trim();
  const phone     = document.getElementById('phone').value.trim();
  
  // Clear previous error messages
  document.getElementById('firstNameError').textContent = '';
  document.getElementById('lastNameError').textContent  = '';
  document.getElementById('emailError').textContent     = '';
  document.getElementById('phoneError').textContent     = '';
  
  // Validate "First Name" field
  if (firstName === '') {
    document.getElementById('firstNameError').textContent = 'Please enter your first name.';
    valid = false;
  }

  // Validate "Last Name" field
  if (lastName === '') {
    document.getElementById('lastNameError').textContent = 'Please enter your last name.';
    valid = false;
  }

  // Validate "Email" field
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    document.getElementById('emailError').textContent = 'Please enter your email.';
    valid = false;
  } else if (!emailRegex.test(email)) {
    document.getElementById('emailError').textContent = 'Invalid email address.';
    valid = false;
  }

  // Validate "Phone" field
  // Allows digits, spaces, +, - and parentheses
  const phoneRegex = /^[0-9\-\+\s\(\)]+$/;
  if (phone === '') {
    document.getElementById('phoneError').textContent = 'Please enter your phone number.';
    valid = false;
  } else if (!phoneRegex.test(phone)) {
    document.getElementById('phoneError').textContent = 'Invalid phone number.';
    valid = false;
  }

  // If all validations pass, redirect user
  if (valid) {
    window.location.href = 'thanks-form.html';
  }
}


function toggleAnswer(element) {
  var answer = element.nextElementSibling;

  if (answer.classList.contains("active")) {
    answer.classList.remove("active");
  } else {
    answer.classList.add("active");
  }
}


function sendForm2(event) {  
  event.preventDefault(); // prevent form submission

  // Clear previous errors
  clearErrors();

  // Get field values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const telephone = document.getElementById('telephone').value;
  const message = document.getElementById('message').value;

  let isValid = true;

  // Validate name
  if (!name) {
    document.getElementById('nameError').textContent = 'Please enter your name.';
    isValid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email.';
    isValid = false;
  }

  // Validate phone
  if (!telephone) {
    document.getElementById('telephoneError').textContent = 'Please enter your phone number.';
    isValid = false;
  }

  // Validate address
  if (!message) {
    document.getElementById('messageError').textContent = 'Please enter your address.';
    isValid = false;
  }

  // If all fields are valid, redirect to thank you page
  if (isValid) {
    window.location.href = 'thanks.html';
  }
}


// Función para limpiar errores
function clearErrors() {
  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('telephoneError').textContent = '';
  document.getElementById('messageError').textContent = '';
}

// Validación del número de teléfono
function validatePhoneNumber(input) {
  const phonePattern = /^[0-9]*$/;
  if (!phonePattern.test(input.value)) {
    document.getElementById('telephoneError').textContent = 'The phone should only contain numbers.';
  } else {
    document.getElementById('telephoneError').textContent = '';
  }
}


