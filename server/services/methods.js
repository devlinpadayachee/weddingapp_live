Meteor.methods({

    newService: function (service) {
      console.log("Server Service Create: " + service);
      service.created = Date.now();
      service.user = Meteor.userId();
      return Services.insert(service);
    },
    deleteService: function (service_id) {
      console.log("Server Service Delete: " + service_id);
      Services.remove(service_id);

    },
    updateServiceImages: function (service_id, imagesURL) {

      console.log("Server Service Update: " + service_id);  
      var service = Services.findOne(service_id);
      if (service.user !== Meteor.userId()) {
        
          throw new Meteor.Error("not-authorized");
      }

     return Services.update(service_id, { $push: imagesURL});

    }
  
})