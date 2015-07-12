
Template.default.rendered = function () {


	if (Meteor.userId())
	{
				var user = Meteor.user();
				console.log("This is the user object" + user);


				var currentDate = new Date();
			
				var futureDate  = new Date(user.profile.wedding_date);
			
				var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;
				// Instantiate a coutdown FlipClock
				clock = $('.your-clock').FlipClock(diff, {
					clockFace: 'DailyCounter',
					countdown: true,
					autoStart: true,
					showSeconds: true
				});


	}
			
			
  

}


Template.default.helpers({
    
});

