import SerialPort = require("serialport");
import { MysensorCommand } from './libs/message';
declare const EventEmitter: any;
export default class MySensor extends EventEmitter {
    static DEBUG: boolean;
    private serial;
    private parser;
    port: string;
    baudrate: number;
    constructor(port: string, baudrate?: number);
    static getSerialPorts(): Promise<SerialPort.PortInfo[]>;
    send(nodeID: number, childID: number, command: MysensorCommand, type: number, ack?: number, payload?: number | string): void;
    private preprocess;
    private parseCmd;
    private doCommandInternal;
    private doCommandPresentation;
    private doCommandReq;
    private doCommandSet;
    private doCommandStream;
}
export {};
