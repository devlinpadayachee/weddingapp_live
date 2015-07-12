Meteor.methods({
  newEvent: function (newevent) {
    console.log("Server Event Create: " + newevent);
    newevent.created = Date.now();
    newevent.user = Meteor.userId();
    Events.insert(newevent);
  },
  updateMainEvent: function (mainevent){
    console.log("Server Settings Update Main Event: " + mainevent);
    mainevent.created = Date.now();
    mainevent.user = Meteor.userId();
    Events.upsert({user : Meteor.userId(),alt_id : Meteor.userId()},mainevent); 
  },
  deleteEvent: function (event_id) {
  	console.log("Server Event Delete: " + event_id);
    Events.remove(event_id);
  }
})