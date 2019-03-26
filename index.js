var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://admin:12345678a@ds121636.mlab.com:21636/test-films', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/films', require('./routes/api'));

app.listen(process.env.PORT || 4000, function(){
    console.log('listening for requests');
});