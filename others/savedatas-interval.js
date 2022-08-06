const cpudata = require('./create-savedata/cpudata.js'),
  gpudata = require('./create-savedata/gpudata.js'),
  memdata = require('./create-savedata/memdata.js');

const proc = () => {
  const sleep = (ms) => {
    return new Promise((resolve) => { //이 부분 공부 필요 promise
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

    exc(1000, procAll)
  }
}

module.exports = {proc};