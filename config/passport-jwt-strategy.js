const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/doc');

let opts = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'Codeal'
}

passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err){
            console.log('Error in JWT');
            return ;
        }
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })
}))

module.exports = passport;