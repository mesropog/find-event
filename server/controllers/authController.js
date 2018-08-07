const User = require('../models/user');
const jwt = require('../server/node_modules/jwt-simple');
const config = require('../server/config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub : user.id, iat : timestamp}, config.secret);
}

exports.signUp = function(req, res, next) {
   //console.log(req.body); // log to node shell
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({error : 'You must provide email and password'})
    }

    // check if there is an account with this email
    User.findOne({email : email}, function (error, foundUser) {
        if (error) {return next(error);} // error on connection

        // there is a user with such an email
        if (foundUser) {
            return res.status(422).send({error : 'Email is already in use'})
        }

        // create a new user
        const user = new User({
            email: email,
            password : password,
        });

        // save user
        user.save(function(err) {
            if(err) {return next(err)}
            res.json({token: tokenForUser(user)});
        })

    })
};

exports.signIn = function (req, res, next) {
    // User already in db, we just need to give him a token
    res.send({token : tokenForUser(req.user)});
};