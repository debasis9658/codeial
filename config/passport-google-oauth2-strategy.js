const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto  = require('crypto');
const User = require('../models/user');

//tell passport to use a new startegy for google login
passport.use(new googleStrategy({
        clientID: "310568912907-cltbs1jjmee5cq3kqd81pkcdgrtbhcun.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    // function(accessToken, refreshToken, profile, done){
    //     User.findOne({email: profile.emails[0].value}).exec(function(err, user){
    //         if(err){console.log('error in google startegy passport', err); return;}

    //         console.log(profile);
    //         if(user){
    //             return done(null, user);
    //         }
    //         else{
    //             User.create({
    //                 name: profile.displayName,
    //                 email: profile.emails[0].value,
    //                 password: crypto.randomBytes(20).toString('hex')
    //             }, function(err, user){
    //                 if(err){console.log('error in creating user', err); return;}
    //                 return done(null, user);
    //             });
    //         }
    //     });
    // }


    function(accessToken, refreshToken, profile, done){
        //find a user 
        User.findOne({email: profile.emails[0].value}).then((user)=>{
                
                console.log(profile);
                if(user){
                    //if found set this user as req.user
                    return done(null, user);
                }
                else{
                    //if not found create the user and set it as req.user
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    
                    }).then((user)=>{
                        return done(null, user);
                    })
                    .catch((err)=>{
                        if(err){console.log('error in creating user', err); return;}
                    })
                }
            })
            .catch((err)=>{
                if(err){console.log('error in google startegy passport', err); return;}
            });
            
    }
));

module.exports = passport;