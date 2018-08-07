const mongoose = require('../server/node_modules/mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('../server/node_modules/bcrypt-nodejs');

// define a model
const userSchema = new Schema({
    email: {type : String, unique : true, lowercase: true}, // lower case turns emails to lowercase before checking uniqueness
    password : String
});

// on save hook encrypt password
userSchema.pre('save', function (next) {
    const user = this;

    bcrypt.genSalt(10, function (err, salt) {
        if (err){return next(err);}
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {return next(err);}
            user.password = hash;
            next();
        })
    })
});

// adding a method to the users schema to confirm encrypted password (methods same as .prototype here)
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }
        callback(null, isMatch);
    });
};

// create the model class
const User = mongoose.model('user', userSchema);

// export the model
module.exports = User;