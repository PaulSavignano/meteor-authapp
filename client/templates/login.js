Template.login.events({
  "submit .form-signin": function(event) {
    event.preventDefault();
    var email = event.target.email.value;
    var password = event.target.password.value;

    Meteor.loginWithPassword(email, password, function(error) {
      if (error) {
        event.target.email.value = email;
        event.target.password.value = password;
        FlashMessages.sendError(error.reason);
      } else {
        FlashMessages.sendSuccess('You are now logged in');
        Router.go('/dashboard');
      }
    });
  }
});
