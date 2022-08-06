const si = require('systeminformation');
const gpudatas = require('../schema/gpudatas');

const proc = () => {
  si.graphics(async (gpudata) => {        
    const data = {
      mem: gpudata.controllers[1].memoryUsed,
      temp: gpudata.controllers[1].temperatureGpu,
      nowdate: new Date() // date object
    }
    
    try {
      await gpudatas.create(data);
      console.log('gpu done');
    }
    catch(ex) {
      console.error(ex);
    }
  })
}

module.exports = {proc};