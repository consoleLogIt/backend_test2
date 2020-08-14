const User = require('../models/user');


module.exports.homepage = function(req,res){
    User.findById(req.params.id,function(err,user){

        return res.render('homepage')
         
    })

}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            req.flash('success','password updated');

            return res.redirect('back');

        })
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}