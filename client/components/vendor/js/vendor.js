


Template.vendor.rendered = function () {

  sAlert.success('<strong>Tip! </strong>Create a vendor. Add services that the vendor offers, pick and choose what you want for your wedding.')

}



Template.vendor.helpers({
  images: function () {return Vendors.find({});},
  settings: function () {
        return {
            collection: Vendors.find({}),
            rowsPerPage: 10,
            showFilter: true,
            class: "table table-bordered table-hover",

            fields: [ { key: 'vendorname', label: 'Vendor name' },
                      { key: 'location', label: 'Vendor location' },
                      { key: 'category', label: 'Vendor category' },
                      { key: 'contactnumber', label: 'Vendor contact number' },

                      { key: 'logoimage', 
                        label: 'Vendor logo', 
                        fn: function (value,object) {

                            if (typeof object.logoimage === 'undefined' || object.logoimage === ''  ){

                              return new Spacebars.SafeString('<div ><img width="50" height="50" src="no-picture-available.jpg" alt="" class="img-rounded" /></div>');
                           

                            }
                            else {

                              return new Spacebars.SafeString('<div ><img width="30" height="30" src="'+object.logoimage+'" alt="/no-picture-available.jpg" class="img-rounded" /></div>');
                            }
                        },
                        cellClass: function (value, object) {
                          var css = 'text-bold text-center';
                          return css;
                        } 
                      },
                                  
                      { key: 'action', 
                        label: 'Action', 
                        fn: function (value,object) {

                            return new Spacebars.SafeString('<div class="btn-group btn-block">'+
                                                              '<button type="button" class="btn btn-warning btn-block dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                                                'Action <span class="caret"></span>'+
                                                              '</button>'+
                                                              '<ul class="dropdown-menu">'+
                                                                '<li><a id = "vendor_resources" href="/vendor/'+object._id+'"><span id = "vendor_resources" class="glyphicon glyphicon-tasks text-info"></span>&nbsp Create Resources &nbsp</a></li>'+
                                                                '<li role="separator" class="divider"></li>'+
                                                                '<li><a id = "delete_vendor" href="#"><span id = "delete_vendor" class="glyphicon glyphicon-trash text-danger"></span>&nbsp Delete Vendor &nbsp</a></li>'+
                                                              '</ul>'+
                                                            '</div>')
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


Template.vendor.events({

  "submit #create_vendor_form": function (event,template) {
   
    
        var vendor = {};
        console.log(event.target)
        vendor.vendorname = event.target.vendorname.value;
        vendor.location = event.target.location.value;
        vendor.category = event.target.category.value;
        vendor.contactnumber = event.target.contactnumber.value;
        vendor.email = event.target.email.value;
  
        Meteor.call('newVendor',vendor, function(error, result){

        var vendor_id = result;

        console.log("Just created vendor:" + vendor_id)

            var files = event.target[4].files;
            console.log(files)
            for (var i = 0, ln = files.length; i < ln; i++) {

            console.log(files[i])  

            Images.insert(files[i], function (err, fileObj) {

                  if (err){
                            console.log(err)
                  } 
                  else {

                 // handle success depending what you need to do
               
                            var imagesURL = {
                              "logoimage": "/cfs/files/images/" + fileObj._id
                            };

                            Meteor.call('updateVendorlogo',vendor_id,imagesURL, function(error, result){

                                  if (error){

                                    console.log (error)

                                  }

                                  else console.log(result);

                            })
                 
                  }
            });
        }


        if (error){

          console.log(error.message);

          bootbox.alert("Error creating vendor!", function() {
                                  
          });

        }


        bootbox.alert("Created vendor!", function() {
                                  
        });
       

    });
  
 

    return false;
  },
  'click .reactive-table tr': function (event) {
    console.log(event);
    event.preventDefault();
      var vendor = this;

       if (event.target.id == "vendor_resources") {

          Router.go(event.target.href);

    
      }



      if (event.target.id == "delete_vendor") {

        bootbox.confirm("Are you sure that you want to delete this vendor? All associated data will be lost!", function(result) {
                console.log(result)
                if (result)
                {
                         console.log("Deleting Vendor:" + vendor._id);
                         Meteor.call('deleteVendor', vendor._id);



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
                                    '<textarea id = "message" rows = "5" name = "message" class="form-control" required></textarea>'+
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


