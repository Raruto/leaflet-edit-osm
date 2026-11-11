# leaflet-edit-osm.js
A Leaflet plugin that allows to add an unobtrusive open in OSM Edit link

_For a working example see [demo](https://raruto.github.io/leaflet-edit-osm/examples/leaflet-edit-osm.html)_

---

> _Initally based on the [work](https://github.com/osmlab/leaflet-edit-osm) of **Tom MacWright**_

## How to use

1. **include CSS & JavaScript**
    ```html
    <head>
    ...
    <style> html, body, #map { height: 100%; width: 100%; padding: 0; margin: 0; } </style>
    <!-- Leaflet (JS/CSS) -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <!-- Leaflet-Edit-OSM -->
    <link rel="stylesheet" href="https://unpkg.com/@raruto/leaflet-edit-osm@0.1.0/leaflet-edit-osm.css" />
    <script src="https://unpkg.com/@raruto/leaflet-edit-osm@0.1.0/leaflet-edit-osm.js"></script>
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
      const map = new L.Map('map');
      map.setView(new L.LatLng(45, 9.5), 5);

      const OpenStreetMap = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        });
      OpenStreetMap.addTo(map);

      const editInOSMControl = new L.Control.EditInOSM({
        position: 'bottomright', // position of control inside the map
        editor: false, // open link with a default editor ("id", "potlatch2" or "remote")
      });
      editInOSMControl.addTo(map);
    </script>
    ```
_Related: [Leaflet-UI presets](https://github.com/raruto/leaflet-ui)_

---

**Compatible with:** Leaflet@1.9.4 and Leaflet@2.0.0-beta.3.

---

**Contributors:** [tmcw](https://github.com/osmlab/leaflet-edit-osm), [Raruto](https://github.com/Raruto/leaflet-edit-osm)
