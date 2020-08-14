const passport   = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new googleStrategy({
    clientID:"1025272294441-v1ofpredc136flbj3ni39dj6mu97i1g5.apps.googleusercontent.com",
    clientSecret:"GZ4cL1H6Xy62mxAKLo5VXTWY",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},
function(accessToken, refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in google strategy-passport',err)
            return;
        }
        console.log(profile); 

        if(user){
            return done(null,user);
        }else{
            let pass = crypto.randomBytes(20).toString('hex')
            User.create({
                email:profile.emails[0].value,
                password:pass,
                confirm:pass
            }, function(err,user){
                if(err){
                    console.log('error in creating user google strategy-passport',err)
                    return;
                }
                 return done(null,user);

            })
        }
    })

}


));

module.exports = passport;