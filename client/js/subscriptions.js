Tracker.autorun(function(){

  	Meteor.subscribe("guests");
	Meteor.subscribe("events");
	Meteor.subscribe("weddings");
	Meteor.subscribe("images");
	Meteor.subscribe("vendors");
	Meteor.subscribe("services");
});