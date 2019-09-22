export interface IMysensorMessage {
    nodeID: number;
    childID: number;
    command: MysensorCommand;
    ack: number;
    type: number | MysensorInterType;
    payload: any;
}
export declare enum MysensorCommand {
    presentation = 0,
    set = 1,
    req = 2,
    internal = 3,
    stream = 4
}
export declare enum MysensorDeviceType {
    S_DOOR = 0,
    S_MOTION = 1,
    S_SMOKE = 2,
    S_BINARY = 3,
    S_DIMMER = 4,
    S_COVER = 5,
    S_TEMP = 6,
    S_HUM = 7,
    S_BARO = 8,
    S_WIND = 9,
    S_RAIN = 10,
    S_UV = 11,
    S_WEIGHT = 12,
    S_POWER = 13,
    S_HEATER = 14,
    S_DISTANCE = 15,
    S_LIGHT_LEVEL = 16,
    S_ARDUINO_NODE = 17,
    S_ARDUINO_REPEATER_NODE = 18,
    S_LOCK = 19,
    S_IR = 20,
    S_WATER = 21,
    S_AIR_QUALITY = 22,
    S_CUSTOM = 23,
    S_DUST = 24,
    S_SCENE_CONTROLLER = 25,
    S_RGB_LIGHT = 26,
    S_RGBW_LIGHT = 27,
    S_COLOR_SENSOR = 28,
    S_HVAC = 29,
    S_MULTIMETER = 30,
    S_SPRINKLER = 31,
    S_WATER_LEAK = 32,
    S_SOUND = 33,
    S_VIBRATION = 34,
    S_MOISTURE = 35,
    S_INFO = 36,
    S_GAS = 37,
    S_GPS = 38,
    S_WATER_QUALITY = 39
}
export declare enum MysensorInterType {
    I_BATTERY_LEVEL = 0,
    I_TIME = 1,
    I_VERSION = 2,
    I_ID_REQUEST = 3,
    I_ID_RESPONSE = 4,
    I_INCLUSION_MODE = 5,
    I_CONFIG = 6,
    I_FIND_PARENT = 7,
    I_FIND_PARENT_RESPONSE = 8,
    I_LOG_MESSAGE = 9,
    I_CHILDREN = 10,
    I_SKETCH_NAME = 11,
    I_SKETCH_VERSION = 12,
    I_REBOOT = 13,
    I_GATEWAY_READY = 14,
    I_SIGNING_PRESENTATION = 15,
    I_NONCE_REQUEST = 16,
    I_NONCE_RESPONSE = 17,
    I_HEARTBEAT_REQUEST = 18,
    I_PRESENTATION = 19,
    I_DISCOVER_REQUEST = 20,
    I_DISCOVER_RESPONSE = 21,
    I_HEARTBEAT_RESPONSE = 22,
    I_LOCKED = 23,
    I_PING = 24,
    I_PONG = 25,
    I_REGISTRATION_REQUEST = 26,
    I_REGISTRATION_RESPONSE = 27,
    I_DEBUG = 28
}
