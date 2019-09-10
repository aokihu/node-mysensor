const Mysensor = require('./index.js');

const sensor = new Mysensor("/dev/tty.usbserial-A800H5SE", 115200);

sensor.on('message', console.log);
sensor.on('presentation', (d) => {
  console.log("Device presentation", d)
})
