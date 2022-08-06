const cpudraw = (event) => {
  let cpudocs = []   //전역으로 만들어 저장된 데이터를 어디서든 사용(다른방법 ?)
  let data;
  let addRows;

  $.ajax({
    type: 'GET',
    url: '/getcpuData',
    dataType: 'json',
    success: (result) => {  //result = 콜백 함수
      cpudocs = result;
      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(drawLineCpuColors);
    },
    error: (err) => {
      console.error(err)
    }
  })

  let drawLineCpuColors = () => {
    let Rows = [];

    for (let i = 0; i < cpudocs.length; i++) {
      if (typeof event == '') {
        addRows = [
          new Date(cpudocs[i].nowdate), //...?????
          cpudocs[i].using,
          cpudocs[i].currentLoad
        ];
        Rows.push(addRows);

        data = new google.visualization.DataTable();
        data.addColumn('date', 'time');
        data.addColumn('number', 'using');
        data.addColumn('number', 'currentLoad');
        data.addRows(Rows);
      }

      else {
        for (let j = 0; j < event.length; j++) {
          let recordtime = new Date(cpudocs[i].nowdate).getTime();
          let eventstarttime = new Date(event[j].start).getTime();
          let eventendtime = new Date(event[j].end).getTime();

          if (recordtime >= eventstarttime && recordtime <= eventendtime + 3500) {
            addRows = [
              new Date(cpudocs[i].nowdate), //...?????
              cpudocs[i].using,
              true,
              cpudocs[i].currentLoad,
              true
            ];
            Rows.push(addRows);
            break;
          }
          else if ((recordtime < eventstarttime) || (recordtime > eventendtime && recordtime < eventstarttime ) || (recordtime > eventendtime)){
            addRows = [
              new Date(cpudocs[i].nowdate), //...?????
              cpudocs[i].using,
              false,
              cpudocs[i].currentLoad,
              false
            ];
            Rows.push(addRows);
            break;
          }
        }

        data = new google.visualization.DataTable();
        data.addColumn('date', 'time');
        data.addColumn('number', 'using');
        data.addColumn({ type: 'boolean', role: 'emphasis' });
        data.addColumn('number', 'currentLoad');
        data.addColumn({ type: 'boolean', role: 'emphasis' });
        data.addRows(Rows);

      }

      let options = {
        hAxis: {
          title: 'CPU Chart'
        },
        vAxis: {
          title: 'percent %'
        },
        colors: ['#a52714', '#097138']
      };

      // Instantiate and draw our chart, passing in some options.    
      let chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
  }
}