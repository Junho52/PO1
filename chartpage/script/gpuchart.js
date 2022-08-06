const gpudraw = (event) => {
  let gpudocs = []
  let data;
  let addRows;

  $.ajax({
    type: 'GET',
    url: '/getgpuData',
    dataType: 'json',
    success: (result) => {
      gpudocs = result;
      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(drawLineGpuColors);
    },
    error: (err) => {
      console.error(err)
    }
  })

  let drawLineGpuColors = () => {
    let Rows = [];
    for (let i = 0; i < gpudocs.length; i++) {
      if (typeof event == '') {
        let addRows = [
          new Date(gpudocs[i].nowdate),
          gpudocs[i].mem,
          gpudocs[i].temp
        ];
        Rows.push(addRows);

        data = new google.visualization.DataTable();
        data.addColumn('date', 'time');
        data.addColumn('number', 'mem');
        data.addColumn('number', 'temp');
        data.addRows(Rows);
      }

      else {
        for (let j = 0; j < event.length; j++) {
          let recordtime = new Date(gpudocs[i].nowdate).getTime();
          let eventstarttime = new Date(event[j].start).getTime();
          let eventendtime = new Date(event[j].end).getTime();

          if (recordtime >= eventstarttime && recordtime <= eventendtime + 7000) {
            addRows = [
              new Date(gpudocs[i].nowdate), //...?????
              gpudocs[i].mem,
              true,
              gpudocs[i].temp,
              true
            ];
            Rows.push(addRows);
            break;
          }
          else if (recordtime < eventstarttime || (recordtime > eventendtime && recordtime < eventstarttime) || recordtime > eventendtime) {
            addRows = [
              new Date(gpudocs[i].nowdate), //...?????
              gpudocs[i].mem,
              false,
              gpudocs[i].temp,
              false
            ];
            Rows.push(addRows);
            break;
          }
        }

        data = new google.visualization.DataTable();
        data.addColumn('date', 'time');
        data.addColumn('number', 'mem');
        data.addColumn({ type: 'boolean', role: 'emphasis' });
        data.addColumn('number', 'temp');
        data.addColumn({ type: 'boolean', role: 'emphasis' });
        data.addRows(Rows);
      }

      let options = {
        hAxis: {
          title: 'GPU Chart'
        },
        vAxis: {
          title: 'Megabyte / °C'
        },
        colors: ['#a52714', '#097138']
      };

      let chart = new google.visualization.LineChart(document.getElementById('chart_div2'));
      chart.draw(data, options);
    }
  }
}