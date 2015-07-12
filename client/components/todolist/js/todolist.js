
Template.todolist.rendered = function () {
  
		

}
//Events.find({}).fetch();
Template.todolist.helpers({

   todolist: function () {return [

                                  { 'title': 'Choose your bridal party', 'drag': true, 'order' : 0 },
                                  { 'title': 'Save dress photos!', 'drag': true, 'order' : 1 },
                                  { 'title': 'Get organized', 'drag': true, 'order' : 2 },
                                  { 'title': 'Start an inspiration board', 'drag': true, 'order' : 3 },
                                  { 'title': 'Decide on city and season.', 'drag': true, 'order' : 4 },
                                  { 'title': 'Decide on a budget.', 'drag': true, 'order' : 5 },
                                  { 'title': 'Insure your ring.', 'drag': true, 'order' : 6 },
                                  { 'title': 'Start your guest list.', 'drag': true, 'order' : 7 },
                                  { 'title': 'Decide on wedding colors.', 'drag': true, 'order' : 7 },
                                  { 'title': 'Set engagement party date.', 'drag': true, 'order' : 9 },
                                  { 'title': 'Make a beauty plan.', 'drag': true, 'order' : 10 },
                                  { 'title': 'Start a wedding website (its free).', 'drag': true, 'order' : 11 },
                                  { 'title': 'Visit reception venues.', 'drag': true, 'order' : 12 },
                                  { 'title': 'Visit ceremony sites.', 'drag': true, 'order' : 13 },
                                  { 'title': 'Find ceremony officiants.', 'drag': true, 'order' : 14 },
                                  { 'title': 'Finalize your guest list.', 'drag': true, 'order' : 15 },
                                  { 'title': 'Book your reception venue.', 'drag': true, 'order' : 16 },
                                  { 'title': 'Book your officiant.', 'drag': true, 'order' : 17 },
                                  { 'title': 'Book your ceremony site.', 'drag': true, 'order' : 18 },
                                  { 'title': 'Find and meet caterers.', 'drag': true, 'order' : 19 },
                                  { 'title': 'Find photographers.', 'drag': true, 'order' : 20 },
                                  { 'title': 'Save flower photos.', 'drag': true, 'order' : 21 },
                                  { 'title': 'Start your guest list.', 'drag': true, 'order' : 22 },
                                  { 'title': 'Decide on wedding colors.', 'drag': true, 'order' : 23 },
                                  { 'title': 'Set engagement party date.', 'drag': true, 'order' : 24 },
                                  { 'title': 'Make a beauty plan.', 'drag': true, 'order' : 25 },
                                  { 'title': 'Start a wedding website (its free).', 'drag': true, 'order' : 26 },
                                  { 'title': 'Visit reception venues.', 'drag': true, 'order' : 27 },
                                  { 'title': 'Visit ceremony sites.', 'drag': true, 'order' : 28 },
                                  { 'title': 'Find ceremony officiants.', 'drag': true, 'order' : 29 }
                                ];
  },
  inprogresslist: function () {return  [{ 'title': 'Find ceremony officiants.', 'drag': true, 'order' : 30 }]},
  completedlist: function () {return  [{ 'title': 'Find ceremony officiants.', 'drag': true, 'order' : 31 }]},

  todooptions: function () {
        return {
            group: {
                name: "todolist",
                pull: true,
                put: ['inprogresslist','completedlist']
            },
            sort: false
        };
  },
  inprogressoptions: function () {
        return {
            group: {
                name: "inprogresslist",
                pull: true,
                put: ['todolist','completedlist']
            },
            sort: false
        };
  },
  completedoptions: function () {
        return {
            group: {
                name: "completedlist",
                pull: true,
                put: ['todolist','inprogresslist']
            },
            sort: false
        };
  }



 
});


Template.todolist.events({

 

});


