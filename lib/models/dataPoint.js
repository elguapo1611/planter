var elasticsearchSettings = require('../../config/elasticsearch_settings');
var esClient = elasticsearchSettings.es_client();

function dataPoint(type, value, originalValue, unit) {
  var date = new Date();
  this.createdAt = date.toISOString();
  this.type = type;
  this.value = value;
  this.originalValue = originalValue;
  this.unit = unit;
}
dataPoint.prototype.asHash = function() {
  return {
    path: "/planter/dataPoint",
    body: {
      created_at: this.createdAt,
      type: this.type, 
      value: this.value, 
      originalValue: this.originalValue, 
      unit: this.unit
    }, 
    method:"POST"
  };
};

dataPoint.prototype.index = function() {
  esClient.transport.request(this.asHash());
};

module.exports = {
  dataPoint : dataPoint
};

