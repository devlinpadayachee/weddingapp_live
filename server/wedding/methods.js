Meteor.methods({
  newWedding: function (wedding) {
  	console.log("Server Wedding Create: " + wedding);
  	wedding.created = Date.now();
    wedding.user = Meteor.userId();
    return Weddings.insert(wedding);
  },
  deleteWedding: function (wedding_id) {
  	console.log("Server Wedding Delete: " + wedding_id);
    Weddings.remove(wedding_id);
    Guests.remove({wedding: wedding_id});
  },
  newUsers: function (wedding) {



    console.log("Server Spawn Users: " + JSON.stringify(wedding));
 
    var options = {};

    options.username = wedding.bridename;
    options.email = wedding.brideemail;

    options.profile = {};
    options.profile.wedding_id = wedding.wedding_id;
    options.profile.role = "user";

    console.log(options)
    var newUser  = Accounts.createUser(options)
   
    console.log("Created New User:" + newUser );
    Accounts.sendEnrollmentEmail(newUser,wedding.brideemail);
    return newUser
  }
  


})