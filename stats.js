const natDisasters = "http://127.0.0.1:5000/api/v1.0/number-disasters-by-state";
<<<<<<< Updated upstream
=======
const petFriendly = "http://127.0.0.1:5000/api/v1.0/petfriendly-rankings"
const happiestCities = "http://127.0.0.1:5000/api/v1.0/happiest-cities"
>>>>>>> Stashed changes

// Promise Pending
const disasterPromise = d3.json(natDisasters);
console.log("Data Promise: ", disasterPromise);

<<<<<<< Updated upstream
=======
const petPromise = d3.json(petFriendly);

const happiestPromise= d3.json(happiestCities);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  Plotly.newPlot('myDiv', trace, layout);

  console.log(x)
  console.log(y)
})
=======
  Plotly.newPlot('disasterDiv', disasterTrace, disasterLayout);
});

d3.json(happiestCities).then(function(data){
var x2 = [];
var y2 = [];
var y3 = [];
var y4 = [];
var y5 = [];

for (var i=0; i<data.length; i++){
  if (data[i].overall_rank < 20){
    x2.push((data[i].primary_city));
    y2.push((182-1.1*(data[i].overall_rank))*1.5);
    y3.push(182-1.1*(data[i].emotional_physical));
    y4.push(182-1.1*(data[i].income_employment));
    y5.push(182-1.1*(data[i].community_environment));
}};

var happy1trace = {
  x: x2,
  y: y2,
  name: 'Overall Score',
  type: 'bar'
};

var happy2trace = {
  x: x2,
  y: y3,
  name: 'Emotional & Physical Score',
  type: 'bar'
};

var happy3trace = {
  x: x2,
  y: y4,
  name: 'Income & Employment Score',
  type: 'bar'
};

var happy4trace = {
  x: x2,
  y: y5,
  name: 'Community & Environment Score',
  type: 'bar'
};

var happyData = [happy1trace, happy2trace, happy3trace, happy4trace]
var happyLayout = {barmode: 'group', title: 'Happiest Cities in the US', xaxis:{tickangle:-45}, legend: {x:1, xanchor:'left', y:1}}
Plotly.newPlot('happyDiv', happyData, happyLayout);
});

d3.json(happiestCities).then(function(data){
  var x2 = [];
  var y3 = [];
  
  for (var i=0; i<data.length; i++){
    if (data[i].emotional_physical < 15){
      x2.push((data[i].primary_city));
      y3.push(100-5*(data[i].emotional_physical));
  }};
  
  var happy2trace = {
    x: x2,
    y: y3,
    name: 'Emotional & Physical Score',
    type: 'bar',
    marker: {
      color: 'rgb(175,0,255)'
    }
  };
  
  var happyData = [happy2trace]
  var happyLayout = {barmode: 'bar', title: 'Highest Emotional & Physical Scores', xaxis:{tickangle:-45}};
  var happyConfig = {responsive: true};
  
  Plotly.newPlot('happy1Div', happyData, happyLayout);
  });

d3.json(happiestCities).then(function(data){
    var x2 = [];
    var y3 = [];
    
    for (var i=0; i<data.length; i++){
      if (data[i].income_employment < 15){
        x2.push((data[i].primary_city));
        y3.push(100-5*(data[i].income_employment));
    }};
    
    var happy2trace = {
      x: x2,
      y: y3,
      name: 'Highest Income & Employment Scores',
      type: 'bar',
      marker: {
        color: 'rgb(100,125,25)'
      }
    };
    
    var happyData = [happy2trace]
    var happyLayout = {barmode: 'bar', title: 'Highest Income & Employment', xaxis:{tickangle:-45}};
    var happyConfig = {responsive: true};
    Plotly.newPlot('happy2Div', happyData, happyLayout);
    });

d3.json(happiestCities).then(function(data){
  var x2 = [];
  var y3 = [];
      
  for (var i=0; i<data.length; i++){
    if (data[i].community_environment < 15){
      x2.push((data[i].primary_city));
      y3.push(100-5*(data[i].community_environment));
  }};
      
  var happy2trace = {
    x: x2,
    y: y3,
    name: 'Highest Community & Environment Scores',
    type: 'bar',
    marker: {
      color: 'rgb(0,150,225)'
    }
  };
      
  var happyData = [happy2trace]
  var happyLayout = {barmode: 'bar', title: 'Highest Community & Environment Scores', xaxis:{tickangle:-45}};
  var happyConfig = {responsive: true};
  Plotly.newPlot('happy3Div', happyData, happyLayout);
  });

d3.json(happiestCities).then(function(data){
  var x2 = [];
  var y3 = [];
        
  for (var i=0; i<data.length; i++){
    if (data[i].overall_rank < 15){
      x2.push((data[i].primary_city));
      y3.push(100-5*(data[i].overall_rank));
  }};
        
  var happy2trace = {
    x: x2,
    y: y3,
    name: 'Highest Overall Happiness Scores',
    type: 'bar',
    marker: {
      color: 'rgb(175,225,0)'
    }
  };
        
  var happyData = [happy2trace]
  var happyLayout = {barmode: 'bar', title: 'Highest Overall Happiness Scores', xaxis:{tickangle:-45}};
  var happyConfig = {responsive: true};
  Plotly.newPlot('happy4Div', happyData, happyLayout);
  });

d3.json(petFriendly).then(function(data){
  var x1 = [];
  var y1 = [];

  
  for (var i=0; i< data.length; i++){
    if (data[i].overall_rank < 100){
      x1.push((data[i].primary_city));
      y1.push((data[i].overall_rank));  
    }  
  }
  var petValues = [
    x1,
    y1]
  
  
  var petData = [{
    type: "table",
    header: {
      values: [["<b>City</b>"], ["<b>Pet Friendliness Ranking</b>"]],
      align: "center",
      line: {width: 1, color: 'black'},
      fill: {color: "grey"},
      font: {family: "Arial", size: 12, color: "white"}
    },
    cells: {
      values: petValues,
      align: 'left',
      line: {color: 'black', width: 1},
      font: {family: "Arial", size: 16, color: ['black']}
    }
  }];
  var petConfig = {responsive: true}
  Plotly.newPlot('petDiv', petData, petConfig);
  });
>>>>>>> Stashed changes
