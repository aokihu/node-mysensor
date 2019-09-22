import SerialPort = require("serialport");
declare const EventEmitter: any;
export default class MySensor extends EventEmitter {
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
