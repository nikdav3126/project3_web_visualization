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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////TECTONIC PLATES/////////////////////////////////
// call the api to get the info for the tectonic plates
let tectonicplates = new L.layerGroup();
// call the api to get the info for the tectonic plates
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
.then(function(plateData){
    // console log to make sure the data loaded
    // console.log(plateData);
    // load data using geoJson and add to the tectonic plates layer group
    L.geoJson(plateData,{
        // add styling to make the lines visible
        color: "yellow",
        weight: 1
    }).addTo(tectonicplates);
});
// add the tectonic plates to the map
tectonicplates.addTo(myMap);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////EARTHQUAKES/////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////PETS/////////////////////////////////
let dogPoints = new L.layerGroup();

d3.json("/GeojsonData/doglatlongfinal.json")
.then(
    function(dogData){
        // console log to make sure the data loaded
        console.log(dogData);
               
                function dataColor(depth){
                    if (depth > 55)
                        return "red";
                    else if(depth > 52)
                        return "#FC4903";
                    else if(depth > 49)
                        return "#FC8403";
                    else if(depth > 46)
                        return "#FCAD03";
                    else if (depth > 43)
                        return "#CAFC03";
                    else
                        return "green";
                }
                // make a function that determines the size of the radius
                function radiusSize(mag){
                    if (mag == 0)
                        return 1; // makes sure that a 0 mag earthquake shows up
                    else
                        return mag/10; // makes sure that the circle is pronounced in the map
                }
                // add on to the style for each data point
                function dataStyle(feature)
                {
                    return {
                        opacity: 0.5,
                        fillOpacity: 0.5,
                        fillColor: dataColor(feature.properties.total_score), // use index 2 for the depth
                        color: "000000", // black outline
                        radius: radiusSize(feature.properties.total_score), // grabs the magnitude
                        weight: 0.5,
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
                layer.bindPopup(`
                                Total Score: <b>${feature.properties.total_score}</b><br>
                                Overall Rank: <b>${feature.properties.overall_rank}</b><br>
                                City: <b>${feature.properties.city}</b><br>
                                Pet Budget: <b>${feature.properties.pet_budget}</b><br>
                                Pet Health and Wellness: <b>${feature.properties.pet_health}</b><br>
                                Outdoor Pet Friendliness: <b>${feature.properties.outdoor_friendliness}</b>`);
            }
        }).addTo(dogPoints);
        dogPoints.addTo(myMap);    

    });


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////HAPPIEST POINTS/////////////////////////////////    
let happiestPoints = new L.layerGroup();
d3.json("/GeojsonData/happiestCityDataFinal.json")
.then(
    function(happiestData){
        // console log to make sure the data loaded
        console.log(happiestData);
        function dataColor(depth){
            if (depth > 90)
                return "red";
            else if(depth > 80)
                return "#FC4903";
            else if(depth > 70)
                return "#FC8403";
            else if(depth > 60)
                return "#FCAD03";
            else if (depth > 50)
                return "#CAFC03";
            else
                return "green";
        }
        // make a function that determines the size of the radius
        function radiusSize(mag){
            if (mag == 0)
                return 1; // makes sure that a 0 mag earthquake shows up
            else
                return mag/5; // makes sure that the circle is pronounced in the map
        }
        // add on to the style for each data point
        function dataStyle(feature)
        {
            properties_update = feature.properties
            return {
                opacity: 0.5,
                fillOpacity: 0.5,
                fillColor: dataColor(properties_update.total_score), // use index 2 for the depth
                color: "000000", // black outline
                radius: radiusSize(properties_update.total_score), // grabs the magnitude
                weight: 0.5,
                stroke: true
            }
        }
        L.geoJson(happiestData, {
            // make each feature a marker that is on the map, each marker is a circle
            pointToLayer: function(feature, latLng) {
                return L.circleMarker(latLng);
            },
            // set the style for each marker
            style: dataStyle, // calls the data style function and passes in the earthquake data
            // add popups
            onEachFeature: function(feature, layer){
                properties_update = feature.properties
                layer.bindPopup(`Total Score: <b>${properties_update.total_score}</b><br>
                                Overall Rank: <b>${properties_update.overall_rank}</b><br>
                                Emotional and Physical Wellbeing: <b>${properties_update.emotional_physical}</b><br>
                                Community Environment: <b>${properties_update.community_environment}</b><br>
                                Income Employment: <b>${properties_update.income_employment}</b><br>
                                Location: <b>${properties_update.city}</b>`);
            }
        }).addTo(happiestPoints);
        happiestPoints.addTo(myMap);
    });


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////WEATHER POINTS/////////////////////////////////
let weatherpoints = new L.layerGroup();
d3.json("/GeojsonData/weatherDataFinal.json")
.then(
    function(weather_data){
        // console log to make sure the data loaded
        console.log(weather_data);
        function dataColor(depth){
            if (depth > 40)
                return "red";
            else if(depth > 30)
                return "#FC4903";
            else if(depth > 20)
                return "#FC8403";
            else if(depth > 10)
                return "#FCAD03";
            else if (depth > 5)
                return "#CAFC03";
            else
                return "green";
        }
        // make a function that determines the size of the radius
        function radiusSize(mag){
            if (mag == 0)
                return 1; // makes sure that a 0 mag earthquake shows up
            else
                return mag/15; // makes sure that the circle is pronounced in the map
        }
        // add on to the style for each data point
        function dataStyle(feature)
        {
            properties_update = feature.properties
            return {
                opacity: 0.5,
                fillOpacity: 0.5,
                fillColor: dataColor(properties_update.temp), // use index 2 for the depth
                color: "000000", // black outline
                radius: radiusSize(properties_update.temp), // grabs the magnitude
                weight: 0.5,
                stroke: true
            }
        }
        L.geoJson(weather_data, {
            // make each feature a marker that is on the map, each marker is a circle
            pointToLayer: function(feature, latLng) {
                return L.circleMarker(latLng);
            },
            // set the style for each marker
            style: dataStyle, // calls the data style function and passes in the earthquake data
            // add popups
            onEachFeature: function(feature, layer){
                properties_update = feature.properties
                layer.bindPopup(`Temp: <b>${properties_update.temp}</b><br>
                                Pressure: <b>${properties_update.pressure}</b><br>
                                Humidity: <b>${properties_update.humidity}</b><br>
                                Wind speed: <b>${properties_update.wind_speed}</b><br>
                                Clouds: <b>${properties_update.clouds}</b>`);
            }
        }).addTo(weatherpoints);
        weatherpoints.addTo(myMap);
    });




