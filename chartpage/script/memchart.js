const memdraw = (event) => {
  let memdocs = []
  let data;
  let addRows;

  $.ajax({
    type: 'GET',
    url: '/getmemData',
    dataType: 'json',
    success: (result) => {
      memdocs = result;
      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(drawLineMemColors);
    },
    error: (err) => {
      console.error(err)
    }
  })

  let drawLineMemColors = () => {
    let Rows = [];
    for (let i = 0; i < memdocs.length; i++) {
      if (typeof event == '') {
        addRows = [
          new Date(memdocs[i].nowdate),
          memdocs[i].using,
        ];
        Rows.push(addRows);

        data = new google.visualization.DataTable();
        data.addColumn('date', 'time');
        data.addColumn('number', 'using');
        data.addRows(Rows);
      }

      else {
        for (let j = 0; j < event.length; j++) {
          let recordtime = new Date(memdocs[i].nowdate).getTime();
          let eventstarttime = new Date(event[j].start).getTime();
          let eventendtime = new Date(event[j].end).getTime();

          if (recordtime >= eventstarttime && recordtime <= eventendtime + 10500) {
            addRows = [
              new Date(memdocs[i].nowdate), //...?????
              memdocs[i].using,
              true,
            ];
            Rows.push(addRows);
            break;
          }
          else if (recordtime < eventstarttime || (recordtime > eventendtime && recordtime < eventstarttime) || recordtime > eventendtime) {
            addRows = [
              new Date(memdocs[i].nowdate), //...?????
              memdocs[i].using,
              false,
            ];
            Rows.push(addRows);
            break;
          }
        }

        data = new google.visualization.DataTable();
        data.addColumn('date', 'time');
        data.addColumn('number', 'using');
        data.addColumn({ type: 'boolean', role: 'emphasis' });
        data.addRows(Rows);
      }

      let options = {
        hAxis: {
          title: 'MEM Chart'
        },
        vAxis: {
          title: 'Gigabyte'
        },
        colors: ['#a52714', '#097138']
      };

      let chart = new google.visualization.LineChart(document.getElementById('chart_div3'));
      chart.draw(data, options);
    }
  }
}