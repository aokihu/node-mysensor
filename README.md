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

sensor.on('message', console.table); // it will display struction data

sensor.on('presentation', (d) => {
  console.log("Device presentation", d);
}) // it will show when device send presentation information

sensor.on('internal', (d) => {
  console.log("Device presentation", d);
}) // it will show internal command
```

## Events

* message
* presentation
* internal
* req
* set
* stream

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