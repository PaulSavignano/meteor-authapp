Template.register.events({
  "submit .form-signup": function(event) {
    event.preventDefault();
    var email = trimInput(event.target.email.value);
    var password = trimInput(event.target.password.value);
    var password2 = trimInput(event.target.password2.value);
    var first_name = trimInput(event.target.first_name.value);
    var last_name = trimInput(event.target.last_name.value);

    if (isNotEmpty(email) && isNotEmpty(password) && isNotEmpty(first_name) && isNotEmpty(last_name) && isEmail(email) && areValidPasswords(password, password2)) {
      Accounts.createUser({
        email: email,
        password: password,
        profile: {
          first_name: first_name,
          last_name: last_name
        }
      }, function(error) {
        if(error) {
          FlashMessages.sendError('There was an error with registration');
        } else {
          FlashMessages.sendSuccess('Account Created!  You are now logged in');
          Router.go('/dashboard');
        }
      });
    }
  }
});

// Validation Rules
// Trim
var trimInput = function(value) {
  return value.replace(/^\s*|\s*$/g, "");
}

// Check for empty fields
isNotEmpty = function(value) {
  if (value && value !== '') {
    return true;
  }
  FlashMessages.sendError("Please fill in all fields");
  return false;
};

// Validate email address
isEmail = function(value) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(value)) {
    return true;
  }
  FlashMessages.sendError("Please use a valid email address");
  return false;
};

// Check password length
isValidPassword = function(password) {
  if (password.length < 6) {
    FlashMessages.sendError("Password must be at least 6 characters.");
    return false;
  }
  return true;
};

// Check if valid password
areValidPasswords = function(password, confirm) {
  if (!isValidPassword(password)) {
    return false;
  }
  if (password !== confirm) {
    FlashMessages.sendError("Passwords do not match");
    return false;
  }
  return true;
};
