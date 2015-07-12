// Router.route('/uploadimage', function () {
//   var req = this.request;
//   var res = this.response;
// console.log("Server upload image called")
//   res.end('hello from the server\n');
// }, {where: 'server'});


Router.route('/uploadimage', { where: 'server' })
  .get(function () {
  	var req = this.request;
   var res = this.response;
     console.log("Server upload image get called")
     res.end('hello from the server get\n');
  })
  .post(function () {
  		var req = this.request;
   var res = this.response;
    console.log("Server upload image post called")
    res.end('hello from the server post\n ');
  })
  .put(function () {
  		var req = this.request;
   var res = this.response;
    console.log("Server upload image put called")
    res.end('hello from the server put\n');
 })