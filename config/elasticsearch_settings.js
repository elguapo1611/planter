var HOST = "http://localhost";
var INDEX = "planter";
var PORT = "9200";
var http = require('http');

var elasticsearch = require('elasticsearch');
client = new elasticsearch.Client({
  host: HOST + ":" + PORT,
  log: 'trace'
});

module.exports = {
  findOrCreateIndex : function() {
    var url = HOST + ":" + PORT  + "/" + INDEX + "/_settings";
    http.get(url, function(res){
      if(res.statusCode >= 400 && res.statusCode < 500){
        console.log("index not found... creating a new index");
        module.exports.createIndex(); 
      } else {
        console.log("no op");
      }
    }).on('error', function(e){
      console.log("Got error: " + e.message);
    });
  },
  es_client : function() {
    return client; 
  },
  createIndex : function() {
    client.indices.create({index:INDEX}, function(req){
      console.log("index created");
    }); 
  }
};

module.exports.findOrCreateIndex();

