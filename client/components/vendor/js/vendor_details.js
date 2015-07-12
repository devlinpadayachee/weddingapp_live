


Template.vendor_details.rendered = function () {

  console.log(this);
  sAlert.success('<strong>Tip! </strong>Add services that the vendor offers, pick and choose what you want for your wedding.')
  // Dropzone.autoDiscover = false;
  //   $("#dZUpload").dropzone({
  //       url: "/uploadimage",
  //       addRemoveLinks: true,
  //       uploadprogress : function (file,progress){

  //         console.log("File progress", progress);
  //       },
  //       success: function (file, response) {
  //           var imgName = response;
  //           file.previewElement.classList.add("dz-success");
  //           console.log("Successfully uploaded :" + imgName);
  //       },
  //       error: function (file, response) {
  //           file.previewElement.classList.add("dz-error");
  //       }
  //   });

}



Template.vendor_details.helpers({

  current_vendor: function () {console.log(this);return this;},
  settings: function () {
        return {
            collection: Services.find(),
            rowsPerPage: 10,
            showFilter: true,
            class: "table table-bordered table-hover",

            fields: [ { key: 'servicename', label: 'Service name' },

                      { key: 'description', label: 'Service description' },

                      { key: 'estimatedlowerprice', label: 'Estimated lower price' },

                      { key: 'estimatedupperprice', label: 'Estimated upper price' },

                      { key: 'action', 
                        label: 'Action', 
                        fn: function (value,object) {

                            return new Spacebars.SafeString('<div class="btn-group btn-block">'+
                                                              '<button type="button" class="btn btn-warning btn-block dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                                                'Action <span class="caret"></span>'+
                                                              '</button>'+
                                                              '<ul class="dropdown-menu">'+
                                                                '<li><a id = "add_images" href="#"><span id = "add_images" class="glyphicon glyphicon-picture text-info"></span>&nbsp Add Images &nbsp</a></li>'+
                                                                '<li role="separator" class="divider"></li>'+
                                                                '<li><a id = "delete_service" href="#"><span id = "delete_service" class="glyphicon glyphicon-trash text-danger"></span>&nbsp Delete Service &nbsp</a></li>'+
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



Template.vendor_details.events({


  "submit #create_vendor_service_form": function (event,template) {
   
    
        var service = {};


        console.log(event)


        var myDropzone = Dropzone.forElement("div#dropzoneDiv");
        console.log(myDropzone);


        console.log(event.target)
        service.servicename = event.target.servicename.value;
        service.description = event.target.description.value;
        service.estimatedlowerprice = event.target.estimatedlowerprice.value;
        service.estimatedupperprice = event.target.estimatedupperprice.value;
  
        Meteor.call('newService',service, function(error, result){

            var service_id = result;

            console.log("Just created service:" + service_id)

            var files = myDropzone.files;
            console.log(files)
            for (var i = 0, ln = files.length; i < ln; i++) {

             console.log(files[i].previewElement) 
             files[i].previewElement.classList.add("dz-complete");
            Images.insert(files[i], function (err, fileObj) {

                  if (err){
                            console.log(err)
                  } 
                  else {
                            
                                         
                            var imagesURL = {
                              "serviceimage": "/cfs/files/images/" + fileObj._id
                            };

                            console.log(imagesURL)

                            Meteor.call('updateServiceImages',service_id,imagesURL, function(error, result){

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

          bootbox.alert("Error creating service!", function() {
                                  
          });

        }


        bootbox.alert("Created service!", function() {
                                  
        });
       

      });


    

      return false
  
        myDropzone.on("success", function( file, result ) {
              var imgName = result;
             file.previewElement.classList.add("dz-success");
             console.log("Successfully uploaded :" + imgName);
        });
       


        myDropzone.on("complete", function( file ) {

               console.log(file);
        });
       
        

       
  },
  'click .reactive-table tr': function (event) {
      console.log(event);
      event.preventDefault();
      var service = this;



      if (event.target.id == "delete_service") {

        bootbox.confirm("Are you sure that you want to delete this service? All associated data will be lost!", function(result) {
                console.log(result)
                if (result)
                {
                         console.log("Deleting Service:" + service._id);
                         Meteor.call('deleteService', service._id);



                }
           
      
        });
    
      }

    
      
  }

  
});


