const express = require('express'),
  cpusearch = require('./searchdatas/cpusearch'),
  gpusearch = require('./searchdatas/gpusearch'),
  memsearch = require('./searchdatas/memsearch'),
  eventrecord = require('./schema/eventschema'),
  cpudata = require('./create-savedata/cpudata.js'),
  gpudata = require('./create-savedata/gpudata.js'),
  memdata = require('./create-savedata/memdata.js'),
  bodyParser = require('body-parser');

app = module.exports = express.Router(); //app이 사용하는 메서드들을 모듈로 export 자세한 원리는 모름 (다른 파일에서 app.use(경로)로 사용 가능)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const exc = async (timeSecond, callback) => {
  await sleep(timeSecond);
  callback();
}

app.get('/getcpuData', async (req, res) => { //쏴주려는 함수가 async면 res 함수도 async(먼저실행 방지)     -------- ->밑과 라우터가 같으면 res가 덮어 씌워진다 (분리 필요)
  try {                                     //가급적이면 try catch 습관화 (에러캐치)
    const result = await cpusearch.all();
    return res.status(200).json(result);         //보내는 데이터가 어떤 형식인지 명시 필요(.json)
  }
  catch {
    return res.status(500).json("err");
  }
});

app.get('/getgpuData', async (req, res) => {
  try { //async - await로 페이지에서 데이터가 로드되기 전에 차트가 그려지는걸 방지
    const result = await gpusearch.all();
    return res.status(200).json(result);
  }
  catch {
    return res.status(500).json("err");
  }
});

app.get('/getmemData', async (req, res) => {
  try {
    const result = await memsearch.all();
    return res.status(200).json(result);
  }
  catch {
    return res.status(500).json("err");
  }
});

app.post('/eventstart', async (req, res) => {
  try {
    await exc(500, cpudata.proc);
    await exc(3000, gpudata.proc);
    await exc(5000, memdata.proc);
    res.send('start');
  }
  catch (err) {
    console.log(err);
  }
});

app.post('/eventend', async (req, res) => {
  try {
    await exc(500, cpudata.proc);
    await exc(3000, gpudata.proc);
    await exc(5000, memdata.proc);
  }
  catch (err) {
    console.log(err);
  }
  
  try {
    let data = {
      start: req.body.start,
      end: req.body.end
    }
    await eventrecord.create(data);
  }
  catch (ex) {
    console.log(ex);
  }
  
});

app.get('/eventrecord', async (req, res) => {
  
  try {
    const loadrecord = () => { //여기에 async를 걸어버리면 다른 결과(prototype인듯?) -> 이유??
      const docs = eventrecord.find(); 
      return docs; //docs = db 에 저장된 cpudatas 콜렉션의 데이터 배열
    }
    const result = await loadrecord();
     //라우트 파일에선 모델 배열로 반환되고 밑에서 json으로 변환시킬 필요 있음
    if (result.length == 0){
      return res.status(200).send('event did not happened.');
    } 
    else {
      return res.status(200).json(result);
    }
    
  }
  catch (err) {
    console.log(err);
  }
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chartpage/chartpage.html')
})

