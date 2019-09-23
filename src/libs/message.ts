export interface IMysensorMessage {
    nodeID: number;
    childID: number;
    command: MysensorCommand;
    ack: number;
    type: number | MysensorInterType;
    payload: any
}

export enum MysensorAck {
    NO,
    YES
}

export enum MysensorCommand {
    presentation,
    set,
    req,
    internal,
    stream
}

export enum MysensorDeviceType {
    S_DOOR, S_MOTION,
    S_SMOKE, S_BINARY,
    S_DIMMER, S_COVER,
    S_TEMP, S_HUM, S_BARO,
    S_WIND, S_RAIN, S_UV,
    S_WEIGHT, S_POWER,
    S_HEATER, S_DISTANCE,
    S_LIGHT_LEVEL, S_ARDUINO_NODE,
    S_ARDUINO_REPEATER_NODE,
    S_LOCK, S_IR, S_WATER,
    S_AIR_QUALITY,
    S_CUSTOM, S_DUST, S_SCENE_CONTROLLER,
    S_RGB_LIGHT,
    S_RGBW_LIGHT, S_COLOR_SENSOR, S_HVAC,
    S_MULTIMETER, S_SPRINKLER, S_WATER_LEAK,
    S_SOUND, S_VIBRATION, S_MOISTURE,
    S_INFO, S_GAS, S_GPS, S_WATER_QUALITY
}

export enum MysensorInterType {
    I_BATTERY_LEVEL, I_TIME, I_VERSION,
    I_ID_REQUEST, I_ID_RESPONSE, I_INCLUSION_MODE,
    I_CONFIG, I_FIND_PARENT, I_FIND_PARENT_RESPONSE,
    I_LOG_MESSAGE, I_CHILDREN, I_SKETCH_NAME,
    I_SKETCH_VERSION, I_REBOOT, I_GATEWAY_READY,
    I_SIGNING_PRESENTATION, I_NONCE_REQUEST, I_NONCE_RESPONSE,
    I_HEARTBEAT_REQUEST, I_PRESENTATION, I_DISCOVER_REQUEST,
    I_DISCOVER_RESPONSE, I_HEARTBEAT_RESPONSE, I_LOCKED,
    I_PING, I_PONG, I_REGISTRATION_REQUEST, I_REGISTRATION_RESPONSE,
    I_DEBUG
}