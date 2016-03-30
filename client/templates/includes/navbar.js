Template.navbar.events({
  "click .logout-btn": function(event) {
    Meteor.logout(function(error) {
      if (error) {
        FlashMessages.sendError(error.reason);
      } else {
        FlashMessages.sendSuccess('You are now logged out');
        Router.go('/');
      }
    });
  }
})
