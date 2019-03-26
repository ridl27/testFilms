const mongoose = require('mongoose');
const assert = require('assert');

mongoose.Promise = global.Promise;  
const Schema = mongoose.Schema;
const FilmSchema = new Schema({ 
    title: {
        type: String
    },
    format: {
        type: String
    },
    year: {
        type: Number
    },
    stars: [{name: String}]
});
const Films = mongoose.model('film', FilmSchema);

before(function(done){  
    mongoose.connect('mongodb://admin:12345678a@ds121636.mlab.com:21636/test-films', { useNewUrlParser: true });
	mongoose.connection.once('open', function(){ 
	    console.log('Connection has been made...');
	    done();
	}).on('error', function(error){
	    console.log('Connection error:', error);
	});
});

describe('Getting films', function(){
  it('Find some films from the database', function(done){
    Films.find({}).then(function(result){ 
      assert(result.length > 0);
      done();
    });
  });
});
