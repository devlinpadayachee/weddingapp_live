Meteor.publish('guests', function(){
    var currentUser =  Meteor.users.findOne(this.userId);
    console.log("The current user is " + JSON.stringify(currentUser));
   	console.log(currentUser.profile.role);
   	if (currentUser.profile.role == "venue"){

   		var weddings_of_venue = Weddings.find({user:this.userId},{ fields: {_id: 1 } }).fetch();
   		var weddings_of_venue = _.pluck(weddings_of_venue, '_id')
   		console.log(weddings_of_venue);
   		//Finds all guest that belong to the venue
   		return Guests.find({ wedding: { $in: weddings_of_venue } })

   	}
   	else if (currentUser.profile.role == "user"){

   		var wedding_id = currentUser.profile.wedding_id;
		console.log(wedding_id);

   		return Guests.find({ wedding: wedding_id })





   	}

   	else return false
    
});

Meteor.publish('events', function(){
    var currentUserId = this.userId;
    return Events.find({user:currentUserId})
});


Meteor.publish('weddings', function(){
    var currentUserId = this.userId;
    return Weddings.find({user:currentUserId})
});


Meteor.publish('images', function(){ 
  return Images.find(); 

});

Meteor.publish('vendors', function(){ 
  return Vendors.find(); 

});

Meteor.publish('services', function(){ 
  return Services.find(); 

});



Sortable.collections = ['events'];


