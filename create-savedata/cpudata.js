const si = require('systeminformation');
const os = require('os-utils');
const cpudatas = require('../schema/cpudatas');
 //(schema/cpudatas) module.exports = mongoose.model('cpudatas', CpuSchema);
 
//몽구스 모듈로 별도 스키마를 만들고 model export, 모듈을 import해서 여기서 사용
  const proc  = () => {   //모듈화를 위해 함수로 감싸기
    os.cpuUsage((v) => {  
      si.currentLoad(async (loaddata) => { // 모듈 사용으로 아래에서 데이터셋 만듦
        const data = {  
          using: Math.round(v * 1000) / 10,
          currentLoad: Math.round(loaddata.currentLoad * 100) / 100,
          nowdate: new Date()
        }

        try { // try / catch 문 자세하게 공부 필요
          await cpudatas.create(data);
          console.log('cpu done'); // async, await 자세히 공부 필요
        }    //await -> 이 함수가 끝날때까지 기다려라, 바로 바깥의 함수를 async 달아줘야함
        catch(ex) {  //에러 캐치
          console.error(ex);
        }
          })
      })
    }

module.exports = {proc};


