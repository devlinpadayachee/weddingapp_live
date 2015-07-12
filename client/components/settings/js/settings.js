
Template.settings.rendered = function () {
  
  $('#set_wedding_datepicker .input-group.date').datepicker({
      orientation: "top left",
      format: "yyyy-mm-dd"
  });


			

}

Template.settings.helpers({

	 users_events: Events.find({})
 
});


Template.settings.events({

  "submit #set_wedding_date_form": function (event) {
    event.preventDefault();
    console.log(event.target.weddingdate.value)
    Meteor.call('updateUserWedding_date',event.target.weddingdate.value);

    var mainEvent = {};
	mainEvent.alt_id = Meteor.userId();
	mainEvent.title = "Your Special Day";
	mainEvent.start = event.target.weddingdate.value;
	mainEvent.end = event.target.weddingdate.value;
	mainEvent.className = "calendar";

	Meteor.call('updateMainEvent',mainEvent);

  }
 

});


