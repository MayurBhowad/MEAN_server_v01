const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use(new localStrategy({ usernameField: 'email' }, (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
        if (err)
            return done(err);

        //User varification
        else if (!user)
            return done(null, false, { message: 'Email is not registered' });

        //password varification
        else if (!user.varifyPassword(password))
            return done(null, false, { message: 'Password is incorrect' })

        //user and Password VArified
        else
            return done(null, user)
    });
}));