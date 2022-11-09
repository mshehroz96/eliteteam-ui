var options = {     
            
    series: [{
    name: 'Profiles Unlocked',
    type: 'column',
    data: [15, 20, 40, 10, 5, 15, 50, 41, 12, 34, 10, 30]
  },   
  {
    name: 'Hire',
    type: 'line',
    data: [2, 1, 10, 1, 1, 2, 4, 10, 12, 10, 5, 9]
  }],
    chart: {
    height: 350,
    type: 'line',
    toolbar: { show: false }
  },
  stroke: {
    width: [0, 4]
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [1]
  },
  labels: ['Jan 2022', 'Feb 2022', 'March 2022', 'April 2022', 'June 2022', 'July 2022', 'Aug 2022', 'Sep 2022', 'Oct 2022', 'Nov 2022', 'Dec 2022'],
  xaxis: {
    type: 'datetime'
  },
  yaxis: [{
    title: {
      text: 'Profiles Unlocked',
    },
  
  }, {
    opposite: true,
    title: {
      text: 'Hire'
    }
  }]
  };

  var chart = new ApexCharts(document.querySelector("#dashboard-chart-1"), options);
  chart.render();



