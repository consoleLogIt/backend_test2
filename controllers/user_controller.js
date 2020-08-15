const User = require('../models/user');
const crypto = require('crypto');

//render homepage after login
module.exports.homepage = function(req,res){
    User.findById(req.params.id,function(err,user){

        return res.render('homepage')
         
    })

}
// update password after login
module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        req.body.password = crypto.createCipher("aes-256-ctr","thisisthekey").update(req.body.password,"utf-8","hex")
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            req.flash('success','password updated');

            return res.redirect('back');

        })
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}