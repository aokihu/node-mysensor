"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var SerialPort = require("serialport");
var message_1 = require("./libs/message");
var SerialportReadline = require('@serialport/parser-readline');
var EventEmitter = require('events');
/**
 * @class
 */
var MySensor = /** @class */ (function (_super) {
    __extends(MySensor, _super);
    /**
     * @constructor
     * @param port Serial interface port name
     * @param baudrate Serial interface transfer speed, default is 115200
     */
    function MySensor(port, baudrate) {
        var _this = _super.call(this) || this;
        _this.baudrate = 115200; // Serial interface transfer speed, default is 115200
        _this.port = port;
        if (baudrate)
            _this.baudrate = baudrate;
        _this.serial = new SerialPort(_this.port, { baudRate: _this.baudrate }, function (err) { if (err)
            throw new Error(err.message); });
        _this.parser = _this.serial.pipe(new SerialportReadline({ delimiter: '\n' }));
        _this.parser.on('data', _this.preprocess.bind(_this));
        return _this;
    }
    /**
     * @static
     * @public
     * @function
     * @description Get a default serial port, noraml is the first port
     */
    MySensor.getSerialPorts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, SerialPort.list()];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        _a = _b.sent();
                        throw new Error('No vaild serial port found!');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @private
     * @function
     * @event message {IMysensorMessage} Parsed Message
     * @param data Raw message
     */
    MySensor.prototype.preprocess = function (data) {
        var _a = data.split(';'), nodeID = _a[0], childID = _a[1], command = _a[2], ack = _a[3], type = _a[4], payload = _a[5];
        var message = {
            nodeID: Number(nodeID),
            childID: Number(childID),
            command: Number(command),
            ack: Number(ack),
            type: Number(type),
            payload: payload
        };
        // Emit 'message' event
        this.emit('message', message);
        // Next
        this.parseCmd(message);
        if (MySensor.DEBUG)
            console.table(message);
    };
    /**
     * @private
     * @function
     * @param message Parsed mysensor message
     * @description parse message command
     */
    MySensor.prototype.parseCmd = function (message) {
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
    };
    /**
     *
     * @param message Parsed mysensor mesage
     */
    MySensor.prototype.doCommandInternal = function (message) {
        this.emit('internal', message);
    };
    MySensor.prototype.doCommandPresentation = function (message) {
        this.emit('presentation', message);
    };
    MySensor.prototype.doCommandReq = function (message) {
        this.emit('req', message);
    };
    MySensor.prototype.doCommandSet = function (message) {
        this.emit('set', message);
    };
    MySensor.prototype.doCommandStream = function (message) {
        this.emit('stream', message);
    };
    MySensor.DEBUG = false; // The switch to display debug output
    return MySensor;
}(EventEmitter));
exports["default"] = MySensor;
