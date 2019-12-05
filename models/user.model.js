const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    secret: String
});

// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.secret = salt;
            next();
        });
    });
});

//methos
userSchema.methods.varifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });
}

mongoose.model('User', userSchema);