const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    console.log('Inside Register function');
    var user = new User();
    user.fullname = req.body.fullname;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            if (err.code == 11000)
                res.status(422).send(['Dupliccate']);
            else
                return next(err)
        }
    });
}

module.exports.authenticate = (req, res, next) => {
    console.log('Inside authenticate function');

    //call for athentication
    passport.authenticate('local', (err, user, info) => {
        //error from passport midleware
        if (err) return res.status(400).json(err);
        //user found
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        //user not found or password error
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    console.log('inside userProfile funcion');

    User.findOne({ _id: req._id }, (err, user) => {
        if (!user) {
            return res.status(404).json({ status: false, message: 'User record not found' });
        } else {
            return res.status(200).json({ status: true, user: _.pick(user, ['fullname', 'email']) });
        }
    });
}