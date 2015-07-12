

var connectHandler = WebApp.connectHandlers;
Meteor.startup(function () {

	smtp = {
	    username: 'devlinpadayachee@gmail.com',   // eg: server@gentlenode.com
	    password: 'sepiroth6043!',   // eg: 3eeP1gtizk5eziohfervU
	    server:   'smtp.gmail.com',  // eg: mail.gandi.net
	    port: 465
	}

  	process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

     // get meteor-core's connect-implementation

// attach connect-style middleware for response header injection

  connectHandler.use(function (req, res, next) {
   // res.setHeader('Strict-Transport-Security', 'max-age=2592000; includeSubDomains'); // 2592000s / 30 days
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Referer,Accept,Accept-Encoding,accept, cache-control, content-type, x-requested-with,X-File-Name,Accept-Language,Cache-Control,Connection,Content-Length,Content-Type,Host,Origin,Pragma,Referer,User-Agent,X-Requested-With,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    return next();
  })

  	
});

Meteor.methods({
  userRole: function () {
  	
    var user = Meteor.user();
    console.log(user.profile.role)
    return user.profile.role;
  }
  


})


