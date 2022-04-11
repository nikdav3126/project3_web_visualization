////////////////////////////////////////////
// BEGIN: Map Base Layer Logic
////////////////////////////////////////////
// create the tile layers for the backgrounds of the map
var defaultMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
// grayscale layer
var grayscale = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});
// water color layer
var waterColor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});
// topography
let topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
// make a basemaps object
let basemaps = {
    GrayScale: grayscale,
    "Water Color": waterColor,
    "Topography": topoMap,
    Default: defaultMap
};
// make a map object
var myMap = L.map("map", {
    center: [36.7783, -119.4179],
    zoom: 5,
    layers: [grayscale, waterColor, topoMap, defaultMap]
});
// add the default map to the map
defaultMap.addTo(myMap);
////////////////////////////////////////////
// END: Map Base Layer Logic
////////////////////////////////////////////


////////////////////////////////////////////
// BEGIN: 1 - Existing Earthquake Data Layer
////////////////////////////////////////////

// variable to hold the earthquake data layer
let earthquakes = new L.layerGroup();
// get the data for the earthquakes and populate the layergroup
// call the USGS GeoJson API
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
.then(
    function(earthquakeData){
        // console log to make sure the data loaded
        console.log(earthquakeData);
        // plot circles, where the radius is dependent on the magnitude
        // and the color is dependent on the depth
        // make a function that chooses the color of the data point
        function dataColor(depth){
            if (depth > 90)
                return "red";
            else if(depth > 70)
                return "#FC4903";
            else if(depth > 50)
                return "#FC8403";
            else if(depth > 30)
                return "#FCAD03";
            else if (depth > 10)
                return "#CAFC03";
            else
                return "green";
        }
        // make a function that determines the size of the radius
        function radiusSize(mag){
            if (mag == 0)
                return 1; // makes sure that a 0 mag earthquake shows up
            else
                return mag * 5; // makes sure that the circle is pronounced in the map
        }
        // add on to the style for each data point
        function dataStyle(feature)
        {
            return {
                opacity: 0.5,
                fillOpacity: 0.5,
                fillColor: dataColor(feature.geometry.coordinates[2]), // use index 2 for the depth
                color: "000000", // black outline
                radius: radiusSize(feature.properties.mag), // grabs the magnitude
                weight: 0.5,
                stroke: true
            }
        }
        // add the GeoJson Data to the earthquake layer group
        L.geoJson(earthquakeData, {
            // make each feature a marker that is on the map, each marker is a circle
            pointToLayer: function(feature, latLng) {
                return L.circleMarker(latLng);
            },
            // set the style for each marker
            style: dataStyle, // calls the data style function and passes in the earthquake data
            // add popups
            onEachFeature: function(feature, layer){
                layer.bindPopup(`Magnitude: <b>${feature.properties.mag}</b><br>
                                Depth: <b>${feature.geometry.coordinates[2]}</b><br>
                                Location: <b>${feature.properties.place}</b>`);
            }
        }).addTo(earthquakes);
        earthquakes.addTo(myMap);
    }
);
////////////////////////////////////////////
// END: 1 - Existing Earthquake Data Layer
////////////////////////////////////////////


////////////////////////////////////////////
// BEGIN: 2 - DogFriendly Data Layer
////////////////////////////////////////////
let dogPoints = new L.layerGroup();

d3.json("/GeojsonData/doglatlongfinal.json")
.then(
    function(dogData){
        // console log to make sure the data loaded
        console.log(dogData);
                // add on to the style for each data point
                function dataStyle(feature)
                {
                    return {
                        opacity: 1,
                        fillOpacity: 0.5,
                        fillColor: "#6C3483", 
                        color: "#6C3483", 
                        radius: 10, 
                        weight: 1,
                        stroke: true
                    }
                }
        L.geoJson(dogData, {
            // make each feature a marker that is on the map, each marker is a circle
            pointToLayer: function(feature, latLng) {
                return L.circleMarker(latLng);
            },
            // set the style for each marker
            style: dataStyle, // calls the data style function 
            onEachFeature: function(feature, layer){
                layer.bindPopup(`Overall Rank: <b>${feature.properties.overall_rank}</b><br>
                                City: <b>${feature.properties.city}</b><br>
                                Total Score: <b>${feature.properties.total_score}</b><br>
                                Pet Budget: <b>${feature.properties.pet_budget}</b><br>
                                Pet Health and Wellness: <b>${feature.properties.pet_health}</b><br>
                                Outdoor Pet Friendliness: <b>${feature.properties.outdoor_friendliness}</b>`);
            }
        }).addTo(dogPoints);
        dogPoints.addTo(myMap);    

    });
////////////////////////////////////////////
// END: 2 - DogFriendly Data Layer
////////////////////////////////////////////


////////////////////////////////////////////
// BEGIN: 3 - HappiestCity Data Layer
////////////////////////////////////////////
let happiestPoints = new L.layerGroup();

d3.json("/GeojsonData/happiestCityDataFinal.json")
.then(
    function(happiestData){
        // console log to make sure the data loaded
        console.log(happiestData);
        L.geoJson(happiestData, {
            // make each feature a marker that is on the map, each marker is a circle
            pointToLayer: function(feature, latLng) {
                return L.circleMarker(latLng);
            },
            onEachFeature: function(feature, layer){
                layer.bindPopup(`Overall Rank: <b>${feature.properties.overall_rank}</b><br>
                                City: <b>${feature.properties.city}</b><br>
                                Total Score: <b>${feature.properties.total_score}</b><br>
                                Emotional/Physical: <b>${feature.properties.emotional_physical}</b><br>
                                Income/Employment: <b>${feature.properties.income_employment}</b><br>
                                Community/Environment: <b>${feature.properties.community_environment}</b>`);
            }
        }).addTo(happiestPoints);
        happiestPoints.addTo(myMap);
    });
