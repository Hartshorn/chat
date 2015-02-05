if (Meteor.isClient) {
  
  Template.body.helpers({
    
    messages: function() {
        return Messages.find({}, {sort: {createdAt: -1}});
    },
    
    users: function() {
      return Meteor.users.find();
    }
  });
  
  Template.body.events({
    
      "submit .new-message" : function (event) {
          var text = event.target.text.value;
          
          Messages.insert({
              text: text,
              createdAt: new Date(),
              owner: Meteor.userId(),
              username: Meteor.user().username
          });
          
          event.target.text.value = "";
          console.log(event);
          return false;
      }
  });
  
  Template.message.events({
      "click .delete" : function () {
          Messages.remove(this._id);
      }
  });
  
  
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}