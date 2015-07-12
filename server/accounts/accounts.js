Accounts.config({
    sendVerificationEmail: true
});


Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
	
       	console.log(options.profile)
       	console.log(options.profile.role)
        if (typeof options.profile.role === "undefined")
        {

        	console.log("Options profile is set")
        	options.profile.role  =   "venue";



        }    

        user.profile = options.profile;            
      

    }

    return user;
});