////////////////////////////////////////////
// END: 3 - HappiestCity Data Layer
////////////////////////////////////////////


////////////////////////////////////////////
// BEGIN: 4 - IntergenerationMobility Data Layer
////////////////////////////////////////////
//  New Layer Group for Map
    let IntergenerationalMobilityPoints = new L.layerGroup();

// New Function for IntergenerationalMobility
    d3.json("/GeojsonData/IntergenerationalMobilityFinal.json")
.then(
    function(IntergenerationalMobility){
        // console log to make sure the data loaded
        console.log(IntergenerationalMobility);
        // add on to the style for each data point
        function dataStyle(feature)
        {
            return {
                opacity: 1,
                fillOpacity: 0.5,
                fillColor: "#17A589", 
                color: "#17A589", 
                radius: 1, 
                weight: 1,
                stroke: true
            }
        }
        L.geoJson(IntergenerationalMobility, {
            // make each feature a marker that is on the map, each marker is a circle
            pointToLayer: function(feature, latLng) {
                return L.circleMarker(latLng);
            },
            // set the style for each marker
            style: dataStyle, // calls the data style function 
            onEachFeature: function(feature, layer){
                layer.bindPopup(`Zip Code: <b>${feature.properties.zipcode}</b><br>
                                Abs Upward Mobility: <b>${feature.properties.absoluteupwardmobility}</b>`);
            }
        }).addTo(IntergenerationalMobilityPoints);
        IntergenerationalMobilityPoints.addTo(myMap);
    });
////////////////////////////////////////////
// END: 4 - IntergenerationMobility Data Layer
////////////////////////////////////////////


////////////////////////////////////////////
// BEGIN: 5 - Weather Data Layer
////////////////////////////////////////////
//  New Layer Group for Map
let WeatherPoints = new L.layerGroup();

// New Function for Weather Data
    d3.json("/GeojsonData/WeatherDataFinal.json")
.then(
    function(WeatherData){
        // console log to make sure the data loaded
        console.log(WeatherData);
        // add on to the style for each data point
        function dataStyle(feature)
        {
            return {
                opacity: 1,
                fillOpacity: 0.5,
                fillColor: "#E66C37", 
                color: "#E66C37", 
                radius: 1, 
                weight: 1,
                stroke: true
            }
        }
        L.geoJson(WeatherData, {
            // make each feature a marker that is on the map, each marker is a circle
            pointToLayer: function(feature, latLng) {
                return L.circleMarker(latLng);
            },
            // set the style for each marker
            style: dataStyle, // calls the data style function 
            onEachFeature: function(feature, layer){
                layer.bindPopup(`Zip Code: <b>${feature.properties.zip_code}</b><br>
                                Temperature: <b>${feature.properties.temp}</b><br>
                                Wind Speed: <b>${feature.properties.wind_speed}</b><br>
                                Humidity: <b>${feature.properties.humidity}</b><br>
                                Barometric Pressure: <b>${feature.properties.pressure}</b><br>
                                Clouds: <b>${feature.properties.clouds}</b><br>
                                `);
            }
        }).addTo(WeatherPoints);
        WeatherPoints.addTo(myMap);
    });
////////////////////////////////////////////
// END: 5 - Weather Data Layer
////////////////////////////////////////////



////////////////////////////////////////////
// BEGIN: Layer Overlay Definition Dropdown
////////////////////////////////////////////
// add each layer to the map
// add the overlay for the tectonic plates and for the earthquakes
let overlays = {
    "Earthquake Data": earthquakes,
    "Dog Friendliest Cities": dogPoints,
    "Happiest Cities": happiestPoints,
    "InterGen Mobility Cities": IntergenerationalMobilityPoints,
    "Weather Data": WeatherPoints
    
};
// add the Layer control
L.control
    .layers(basemaps, overlays)
    .addTo(myMap);
////////////////////////////////////////////
// END: Layer Overlay Definition Dropdown
////////////////////////////////////////////






    
// // add the legend to the map
// let legend = L.control({
//     position: "bottomright"
// });
// // add the properties for the legend
// legend.onAdd = function() {
//     // div for the legend to appear in the page
//     let div = L.DomUtil.create("div", "info legend");
//     console.log(div);
//     // set up the intervals
//     let intervals = [-10, 10, 30, 50, 70, 90];
//     // set the colors for the intervals
//     let colors = [
//         "green",
//         "#CAFC03",
//         "#FCAD03",
//         "#FC8403",
//         "#FC4903",
//         "red"
//     ];
//     // loop through the intervals and the colors and generate a label
//     // with a colored square for each interval
//     for(var i = 0; i < intervals.length; i++)
//     {
//         // inner html that sets the square for each interval and label
//         div.innerHTML += `<i style="background: ${colors[i]}"></i>${intervals[i]}${(intervals[i+1] ? "km &ndash;" + intervals[i+1] + "km<br>" : "km+")}`
//             // + colors[i]
//             // + "'></i>"
//             // + intervals[i]
//             // + (intervals[i + 1] ? "km &ndash;" + intervals[i + 1] + "km<br>" : "+");
//     }
//     return div;
// };
// // add the legend to the map
// legend.addTo(myMap);
