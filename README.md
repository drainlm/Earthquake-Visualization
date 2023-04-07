# leaflet-challenge ReadMe

### Earthquake Visualization

This code uses Leaflet.js and [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) to create an interactive map displaying earthquake data from the past 7 days. The map uses *clustered* markers with popups to share information about the location, date and time, magnitude, and type (earthquake or quarry). *The markers also reflect the magnitude by their size and depth by color. A legend is included to provide context.*

`<png>`

Functions: 

1. The `<createMap>` function uses the openstreetmap as a base layer and overlays with the earthquake markers array.
2. The `<createMarkers>` function processes the earthquake data as a response object and creates a circle marker using the earthquake coordinates. It then binds a popup including the earthquake's place, date and time, magnitude, and type. 

An API call to the USGS to get the information is then made, which then calls to `<createMarkers>` when it completes.

    ![2-BasicMap](https://static.bc-edx.com/data/dl-1-2/m15/lms/img/2-BasicMap.jpg)


### Part 2: Gather and Plot More Data (Optional with no extra points earning)

    Plot a second dataset on your map to illustrate the relationship
between tectonic plates and seismic activity. You will need to pull in
this dataset and visualize it alongside your original data. Data on
tectonic plates can be found at[https://github.com/fraxen/tectonicplates](https://github.com/fraxen/tectonicplates)

    This part is completely optional; you can complete this part as a way to challenge yourself and boost your new skills.

    The following image is an example screenshot of what you should produce:

    ![5-Advanced](https://static.bc-edx.com/data/dl-1-2/m15/lms/img/5-Advanced.jpg)

    Perform the following tasks:

    * Plot the tectonic plates dataset on the map in addition to the earthquakes.

* Add other base maps to choose from.
* Put each dataset into separate overlays that can be turned on and off independently.
* Add layer controls to your map.
