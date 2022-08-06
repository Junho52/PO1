const si = require('systeminformation');
const date = require('date-and-time');
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

module.exports = {
  create: function () {
    const MemSchema = new Schema({
      using: Number,
      nowdate: String
    });
    
    si.mem((memdata) => {
      const Memdata = mongoose.model("Memdata", MemSchema) 
      const now = new Date();
      const data = new Memdata({
        using: Math.round(memdata.used / 10000000) / 100,
        nowdate: date.format(now, 'YYYY/MM/DD HH:mm:ss')
      })

      data.save()       
        .then(() => {
          console.log(data);
        })
        .catch((err) => {
          console.log("Error : " + err);
        });
    })
  }
}
//memdata.used