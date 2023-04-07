function createMap(earthquakeMarkers) {
    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
      "Street Map": streetmap
    };
  
    // Create an overlayMaps object to hold the Earthquakes layer.
    let overlayMaps = {
      "Earthquakes": earthquakeMarkers
    };
  
    // Create the map object with options.
    let map = L.map("map", {
      center: [37.7749, -122.4194],
      zoom: 5,
      layers: [streetmap, earthquakeMarkers]
    });

    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(map);
    }

function createMarkers(response) {

    // Pull the "earthquakes" property from response.features.
    let earthquakes = response.features;

    // Initialize an array to hold earthquake markers.
    let earthquakeMarkers = [];

    // Loop through the earthquakes array.
    for (let index = 0; index < earthquakes.length; index++) {
    let earthquake = earthquakes[index];

    // **For each station, create a marker, and bind a popup with the station's name.
    let earthquakeMarker = L.circleMarker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
      }).bindPopup("<h3>Where: " + earthquake.properties.place +
      "<h3><h3>When: " + new Date(earthquake.properties.time) + "<h3><h3>What: " + earthquake.properties.mag + " " + earthquake.properties.type + "</h3>");
    
    // Add the marker to the earthquakeMarker array.
    earthquakeMarkers.push(earthquakeMarker);
    }

    // Create a layer group that's made from the earthquake array, and pass it to the createMap function.
    createMap(L.layerGroup(earthquakeMarkers));
    }
    
    // Perform an API call to the USGS to get the station information. Call createMarkers when it completes.
    d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);
