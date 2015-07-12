Meteor.methods({
  newGuest: function (guest) {
  	console.log("Stub Guest Create: " + guest);
  	guest.created = Date.now();
    guest.user = Meteor.userId();
    guest.rsvp = "rsvp_sent";
    Guests.insert(guest);
  },
  deleteGuest: function (guest_id) {
  	console.log("Stub Guest Delete: " + guest_id);
    Guests.remove(guest_id);
  },
  updateGuestRSVP: function (guest_id, rsvp_status) {
  console.log("Stub Guest Update: " + guest_id);  
  var guest = Guests.findOne(guest_id);
  if (guest.user !== Meteor.userId()) {
    
      throw new Meteor.Error("not-authorized");
  }
    Guests.update(guest_id, { $set: { rsvp: rsvp_status} });
  }
  


})