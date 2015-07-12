Meteor.methods({
  newWedding: function (wedding) {
  	console.log("Stub Wedding Create: " + wedding);
  	wedding.created = Date.now();
    wedding.user = Meteor.userId();
    return Weddings.insert(wedding);
  },
  deleteWedding: function (wedding_id) {
  	console.log("Stub Wedding Delete: " + wedding_id);
    Weddings.remove(wedding_id);
    Guests.remove({wedding:wedding_id});
  }


  


})