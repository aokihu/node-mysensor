import SerialPort = require("serialport");
import {IMysensorMessage, MysensorCommand} from './libs/message'
const SerialportReadline = require('@serialport/parser-readline');
const EventEmitter = require('events');


/**
 * @class
 */
export default class MySensor extends EventEmitter {

  static DEBUG = false; // The switch to display debug output

  private serial: SerialPort;
  private parser: any;
  public port: string; // Serial interface port name
  public baudrate = 115200; // Serial interface transfer speed, default is 115200

  /**
   * @constructor
   * @param port Serial interface port name
   * @param baudrate Serial interface transfer speed, default is 115200
   */
  constructor(port: string, baudrate?: number) {
    super();
    this.port = port;
    if(baudrate) this.baudrate = baudrate;
    this.serial = new SerialPort(this.port, {baudRate: this.baudrate}, (err) => {if(err) throw new Error(err.message)})

    this.parser = this.serial.pipe(new SerialportReadline({ delimiter: '\n' }));
    this.parser.on('data', this.preprocess.bind(this))
  }

  /**
   * @static
   * @public
   * @function
   * @description Get a default serial port, noraml is the first port
   */
  public static async getSerialPorts() {
    try {
      return await SerialPort.list();
    } catch {
      throw new Error('No vaild serial port found!')
    }
  }

  /**
   * @private
   * @function
   * @event message {IMysensorMessage} Parsed Message
   * @param data Raw message
   */
  private preprocess(data:string){
    const [nodeID, childID, command,ack,type,payload] = data.split(';')

    const message: IMysensorMessage = {
      nodeID: Number(nodeID),
      childID: Number(childID),
      command: Number(command),
      ack: Number(ack),
      type: Number(type),
      payload

    }

    // Emit 'message' event
    this.emit('message', message);

    // Next
    this.parseCmd(message);

    if(MySensor.DEBUG) console.table(message)
  }

  /**
   * @private
   * @function
   * @param message Parsed mysensor message
   * @description parse message command
   */
  private parseCmd(message:IMysensorMessage) {
    switch(message.command) {
      case MysensorCommand.internal:
        this.doCommandInternal(message);
        break;
      case MysensorCommand.presentation:
        this.doCommandPresentation(message);
        break;
      case MysensorCommand.req:
        this.doCommandReq(message);
        break;
      case MysensorCommand.set:
        this.doCommandSet(message);
        break;
      default:
      case MysensorCommand.stream:
        this.doCommandStream(message);
        break;
    }
  }

  /**
   * @private
   * @function
   * @param message Parsed mysensor message
   */
  private doCommandInternal(message: IMysensorMessage) {
    this.emit('internal', message);
  }

  /**
   * @private
   * @function
   * @param message Parsed mysensor message
   */
  private doCommandPresentation(message: IMysensorMessage) {
    this.emit('presentation', message);
  }

  /**
   * @private
   * @function
   * @param message Parsed mysensor message
   */
  private doCommandReq(message: IMysensorMessage) {
    this.emit('req', message);
  }

  /**
   * @private
   * @function
   * @param message Parsed mysensor message
   */
  private doCommandSet(message: IMysensorMessage) {
    this.emit('set', message);
  }

  /**
   * @private
   * @function
   * @param message Parsed mysensor message
   */
  private doCommandStream(message: IMysensorMessage) {
    this.emit('stream', message);
  }

}

