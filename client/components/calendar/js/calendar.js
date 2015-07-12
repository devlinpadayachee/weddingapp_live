myPagination = new Paginator(Events)




Template.calendar.rendered = function () {



	


  $('#event_end_picker .input-group.date').datepicker({
      orientation: "top left",
      format: "yyyy-mm-dd"
  });


  $('#event_start_picker .input-group.date').datepicker({
      orientation: "top left",
      format: "yyyy-mm-dd"
  });


		if (Meteor.userId())
		{
		
		

		var user = Meteor.user();
		
		console.log('Calendar - running redered');
	    Session.set('calendarTemplateRendered', true);
	    var entries = Events.find({}).fetch(),
	    $calendar = $('#calendar');
	    console.log(entries);
	    $calendar.html('').fullCalendar({
	        header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
			},
	        //contentHeight: 1100,
	        defaultDate: '2015-06-12',
	     //   defaultView: 'agendaWeek',
	        editable: true,
	        selectable: true,
	        selectHelper: true,
	        select: function (start, end) {
	        	console.log(start.format('YYYY-MM-DD'))
	            var title = prompt('Event Title:');
	            var eventData;
	            if (title) {
	                eventData = {
	                    title: title,
	                    start: start.format('YYYY-MM-DD'),
	                    end: end.format('YYYY-MM-DD'),
	                    className : "calendarregular",
	                    alt_id : ShortId.generate()

	                };
	                Meteor.call('newEvent',eventData);
	                $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
	            }
	            $('#calendar').fullCalendar('unselect');
	        },
	        events: entries

	    });
	
	}
}


Tracker.autorun(function () {


	console.log("Starting Calander Tracker");
    if (Session.equals('calendarTemplateRendered', false) ||
        typeof Calendar === 'undefined') {
        console.log('exiting because there is no objects to process');
        return;
    }
    if (Meteor.userId())
	{


		
		var user = Meteor.user();
	    console.log('trying to autorun');
	    var entries = Events.find({}).fetch(),
	    $calendar = $('#calendar');
	    $calendar.fullCalendar('removeEvents');
	    $calendar.fullCalendar('addEventSource', entries);
	    $calendar.fullCalendar('rerenderEvents');
	}
})

Template.calendar.helpers({

	users_events: function () {return Events.find({}).fetch();},
	users_events_count: function () {return Events.find({}).count();},
	
	
   
});

Template.panel_details_list.helpers({

	 users_events_count: function () {return Events.find({}).count();},
 	
});

 Template.deletelist.helpers({

 	 paginated_events : function () {return myPagination.find({},{itemsPerPage:5});}
 	
 });


 Template.deletelist.events({

  "click .deleteevent": function (event) {

    event.preventDefault();
   
    console.log(event.target.value)
    console.log("Deleting:" + event.target.value);
    Meteor.call('deleteEvent', event.target.value);

    var entries = Events.find({}).fetch(),
    $calendar = $('#calendar');
    $calendar.fullCalendar('removeEvents');
    $calendar.fullCalendar('addEventSource', entries);
    $calendar.fullCalendar('rerenderEvents');


  }
 

});


Template.calendar.events({

  "submit #create_event_form": function (event) {

    event.preventDefault();
   

 	var newEvent = {};
	newEvent.alt_id = ShortId.generate();
	newEvent.title = event.target.eventtitle.value;
	newEvent.start = event.target.eventstartdate.value;
	newEvent.end = event.target.eventenddate.value;
	newEvent.className = "calendarregular";


	Meteor.call('newEvent',newEvent);
		
	var user = Meteor.user();
	console.log('trying to autorun');
	var entries = Events.find({}).fetch(),
	$calendar = $('#calendar');
    $calendar.fullCalendar('removeEvents');
    $calendar.fullCalendar('addEventSource', entries);
    $calendar.fullCalendar('rerenderEvents');
  }
 

});
