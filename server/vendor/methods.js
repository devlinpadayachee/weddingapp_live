Meteor.methods({
  newVendor: function (vendor) {
  	console.log("Server Vendor Create: " + vendor);
  	vendor.created = Date.now();
    vendor.user = Meteor.userId();
    return Vendors.insert(vendor);
  },
  deleteVendor: function (vendor_id) {
  	console.log("Server Vendor Delete: " + vendor_id);
    Vendors.remove(vendor_id);

  },
  updateVendorlogo: function (vendor_id, imagesURL) {

      console.log("Server Vendor Update: " + vendor_id);  
      var vendor = Vendors.findOne(vendor_id);
      if (vendor.user !== Meteor.userId()) {
        
          throw new Meteor.Error("not-authorized");
      }

   return Vendors.update(vendor_id, { $set: imagesURL});

  }
  


})