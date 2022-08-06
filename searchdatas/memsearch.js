const memdatas = require('../schema/memdatas');

const all = async () => {
  const docs = await memdatas.find();
  return docs; //docs = db 에 저장된 cpudatas 콜렉션의 데이터 배열
}

module.exports = {all};

