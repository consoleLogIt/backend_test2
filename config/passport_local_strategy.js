const passport  = require('passport');
const crypto = require('crypto');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


 passport.use(new LocalStrategy({

    usernameField:"email",
    passReqToCallback:true
},
 function(req,email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){
            req.flash('error',err);
            return done(err);
        }
        //decrypt the password present in db
        let decrypted_password = crypto.createDecipher("aes-256-ctr","thisisthekey").update(user.password,"hex","utf-8");
        if(!user || decrypted_password!=password){
            req.flash('error' ,'Invalid Password');
            return done(null,false);
        }

        return done(null,user);
    });
}
));

//to put the user.id into session cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
})

// to find th user if the session was not destroyed
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user ---> passport');
            return done(err);

        }
        return  done(null,user);
    })
})

passport.checkAuthentication = function(req,res,next){
    //if authenticated
    if(req.isAuthenticated()){
        return next();
    }
    // if not authenticated
    return   res.redirect('/');
}
// set user to locals
    passport.setAuthenticatedUser = function(req,res,next){
        if(req.isAuthenticated()){
            res.locals.user = req.user;
        }
        next();
    }

module.exports = passport;