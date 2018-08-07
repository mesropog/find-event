const passport = require('passport');
const User = require('../../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create a local strategy (authentication using email and password)
const localOptions = {usernameField : 'email'};
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
    // verify this email and password, call done with the user
    // find user by email
    User.findOne({email:email}, function (err, user) {
        if(err){return done(err);}
        if(!user){return done(null, false);}

        // compare an encrypted password with entered one
        user.comparePassword(password, function (err, isMatch) {
            if(err){return done(err);}
            if(!isMatch){return done(null,false);}
            done(null,user);
        })
    })

});

// options for a JWT strategy (secret for decode and where to get the token
const options = {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey : config.secret
};

// Create JWT strategy
const JWTLogin = new JwtStrategy(options, function (payload, done) {
    // try to find the user based on payload.sub (id) in the db
    User.findById(payload.sub, function (err, user) {
        if(err){return done(err,false);}
        if(user) {
            return done(null, user);
        } else {
            return done(null, false)
        }
    })
});

// Tell to passport to use this strategy
passport.use(JWTLogin);
passport.use(localLogin);
