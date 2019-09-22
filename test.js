const Mysensor = require('./dest/index.js').default;
const {MysensorCommand} = require('./dest/libs/message.js');
Mysensor.DEBUG = true
async function main() {
  try{
    const mysensor = new Mysensor('/dev/cu.usbserial-A800H5SE', 115200)
    console.log('Serial port is opened')

    setTimeout(() => {
      mysensor.send(15,1, 1,3,0,1);
    }, 5000)

  } catch(err){
    console.error(err)
  }

}

main();
