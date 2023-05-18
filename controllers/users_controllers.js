const User = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id).then((user)=>{
        return res.render('user_profile', {
            title: 'user profile',
            profile_user: user
        });
    });
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body).then((user)=>{
            return res.redirect('back');
        })
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}

//render the signUp page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title:"Codeial | Sign Up"
    })
}

//render the signIn page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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
                req.flash('success', 'Signed up Succesfully');
                return res.redirect('/users/sign-in');
            })
            .catch((err)=>{
                req.flash('error', 'Please try again signing up');
                console.log('error in creating user while signing up', err);
                return;
            });
           }
           else{
            req.flash('error', 'Please try again signing up');
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
    req.flash('success', 'Logged in Succesfully');
    return res.redirect('/');

}

module.exports.destroySession = function(req, res, next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        req.flash('success', 'You have logged out');
        return res.redirect('/');
    })
    
}
