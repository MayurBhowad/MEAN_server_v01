require('./user.model');

const mongoose = require('mongoose');
var port = process.env.port;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log('MongoDB connection Successfull!');
    } else {
        console.log('MongoDB connection Failed! ERROR: ' + JSON.stringify(err, undefined, 2));
    }
});