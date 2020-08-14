const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/backend_test2');

const db = mongoose.connection;


db.once('open',function(){
    console.log('connected to db');
})


module.exports = db;