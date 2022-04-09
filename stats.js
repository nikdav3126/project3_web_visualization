const natDisasters = "http://127.0.0.1:5000/api/v1.0/number-disasters-by-state";

// Promise Pending
const disasterPromise = d3.json(natDisasters);
console.log("Data Promise: ", disasterPromise);

// Fetch the JSON data and console log it
d3.json(natDisasters).then(function(data) {
  console.log(data);

  var x = [];
  var y = [];
  for (var i = 0; i < data.length; i++) {
    x.push((data[i].state));
    y.push((data[i].disasters));
  }

  var trace = [
    {
      x,
      y,
      type:  'bar'
    }
  ];

  var layout = {
    title: 'Number of Natural Disasters by State Since 1953',
    font:{
      family: 'Raleway, sans-serif'
    },
    bargap: 0.10
  };
  Plotly.newPlot('myDiv', trace, layout);

  console.log(x)
  console.log(y)
})
