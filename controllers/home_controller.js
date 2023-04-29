const Post = require('../models/post');
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    
    Post.find({}).populate('user').then((posts)=>{
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    });

    
    
}