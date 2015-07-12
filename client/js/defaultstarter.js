Meteor.startup(function () {

	GoogleMaps.load({
	   	libraries: 'places'  // also accepts an array if you need more than one
	});


	Meteor.Dropzone.options.maxFiles = 4;
	Meteor.Dropzone.options.autoProcessQueue = false;
	// Meteor.Dropzone.options.previewTemplate = 	'<div class="dz-preview dz-file-preview">'+
	// 											  '<div class="dz-details">'+
	// 											    '<div class="dz-filename"><span data-dz-name></span></div>'+
	// 											    '<div class="dz-size" data-dz-size></div>'+
	// 											    '<img data-dz-thumbnail />'+
	// 											  '</div>'+
	// 											  '<div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>'+
	// 											  '<div class="dz-success-mark"><span>✔</span></div>'+
	// 											  '<div class="dz-error-mark"><span>✘</span></div>'+
	// 											  '<div class="dz-error-message"><span data-dz-errormessage></span></div>'+
	// 											'</div>';
	sAlert.config({
     
       //  effect: 'scale',
     //	 effect: 'slide',
      // 	effect: 'genie',
        	effect: 'jelly',
      //   effect: 'flip',
     //    effect: 'bouncyflip',
      //effect: 'stackslide',
        position: 'top-right',
        timeout: 5000,
        html: true,
        offset: '100px',
        onRouteClose: true,
        stack: false,
       
    });



	Meteor.Spinner.options = {
	    lines: 40, // The number of lines to draw
	    length: 10, // The length of each line
	    width: 1, // The line thickness
	    radius: 30, // The radius of the inner circle
	    corners: 0.7, // Corner roundness (0..1)
	    rotate: 0, // The rotation offset
	    direction: 1, // 1: clockwise, -1: counterclockwise
	    color: '#fff', // #rgb or #rrggbb
	    speed: 1, // Rounds per second
	    trail: 60, // Afterglow percentage
	    shadow: true, // Whether to render a shadow
	    hwaccel: false, // Whether to use hardware acceleration
	    className: 'spinner', // The CSS class to assign to the spinner
	    zIndex: 2e9, // The z-index (defaults to 2000000000)
	    top: '100%', // Top position relative to parent in px
	    left: '50%' // Left position relative to parent in px
	};

	console.log("Starting System Startup");
	Meteor.call("userRole",function(error,result){

			console.log("User Role returned from server: " + result);
			Session.set("UserRole", result)

	});
	


});