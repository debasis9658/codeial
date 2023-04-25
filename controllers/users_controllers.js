const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: "user profile "
    });
}

//render the signUp page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title:"Codeial | Sign Up"
    })
}

//render the signIn page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title:"Codeial | Sign In"
    })
}

//get the sign up data

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}).then((user)=>{
        if(!user){
            User.create(req.body).then((user)=>{
                return res.redirect('/users/sign-in');
            })
            .catch((err)=>{
                console.log('error in creating user while signing up', err);
                return;
            });
           }
           else{
            return res.redirect('back');
           }
    })
    .catch((err)=>{
        console.log('error in finding user in signing up', err);
        return;
    });

}

//Create a session for the user
module.exports.createSession = function(req, res){
    //TODO LATER
}
