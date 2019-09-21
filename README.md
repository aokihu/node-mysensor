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
