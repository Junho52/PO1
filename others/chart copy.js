const abc = (doc) => {
  let docs = []
  const doc = [
    {
      // _id: new ObjectId("62d5684c078761d8068d9efb"),
      using: 53.5,
      currentLoad: 4.32,
      nowdate: new Date(),
      __v: 0
    },
    {
      // _id: new ObjectId("62d56dbad728039ae76cd5b0"),
      using: 2.5,
      currentLoad: 4.35,
      nowdate: new Date(),
      __v: 0
    },
    {
      // _id: new ObjectId("62d56f0b487fc2f91f25f89f"),
      using: 82.4,
      currentLoad: 4.35,
      nowdate: new Date(),
      __v: 0
    },
    {
      // _id: new ObjectId("62d56feb9a9836902ca4bf36"),
      using: 10.1,
      currentLoad: 4.35,
      nowdate: new Date(),
      __v: 0
    },
    {
      //_id: new ObjectId("62d570052bd8f84d30852bab"),
      using: 7.9,
      currentLoad: 4.35,
      nowdate: new Date(),
      __v: 0
    },
    {
      //_id: new ObjectId("62d57010f6702c9885a93060"),
      using: 9.6,
      currentLoad: 4.36,
      nowdate: new Date(),
      __v: 0
    }]
  docs = doc;

  // Load the Visualization API and the corechart package.
  google.charts.load('current', { 'packages': ['corechart'] });

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawLineColors);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawLineColors() {
    let Rows = [];
    for (let i = 0; i < docs.length; i++) {
      let addRows = [
        docs[i].nowdate,
        docs[i].using,
        docs[i].currentLoad
      ];
      Rows.push(addRows);
    }
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'X');
    data.addColumn('number', 'Dogs');
    data.addColumn('number', 'Cats');
    data.addRows(Rows);

    // Set chart options
    var options = {
      hAxis: {
        title: 'Time'
      },
      vAxis: {
        title: 'abcd'
      },
      colors: ['#a52714', '#097138']
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(document.getElementById('chart_div2'));
    chart.draw(data, options);
  }
}
