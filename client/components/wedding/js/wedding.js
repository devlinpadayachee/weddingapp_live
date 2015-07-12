


Template.wedding.rendered = function () {


    $('#wedding_datepicker #wedding_date').datepicker({
      orientation: "top left",
      format: "yyyy-mm-dd"
    });

     this.autorun(function () {
        if (GoogleMaps.loaded()) {
          console.log("Google map laoded")
      
      $('#location').geocomplete({
        details: ".details",
        detailsAttribute: "data-geo"
      });

        }
    });

  
}


Meteor.startup(function () {


});

function selectedIfEquals (value,objvalue){

};

Template.wedding.helpers({

  settings: function () {
        return {
            collection: Weddings.find({}),
            rowsPerPage: 10,
            showFilter: true,
            class: "table table-bordered table-hover",

            fields: [ { key: 'weddingname', label: 'Wedding name' },

                      { key: 'venue', label: 'Venue' },

                      { key: 'bridename', label: 'Bride name' },

                      { key: 'groomname', label: 'Groom name' },

                      { key: 'brideemail', label: 'Bride email' },
                                     
                      { key: 'groomemail', label: 'Groom email' },

                      { key: 'wedding_date', label: 'Wedding date' },

                      { key: 'budget', label: 'Wedding budget' },

                      { key: 'quickmail', 
                        label: 'Quick Mail', 
                        fn: function (value) {
                            return new Spacebars.SafeString('<button id = "quickmail" class="btn btn-primary btn-xs text-center quickmail" data-title="quickmail" data-target="#quickmail"><span id = "quickmail" class="glyphicon glyphicon-envelope"></span></button>');
                        },
                        cellClass: function (value, object) {
                          var css = 'text-bold';
                          return css;
                        } 
                      },
                      { key: 'delete', 
                        label: 'Delete', 
                        fn: function (value) {
                            return new Spacebars.SafeString('<button id = "delete_wedding" class="btn btn-danger btn-xs text-center delete_wedding" data-title="Delete" data-target="#delete"><span id = "delete_wedding" class="glyphicon glyphicon-trash"></span></button>');
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


Template.wedding.events({



  "submit #create_wedding_form": function (event) {
   
    
    var wedding = {};
    wedding.weddingname = event.target.weddingname.value;
    wedding.venue = event.target.venue.value;
    wedding.location = event.target.location.value;
    wedding.lat = event.target.lat.value;
    wedding.lng = event.target.lng.value;
    wedding.formatted_address = event.target.formatted_address.value;

    wedding.bridename = event.target.bridename.value;
    wedding.groomname = event.target.groomname.value;
    wedding.brideemail = event.target.brideemail.value;
    wedding.groomemail = event.target.groomemail.value;
    wedding.wedding_date = event.target.wedding_date.value;
    wedding.budget = event.target.budget.value;
  
    Meteor.call('newWedding',wedding, function(error, result){

        if (error){

          console.log(error.message);

          bootbox.alert("New Wedding Created!", function() {
                                  
          });

        }
        wedding.wedding_id  = result;
        console.log("Created Wedding:" + result);

        bootbox.alert("New Wedding Created!", function() {
                                  
        });


        Meteor.call('newUsers', wedding,function(error,result){

            if (error) {

              console.log(error);
              bootbox.alert(error.message, function() {
                                  
              });

            }
            else console.log("Created User:" + result)

           

        });

        var newEvent = {};
        newEvent.alt_id = ShortId.generate();
        newEvent.title = event.target.weddingname.value;
        newEvent.start = event.target.wedding_date.value;
        newEvent.end = event.target.wedding_date.value;
        newEvent.className = "calendarwedding";


        Meteor.call('newEvent',newEvent);
       


    });
  
 

    return false;
  },
  'click .reactive-table tr': function (event) {
    event.preventDefault();
    var wedding = this;

      if (event.target.id == "delete_wedding") {

        bootbox.confirm("Are you sure that you want to delete this wedding? All associated data will be lost!", function(result) {
                console.log(result)
                if (result)
                {
                         console.log("Deleting Wedding:" + wedding._id);
                         Meteor.call('deleteWedding', wedding._id);



                }
           
      
        });
    
      }

        else if (event.target.id == "quickmail"){

            console.log("Quick Mail:" + wedding._id);

            bootbox.dialog({
                title: "<h3>Send a mail to the wedding party.</h3>",
                message: '<form role = "form" class="form-horizontal" id = "create_wedding_form">'+
                              '<div class="input-group input-group-sm" style="width:100%">'+
                                    '<span class="input-group-addon" style="width:150px">Sending mail to:</span>'+
                                    '<input type="text" id = "to" name = "to" class="form-control" value = "'+wedding.brideemail+","+wedding.groomemail+'" required readonly>'+
                              '</div>'+

                              '<div class="input-group input-group-sm" style="width:100%">'+
                                    '<span class="input-group-addon" style="width:150px">Message Subject:</span>'+
                                    '<input type="text" id = "subject" name = "subject" class="form-control" required>'+
                              '</div>'+

                               '<div class="input-group input-group-sm" style="width:100%">'+
                                    '<span class="input-group-addon" style="width:150px">Message:</span>'+
                                    '<textarea id = "message" style="width:100%;height:150px;resize:vertical" rows = "8" name = "message" class="form-control" required></textarea>'+
                              '</div>'+
                         '</form>',
                buttons: {
                    success: {
                        label: "Send Mail",
                        className: "btn-success",
                        callback: function () {
                            // var name = $('#name').val();
                            // var answer = $("input[name='awesomeness']:checked").val()
                            // Example.show("Hello " + name + ". You've chosen <b>" + answer + "</b>");

                            // var dataContext={
                            //   message:"You must see this, it's amazing !",
                            //   url:"http://myapp.com/content/amazingstuff",
                            //   title:"Amazing stuff, click me !"
                            // };

                            // var html=Blaze.toHTMLWithData(Template.quickmail,dataContext);

                            var sendlist = [wedding.brideemail,wedding.groomemail]

                            Meteor.call('sendEmail',sendlist,'devlinpadayachee@gmail.com',$('#subject').val(),$('#message').val());

                            bootbox.alert("Mail Sent!", function() {
                              
                            });


                        }
                    }
                }
            });
        

      
      }
      
  }

});


