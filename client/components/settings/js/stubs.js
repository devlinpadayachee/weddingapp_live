
Meteor.methods({
  newEvent: function (newevent) {
  	console.log("Stubs Settings Event Create: " + newevent);
  	newevent.created = Date.now();
    newevent.user = Meteor.userId();
    Events.insert(newevent);
  },
  updateMainEvent: function (mainevent){
  	console.log("Stubs Settings Update Main Event: " + mainevent);
  	mainevent.created = Date.now();
    mainevent.user = Meteor.userId();
    Events.upsert({user : Meteor.userId(),alt_id : Meteor.userId()},mainevent);	
  },
  deleteEvent: function (event_id) {
  	console.log("Stubs Settings Server Event Delete: " + event_id);
    Events.remove(event_id);
  },
  updateUserWedding_date: function (date) {
      console.log("Stubs User Update Wedding Date: " + date);
      Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.wedding_date":date}})

  },
})