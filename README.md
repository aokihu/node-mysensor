# node-mysensor

## Install

You can install `node-mysensor` with `npm` or `yarn`

```javascript
npm install -s node-mysensor
```

OR

```javascript
yarn add node-mysensor
```

## Usage

There is **ONLY** class `NodeMysensor`. It will be constructed by 2 params `port` and `baudRate`

> `port` is the serial communication port, like /dev/ttyUSB0 on Linux OR COM1 on Windows
>
> `baudRate` is the speed of serial, it usualy is `115200`


```javascript
const Mysensor = require('./index.js');

const sensor = new Mysensor("/dev/tty.usbserial-A800H5SE", 115200);

sensor.on('message', console.table); 

/**
┌─────────┬─────────────────────────────┐
│ (index) │           Values            │
├─────────┼─────────────────────────────┤
│ nodeID  │              0              │
│ childID │             255             │
│ command │              3              │
│   ack   │              0              │
│  type   │             14              │
│ payload │ 'Gateway startup complete.' │
└─────────┴─────────────────────────────┘
 */

sensor.on('presentation', (message) => {
  console.log("Device presentation", message);
}) // it will show when device send presentation information

sensor.on('internal', (message) => {
  console.log("Device presentation", message);
}) // it will show internal command

sensor.on('set', (message) => {...})
sensor.on('req', (message) => {...})
sensor.on('stream', (message) = {...})

sensor.send(15,1,2,3,0,1) // Send message to node
```

## Static variable

* `MySensor.DEBUG` The switch to show debug message

## Methods

* *instance*.send(nodeID, childID, command, type, ack, payload)
  
  Send raw data to node
  **nodeID** Target node's id
  **chidID** Target node's child id
  **command** Send command type
  **type** Date type
  **ack** Force node replay message 
  **payload** Real set data
  
  You can read detail document from offical site at [here](https://www.mysensors.org/download/serial_api_20#message-structure)

## Events

* message
* presentation
* internal
* req
* set
* stream

All events supply only one param for callback function, it is parsed message, the struct of message you can SEE BELOW ***Message*** Section

## Message

The message is parsed by MySensor protocol 2.0

|   key    | type |     value     |
|---------|-------|---------------|
| nodeID  | Number| The unique id of the node that sends or should receive the message (address)|
| childID | Number|Each node can have several sensors attached. This is the child-sensor-id that uniquely identifies one attached sensor|
| command | Number|Type of command sent |
| ack     | Number|The ack parameter has the following meaning: Outgoing: 0 = unacknowledged message, 1 = request ack from destination node, Incoming: 0 = normal message, 1 = this is an ack message |
| type    | Number|Depending on command, the type field has different meaning. |
| payload | Number OR String| The payload holds the message coming in from sensors or instruction going out to actuators. |
