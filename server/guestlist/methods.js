Meteor.methods({
  newGuest: function (guest) {
  	console.log("Server Guest Create: " + guest);
  	guest.created = Date.now();
    guest.user = Meteor.userId();
    guest.rsvp = "rsvp_sent";
    Guests.insert(guest);
  },
  deleteGuest: function (guest_id) {
  	console.log("Server Guest Delete: " + guest_id);
    Guests.remove(guest_id);
  },
  updateGuestRSVP: function (guest_id, rsvp_status) {
    var guest = Guests.findOne(guest_id);
    if (guest.user !== Meteor.userId()) {
      
        throw new Meteor.Error("not-authorized");
    }
    else Guests.update(guest_id, { $set: { rsvp: rsvp_status} });
  }
})