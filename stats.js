const natDisasters = "http://127.0.0.1:5000/api/v1.0/number-disasters-by-state";
const petFriendly = "http://127.0.0.1:5000/api/v1.0/petfriendly-rankings"
// Promise Pending
const disasterPromise = d3.json(natDisasters);

const petPromise = d3.json(petFriendly);
console.log("Data Promise: ", petPromise);
// Fetch the JSON data and console log it
d3.json(natDisasters).then(function(data) {
  var x = [];
  var y = [];
  for (var i = 0; i < data.length; i++) {
    x.push((data[i].state));
    y.push((data[i].disasters));
  }

  var disasterTrace = [
    {
      x,
      y,
      type:  'bar'
    }
  ];

  var disasterLayout = {
    title: 'Number of Natural Disasters by State Since 1953',
    font:{
      family: 'Raleway, sans-serif'
    },
    bargap: 0.10
  };
  Plotly.newPlot('myDiv', disasterTrace, disasterLayout);
});
d3.json(petFriendly).then(function(data){
var x1 = [];
var y1 = [];

for (var i=0; i< data.length; i++){
  if (data[i].overall_rank < 50){
    x1.push((data[i].primary_city));
    y1.push((data[i].overall_rank));  
  }  
}

console.log(x1)
console.log(y1)
var petValues = [
  x1,
  y1]


var petData = [{
  type: "table",
  font:{
    values: [['<b>City</b>'], ['<b>Pet Friendly Rank<b>']],
    align: 'center',
    line: {width: 1, color: 'black'},  
  },
  cells: {
    values: petValues,
    align: 'center',
    line: {color: 'black', width: 1},
    font: {family: "Arial", size: 11, color: ['black']}
  }
}];

Plotly.newPlot('myDiv1', petData);
});