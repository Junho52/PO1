const eventrecords = require('../schema/eventrecords')

const startproc = async () => {
  const data = {
    event: 'start',
    nowdate: new Date()
  }
  
  try {
    await eventrecords.create(data);
    console.log('start event record done');
  }
  catch (ex) {
    console.log(ex);
  }
}