//  New Layer Group for Map
    let IntergenerationalMobilityPoints = new L.layerGroup();

// New Function for IntergenerationalMobility
    d3.json("/GeojsonData/IntergenerationalMobilityFinal.json")
.then(
    function(IntergenerationalMobility){
        // console log to make sure the data loaded
        console.log(IntergenerationalMobility);
        // add on to the style for each data point
        function dataColor(depth){
            if (depth > 50)
                return "red";
            else if(depth > 47)
                return "#FC4903";
            else if(depth > 44)
                return "#FC8403";
            else if(depth > 41)
                return "#FCAD03";
            else if (depth > 38)
                return "#CAFC03";
            else
                return "green";
        }
        // make a function that determines the size of the radius
        function radiusSize(mag){
            if (mag == 0)
                return 1; // makes sure that a 0 mag earthquake shows up
            else
                return mag/15; // makes sure that the circle is pronounced in the map
        }
        // add on to the style for each data point
        function dataStyle(feature)
        {
            properties_update = feature.properties
            return {
                opacity: 0.5,
                fillOpacity: 0.5,
                fillColor: dataColor(properties_update.absoluteupwardmobility), // use index 2 for the depth
                color: "000000", // black outline
                radius: radiusSize(properties_update.absoluteupwardmobility), // grabs the magnitude
                weight: 0.5,
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

// add each layer to the map
// add the overlay for the tectonic plates and for the earthquakes
let overlays = {
    "Tectonic Plates": tectonicplates,
    "Earthquake Data": earthquakes,
    "Dog Friendliest Cities": dogPoints,
    "Happiest Cities": happiestPoints,
    "InterGen Mobility Cities": IntergenerationalMobilityPoints,
    "Weather Data": weatherpoints
    
};
// add the Layer control
L.control
    .layers(basemaps, overlays)
    .addTo(myMap);

    
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
