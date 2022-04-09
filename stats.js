const natDisasters = "http://127.0.0.1:5000/api/v1.0/number-disasters-by-state";

// Promise Pending
const disasterPromise = d3.json(natDisasters);
console.log("Data Promise: ", disasterPromise);

// Fetch the JSON data and console log it
d3.json(natDisasters).then(function(data) {
  console.log(data);
  ;
});




