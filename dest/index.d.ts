import SerialPort = require("serialport");
import { IMysensorMessage, MysensorCommand } from './libs/message';
declare const EventEmitter: any;
export declare class MySensor extends EventEmitter {
    static IMysensorMessage: IMysensorMessage;
    static MysensorCommand: MysensorCommand;
    static DEBUG: boolean;
    private serial;
    private parser;
    port: string;
    baudrate: number;
    constructor(port: string, baudrate?: number);
    static getSerialPorts(): Promise<SerialPort.PortInfo[]>;
    private preprocess;
    private parseCmd;
    private doCommandInternal;
    private doCommandPresentation;
    private doCommandReq;
    private doCommandSet;
    private doCommandStream;
}
export {};
