const si = require('systeminformation');
const memdatas = require('../schema/memdatas')

const proc = () => {
  si.mem(async (memdata) => {
    const data = {
      using: Math.round(memdata.used / 10000000) / 100,
      nowdate: new Date()
    }
    try {
      await memdatas.create(data);
      console.log('mem done');
    }
    catch (ex) {
      console.log(ex);
    }
  })
}

module.exports = { proc };