const Mysensor = require('./dest/index.js').default;
Mysensor.DEBUG = false
async function main() {
  try{
    const mysensor = new Mysensor('/dev/cu.usbserial-A800H5SE', 115200)
    console.log('Serial port is opened')
    mysensor.on('message', console.table)

  } catch(err){
    console.error(err)
  }
 
}

main();