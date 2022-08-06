const express = require('express'),
  connect = require('./mongoose.js'),
  cpudata = require('./create-savedata/cpudata.js'),
  gpudata = require('./create-savedata/gpudata.js'),
  memdata = require('./create-savedata/memdata.js');

connect();

const app = express();

app.use('/script', express.static(__dirname + '/chartpage/script'));

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const exc = async (timeSecond, callback) => {
  await sleep(timeSecond);
  callback();
}

let procAll = () => {
  exc(500, cpudata.proc);
  exc(3000, gpudata.proc);
  exc(5000, memdata.proc);
  //await gpudata.proc(); 시간텀을 주지 않으면 await를 걸어도 cpu 부하가 일어남 
  //await memdata.proc(); 
}

//exc(1000, procAll)

//setInterval(procAll, 60000);

app.use(require('./page-routes')); //page-routes에서 Router 메서드로 chart로직(getdata, sendFile)을 모듈로 export하고, 여기서 받음(해당 모듈의 로직 실행)

app.listen(3000, (err) => {
  if (err) {
    return console.error(err);
  }
});