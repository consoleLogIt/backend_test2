const User = require('../models/user');
const crypto = require('crypto');


// render login page module
module.exports.login_page = function(req,res){
   
    if(req.isAuthenticated()){
        return res.redirect('/users/homepage');
    }
    return res.render('login_page.ejs');
   

}


// create user module
module.exports.create_user = async function(req,res){
    try{
        // check password during signUp
        if(req.body.password!=req.body.confirm){
            req.flash('error','password did not matched');

            return res.redirect('back');
        }
        // find the user in db during signUp
       let user = await User.findOne({email: req.body.email})
         
    //    user not present during signUp
            if(!user){
                // encrpyt the password
                let encrypted_password = crypto.createCipher("aes-256-ctr","thisisthekey").update(req.body.password,"utf-8","hex")
                User.create({email:req.body.email,password:encrypted_password})
                req.flash('success','you can logIn now');
              
            }
            else{
                req.flash('error','user already exists');

            }    
            return res.redirect('back');
                

    }
    catch(err){
        req.flash('error','error in creating user in signning up');
        return;
    }
    
     

}


// create session during login
module.exports.create_session = function(req,res){
    req.flash('success','Logged in successfully');

    return res.redirect('/users/homepage');
   

}

module.exports.sign_out = function(req,res){

    req.logout();

    req.flash('success','Logged out successfully');
    return res.redirect('/');

}