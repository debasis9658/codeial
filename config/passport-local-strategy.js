const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


//Authentication using passport 
passport.use(new LocalStrategy({
       usernameField: 'email',
       passReqToCallback: true
    },
    function(req, email, password, done){
        //find a user and establish the identity
        User.findOne({email: email}).then((user)=>{
            if(!user || user.password != password){
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        })
        .catch((err)=>{
            req.flash('error', err);
            return done(err);
        });
    }


));


//Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});


//Deserializatiog the user from the key in cookies
passport.deserializeUser(function(id, done){
    User.findById(id).then((user)=>{
        return done(null, user);
    })
    .catch((err)=>{
        console.log("error in finding user ---> Passport");
        return done(err);
    })
});


//check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if the user is signed in, then pass on the req to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req,user contains the current sign-in user from the section cookie, we are sending this to the locals for the views. 
        res.locals.user = req.user;
    }
    return next();
    
}


module.exports = passport;