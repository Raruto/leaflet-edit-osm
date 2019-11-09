# leaflet-edit-osm.js
A Leaflet plugin that allows to add an unobtrusive open in OSM Edit link

_For a working example see [demo](https://raruto.github.io/examples/leaflet-edit-osm/leaflet-edit-osm.html)_

---

> _Initally based on the [work](https://github.com/osmlab/leaflet-edit-osm) of **Tom MacWright**_

## How to use

1. **include CSS & JavaScript**
    ```html
    <head>
    ...
    <style> html, body, #map { height: 100%; width: 100%; padding: 0; margin: 0; } </style>
    <!-- Leaflet (JS/CSS) -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"></script>
    <!-- Leaflet-Edit-OSM -->
    <link rel="stylesheet" href="https://unpkg.com/@raruto/leaflet-edit-osm/@latest/leaflet-edit-osm.css" />
    <script src="https://unpkg.com/@raruto/leaflet-edit-osm/@latest/leaflet-edit-osm.js"></script>
    ...
    </head>
    ```
2. **choose a div container used for the slippy map**
    ```html
    <body>
    ...
	  <div id="map"></div>
    ...
    </body>
    ```
3. **create your first simple “leaflet-pegman slippy map**
    ```html
    <script>
      var map = L.map('map');
      map.setView(new L.LatLng(45, 9.5), 5);

      var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        });
      OpenStreetMap.addTo(map);

      var editInOSMControl = new L.Control.EditInOSM({
        position: 'bottomright', // position of control inside the map
        editor: false, // open link with a default editor ("id", "potlatch2" or "remote")
      });
      editInOSMControl.addTo(map);
    </script>
    ```

---

**Compatibile with:** leaflet@1.3.4,

---

**Contributors:** [tmcw](https://github.com/osmlab/leaflet-edit-osm), [Raruto](https://github.com/Raruto/leaflet-edit-osm)
