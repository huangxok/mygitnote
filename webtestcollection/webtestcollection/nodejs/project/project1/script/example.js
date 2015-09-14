var util = require('util');
var count = 0;
util.debug("Starting ...");
function timer_tick() {
  count = count + 1;
  util.debug("Tick count: " + count);
  if (count === 10) {
    count += 1000;
    util.debug("Set break here");
  }
  setTimeout(timer_tick, 1000);
}
timer_tick();