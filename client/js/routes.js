Router.configure({
  layoutTemplate: 'app'
});

// Router.route('/', function () {
//     this.render('default');
// });



Router.route('/guestlist', function () {
    this.render('guestlist');
});


// Router.route('/calendar', function () {
//     this.render('calendar');
// });

Router.route('/settings', function () {
    this.render('settings');
});

Router.route('/', {
  subscriptions: function() {
    // returning a subscription handle or an array of subscription handles
    // adds them to the wait list.
    return
  },

  action: function () {
    if (this.ready()) {
      this.render('default');
    } else {
      this.render('loading');
    }
  }
});

Router.route('/todolist', {
  subscriptions: function() {
    // returning a subscription handle or an array of subscription handles
    // adds them to the wait list.
    return Meteor.subscribe("events");
  },

  action: function () {
    if (this.ready()) {
      this.render('todolist');
    } else {
      this.render('loading');
    }
  }
});

Router.route('/wedding', {
  subscriptions: function() {
    // returning a subscription handle or an array of subscription handles
    // adds them to the wait list.
    return Meteor.subscribe("weddings");
  },

  action: function () {
    if (this.ready()) {
      this.render('wedding');
    } else {
      this.render('loading');
    }
  }
});


Router.route('/vendor/:_id', {
  subscriptions: function() {
    return Meteor.subscribe("images");
  },

  action: function () {
    if (this.ready()) {


      this.render('vendor_details',{
            data: function () {
              return Vendors.findOne({_id: this.params._id});
            }
      });
    
    } else {
      this.render('loading');
    }
  }
});

Router.route('/vendor', {
  subscriptions: function() {
    return Meteor.subscribe("images");
  },

  action: function () {
    if (this.ready()) {
      this.render('vendor');
    } else {
      this.render('loading');
    }
  }
});


Router.route('/calendar', {
  subscriptions: function() {
    // returning a subscription handle or an array of subscription handles
    // adds them to the wait list.
    return Meteor.subscribe("events");
  },

  action: function () {
    if (this.ready()) {
      this.render('calendar');
    } else {
      this.render('loading');
    }
  }
});