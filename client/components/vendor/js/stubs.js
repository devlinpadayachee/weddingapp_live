Meteor.methods({

    newVendor: function (vendor) {
      console.log("Stubs Vendor Create: " + vendor);
      vendor.created = Date.now();
      vendor.user = Meteor.userId();
      return Vendors.insert(vendor);
    },
    deleteVendor: function (vendor_id) {
      console.log("Stubs Vendor Delete: " + vendor_id);
      Vendors.remove(vendor_id);

    },
    updateVendorlogo: function (vendor_id, imagesURL) {

        console.log("Stubs Vendor Update: " + vendor_id);  
        var vendor = Vendors.findOne(vendor_id);
        if (vendor.user !== Meteor.userId()) {
          
            throw new Meteor.Error("not-authorized");
        }

     return Vendors.update(vendor_id, { $set: imagesURL});

    },
    newService: function (service) {
      console.log("Stubs Service Create: " + service);
      service.created = Date.now();
      service.user = Meteor.userId();
      return Services.insert(service);
    },
    deleteService: function (service_id) {
      console.log("Stubs Service Delete: " + service_id);
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