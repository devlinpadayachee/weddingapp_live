


Template.guestlist.rendered = function () {
  //this.$('.your-clock').FlipClock(3600);
  Meteor.typeahead.inject();

  sAlert.success('<strong>Tip! </strong>Set up your guest list. It\'s easy just don\'t invite people you dont like.')


}


Tracker.autorun(function () {

  var userRole = Session.get("UserRole")

  if (userRole == "venue" && typeof Session.get("current_wedding") === "undefined")
  {

    console.log("User role is: venue and undefined, Setting current wedding to null")
    Session.set("current_wedding",null)

  }

  if(userRole == "user"){
    if (Meteor.userId())
    {
        var user = Meteor.user();

        Session.set("current_wedding",user.profile.wedding_id);
        console.log("User role is: user, Setting current wedding to stored value")
    }
  }

});


Meteor.startup(function () {


 
 

  var clock = $('.your-clock').FlipClock({
  // ... your options here
  });

   
});

function selectedIfEquals (value,objvalue){
  return value==objvalue?"selected":"";
};


Template.guestlist.helpers({
  users_guests: Guests.find({wedding : Session.get("current_wedding")}),
  users_guests_count: function () {return Guests.find({wedding : Session.get("current_wedding")}).count();},
  attending_count: function () {return Guests.find({wedding : Session.get("current_wedding"),rsvp : "attending"}).count();},
  not_attending_count: function () {return Guests.find({wedding : Session.get("current_wedding"),rsvp : "not_attending"}).count();},
  rsvp_count: function () {return Guests.find({wedding : Session.get("current_wedding"),rsvp : "rsvp_sent"}).count();},
  bride_party_count: function () {return Guests.find({wedding : Session.get("current_wedding"),weddingparty : "bride"}).count();},
  groom_party_count: function () {return Guests.find({wedding : Session.get("current_wedding"),weddingparty : "groom"}).count();},

  weddings_autocomplete: function() {
    return Weddings.find({}).fetch().map(function(wedding){return { id: wedding._id, value: wedding.weddingname }});
  },
  settings: function () {
        return {
            collection: Guests.find({wedding : Session.get("current_wedding")}),
            rowsPerPage: 10,
            showFilter: true,
            class: "table table-bordered table-hover",

            fields: [ { key: 'firstname', label: 'First name' },

                      { key: 'lastname', label: 'Last name' },

                      { key: 'email', label: 'Email' },

                      { key: 'weddingparty', label: 'Party' },

                      { key: 'rsvp', 
                        label: 'RSVP', 
                        fn: function (value,object) {

                            return new Spacebars.SafeString('<div >'+
                                                              '<select class="table-selects" id="rsvp_guest" value="'+object.rsvp+'">'+
                                                                '<option value="rsvp_sent" ' + selectedIfEquals("rsvp_sent",object.rsvp) + '>Have yet to RSVP</option>'+
                                                                '<option value="attending" ' + selectedIfEquals("attending",object.rsvp) + '>Attending</option>'+
                                                                '<option value="not_attending" ' + selectedIfEquals("not_attending",object.rsvp) + '>Not attending</option>'+
                                                              '</select>'+
                                                            '</div>');
                        },
                        cellClass: function (value, object) {
                          var css = 'text-bold';
                          return css;
                        } 
                      },

                      { key: 'edit', 
                        label: 'Edit', 
                        fn: function (value) {
                            return new Spacebars.SafeString('<button id = "edit_guest" class="btn btn-primary btn-xs text-center edit_guest" data-title="Edit" data-target="#edit"><span id = "edit_guest" class="glyphicon glyphicon-pencil"></span></button>');
                        },
                        cellClass: function (value, object) {
                          var css = 'text-bold';
                          return css;
                        } 
                      },

                      { key: 'delete', 
                        label: 'Delete', 
                        fn: function (value) {
                            return new Spacebars.SafeString('<button id = "delete_guest" class="btn btn-danger btn-xs text-center delete_guest" data-title="Delete" data-target="#delete"><span id = "delete_guest" class="glyphicon glyphicon-trash"></span></button>');
                        },
                        cellClass: function (value, object) {
                          var css = 'text-bold';
                          return css;
                        } 
                      }

                      
                    ]
        };
  }

});

Template.guestlist.selected = function(event, suggestion, datasetName) {
   
    console.log(suggestion.id);
    Session.set("current_wedding",suggestion.id)
}


Template.guestlist.events({
  
  "submit #create_guest_form": function (event) {
    
    if ( Session.get("current_wedding") == null){

         bootbox.alert("Please select a wedding first before you add a guest!", function() {
                                  
         });
         sAlert.danger('<strong>Tip!</strong>Choose a wedding to add guests to!', {effect: 'genie', position: 'top-left ', timeout: 15000, onRouteClose: false, stack: true, offset: '100px'})

         return false;

    }
    else{

      var guest = {};
      console.log (Session.get("current_wedding"));
      guest.firstname = event.target.firstname.value;
      guest.lastname = event.target.lastname.value;
      guest.email = event.target.email.value;
      guest.weddingparty = event.target.weddingparty.value;
      guest.wedding = Session.get("current_wedding")
      
      Meteor.call('newGuest', guest);


      return false;


    }
    
  },
 'click .reactive-table tr': function (event) {
    event.preventDefault();
    var guest = this;
  
     if (event.target.id == "edit_guest"){

        console.log("Updating:" + guest._id);
        //To do
      }

      else if (event.target.id == "delete_guest") {
        console.log("Deleting:" + guest._id);
        Meteor.call('deleteGuest', guest._id);
      }

      
  },
 'change .reactive-table tr': function (event) {
    event.preventDefault();
    var guest = this;
  
     if (event.target.id == "rsvp_guest"){
        console.log(event.target.value)
        console.log("Updating RSVP:" + guest._id);
        Meteor.call('updateGuestRSVP', guest._id,event.target.value);
      }

      

      
  }

});


