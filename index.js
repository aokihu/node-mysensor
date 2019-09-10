const Serialport = require('serialport');
const SerialportReadline = require('@serialport/parser-readline');
const EventEmitter = require('events');

/**
 * @class
 */
class NodeMysensor extends EventEmitter {

  //
  // Define Mysensor command
  //


  /**
   * @constructor
   */
  constructor(port, baudRate) {
    super();
    // Serial communication
    this.sp = new Serialport(port, {baudRate}, (err) => {
      if(err) throw new Error(err);
    })

    this.parser = this.sp.pipe(new SerialportReadline());
    this.parser.on('data',(data) => this.processData(data))
  }

  /**
   * Process data from serial port
   * @param {String} data String from serial port
   * @return NULL
   */
  processData(data) {
    this.emit('raw', data.toString());

    const dataStr = data.toString();
    const dataArr = dataStr.split(";");
    const [nodeId, childId, command, ack, type, payload] = dataArr.map((it, index, arr) => {
      if(index < arr.length - 1) {
        return Number(it);
      }else {
        if(Number.isNaN(Number(it)))
          return it;
        else
          return Number(it);
      }
    });

    // Parse the message
    const message = {
      timestamp: Date.now(),
      nodeId, childId, command, ack, type, payload
    }

    // Emit Message
    this.emit('message', message);

    // If device register
    if(command === NodeMysensor.CMD_PRESENTATION) {
      // construct device
      const device = {
        nodeId, childId,
        type: NodeMysensor.S_TYPE[type]
      }
      this.emit("presentation", device);
    }

    // If device submit data
    if(command === NodeMysensor.CMD_SET) {
      const data = {
        nodeId, childId
      }
    }
  }


  writeLine(data) {
    this.sp.write(data + "\n");
  }

}


//
// Define Mysensor commands
//
NodeMysensor.CMD_PRESENTATION = 0;
NodeMysensor.CMD_SET = 1;
NodeMysensor.CMD_REQ = 2;
NodeMysensor.CMD_INTERNAL = 3;
NodeMysensor.CMD_STREAM = 4;

//
// Define MySensor device types
//
NodeMysensor.S_TYPE = [
  'S_DOOR','S_MOTION','S_SMOKE','S_BINARY',
  'S_DIMMER','S_COVER','S_TEMP','S_HUM','S_BARO',
  'S_WIND','S_RAIN','S_UV','S_WEIGHT','S_POWER',
  'S_HEATER','S_DISTANCE','S_LIGHT_LEVEL','S_ARDUINO_NODE',
  'S_ARDUINO_REPEATER_NODE','S_LOCK','S_IR','S_WATER',
  'S_AIR_QUALITY','S_CUSTOM','S_DUST','S_SCENE_CONTROLLER',
  'S_RGB_LIGHT','S_RGBW_LIGHT','S_COLOR_SENSOR','S_HVAC',
  'S_MULTIMETER','S_SPRINKLER','S_WATER_LEAK','S_SOUND',
  'S_SOUND','S_VIBRATION','S_MOISTURE','S_INFO','S_GAS','S_GPS','S_WATER_QUALITY'
]



//
// Export module
//
module.exports = NodeMysensor;
