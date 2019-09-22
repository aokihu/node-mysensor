"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SerialPort = require("serialport");
const message_1 = require("./libs/message");
const SerialportReadline = require('@serialport/parser-readline');
const EventEmitter = require('events');
class MySensor extends EventEmitter {
    constructor(port, baudrate) {
        super();
        this.baudrate = 115200;
        this.port = port;
        if (baudrate)
            this.baudrate = baudrate;
        this.serial = new SerialPort(this.port, { baudRate: this.baudrate }, (err) => { if (err)
            throw new Error(err.message); });
        this.parser = this.serial.pipe(new SerialportReadline({ delimiter: '\n' }));
        this.parser.on('data', this.preprocess.bind(this));
    }
    static async getSerialPorts() {
        try {
            return await SerialPort.list();
        }
        catch {
            throw new Error('No vaild serial port found!');
        }
    }
    preprocess(data) {
        const [nodeID, childID, command, ack, type, payload] = data.split(';');
        const message = {
            nodeID: Number(nodeID),
            childID: Number(childID),
            command: Number(command),
            ack: Number(ack),
            type: Number(type),
            payload
        };
        this.emit('message', message);
        this.parseCmd(message);
        if (MySensor.DEBUG)
            console.table(message);
    }
    parseCmd(message) {
        switch (message.command) {
            case message_1.MysensorCommand.internal:
                this.doCommandInternal(message);
                break;
            case message_1.MysensorCommand.presentation:
                this.doCommandPresentation(message);
                break;
            case message_1.MysensorCommand.req:
                this.doCommandReq(message);
                break;
            case message_1.MysensorCommand.set:
                this.doCommandSet(message);
                break;
            default:
            case message_1.MysensorCommand.stream:
                this.doCommandStream(message);
                break;
        }
    }
    doCommandInternal(message) {
        this.emit('internal', message);
    }
    doCommandPresentation(message) {
        this.emit('presentation', message);
    }
    doCommandReq(message) {
        this.emit('req', message);
    }
    doCommandSet(message) {
        this.emit('set', message);
    }
    doCommandStream(message) {
        this.emit('stream', message);
    }
}
exports.MySensor = MySensor;
MySensor.DEBUG = false;
