function createMap(earthquakeMarkers) {
    // Create the tile layer that will be the background of our map.
    let map = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create an overlayMaps object to hold the Earthquakes layer.
    let overlayMaps = {
      "Earthquakes": earthquakeMarkers
    };
  
    // Create the map object with options.
    let myMap = L.map("map", {
      center: [39.7392, -104.9903],
      zoom: 5,
      layers: [map, earthquakeMarkers]
    });

    // Set up the legend.
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        let limits = [-10,10,30,50,70,90];
        let colors = ['#B6F34C', '#E1F34C', '#F3DB4C', '#F3B94C', '#F0A76A','#F06A6A'];
    
        // Create the legend content with the limits and colors.
        for (let i = 0; i < limits.length; i++) {
            div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
                + limits[i] + (limits[i + 1] ? "&ndash;" + limits[i + 1] + "<br>" : "+");
        }
        return div;
    };
  
  // Adding the legend to the map
  legend.addTo(myMap);

    }

// createMarkers Function 

function createMarkers(response) {
    // Pull the "earthquakes" property from response.features.
    let earthquakes = response.features;

    // Initialize an array to hold earthquake markers.
    let earthquakeMarkers = [];

    // Function to return depth value color to markers
    function getValue(x) {
        return x > 90 ? "#F06A6A" :
               x > 70 ? "#F0A76A" :
               x > 50 ? "#F3B94C" :
               x > 30 ? "#F3DB4C" :
               x > 10 ? "#E1F34C" :
                   "#B6F34C";
    }

    // Loop through the earthquakes array.
    for (let index = 0; index < earthquakes.length; index++) {
        let earthquake = earthquakes[index];

    // For each earthquake, create a marker, and bind a popup with the station's name.
    let earthquakeMarker = L.circleMarker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
        fillOpacity: .90,
        weight: 1,
        color: "black",
        fillColor: getValue(earthquake.geometry.coordinates[2]),
        radius: (earthquake.properties.mag * 4)
      }).bindPopup("<h3><h3>A " + earthquake.properties.mag + " magnitude " + earthquake.properties.type + 
      "<h3> with a depth of " + earthquake.geometry.coordinates[1] + "km occurred</h3>" +
        "<h3>" + earthquake.properties.place +
      "<h3><h3>on " + new Date(earthquake.properties.time)  
      );
    
    // Add the marker to the earthquakeMarker array.
    earthquakeMarkers.push(earthquakeMarker);
    }

    // Create a layer group that's made from the earthquake array, and pass it to the createMap function.
    createMap(L.layerGroup(earthquakeMarkers));
    }
    
    // Perform an API call to the USGS to get the station information. Call createMarkers when it completes.
    d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);
