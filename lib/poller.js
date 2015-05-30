var five = require("johnny-five");
var board = new five.Board();
var dataPoint = require('../lib/models/dataPoint');

var refreshFrequency = 60 * 2000; // refresh every two minutes

board.on("ready", function() {
  var sensor = new five.Sensor({
    pin: "A0",
    freq: 500
  });

  this.repl.inject({
    sensor: sensor
  });

  sensor.on("data", function() {
    d = new dataPoint.dataPoint("moisture", this.value, this.raw, "%");
    d.index();
  });

});

