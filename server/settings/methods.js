Meteor.methods({

  updateUserWedding_date: function (date) {
      console.log("Server User Update Wedding Date: " + date);
      Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.wedding_date":date}})

  },
 


})