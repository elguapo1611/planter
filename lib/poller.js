var five = require("johnny-five");
var board = new five.Board();
var dataPoint = require('../lib/models/dataPoint');

var refreshFrequency = 1000; // refresh every two minutes

var relayState = 0.0;

var stateChanged = function(state) {
  var changed = (state != relayState);
  if(changed) {
    d = new dataPoint.dataPoint("relay changed", state, state, "%");
    d.index();
    relayState = state;
  }
  return changed; 
};

board.on("ready", function() {
  var relay = new five.Relay(4);
  var sensor = new five.Sensor({
    pin: "A0",
    freq: 500
  });

  this.repl.inject({
    relay: relay,
    sensor: sensor
  });

  sensor.on("data", function() {
    if(this.value > 100) {
      stateChanged(0.0);
      relay.off();
    } else {
      stateChanged(1.0);
      relay.on();
    }

    d = new dataPoint.dataPoint("moisture", this.value, this.raw, "%");
    d.index();
  });

});

