L.Control.EditInOSM = L.Control.extend({
	options: {
		position: "bottomright",
		editor: false, // eg: "id", "potlatch2" or "remote"
	},
	_edit: function() {
		var center = this._map.getCenter();
		var z = this._map.getZoom();
		var editor = this.options.editor ? '&editor=' + this.options.editor : '';
		window.open('http://www.openstreetmap.org/edit?' + 'zoom=' + z + editor + '&lat=' + center.lat + '&lon=' + center.lng);
	},
	onAdd: function(map) {
		var container = L.DomUtil.create('div', 'leaflet-control-attribution leaflet-edit-osm'),
			link = L.DomUtil.create('a', '', container);

		link.href = '#';
		link.innerHTML = '✎ Edit';
		link.title = 'Edit in OpenStreetMap';

		L.DomEvent
			.on(link, 'click', L.DomEvent.stopPropagation)
			.on(link, 'mousedown', L.DomEvent.stopPropagation)
			.on(link, 'dblclick', L.DomEvent.stopPropagation)
			.on(link, 'click', L.DomEvent.preventDefault)
			.on(link, 'click', L.bind(this._edit, this), this);

		return container;
	}
});

L.control.editInOSM = function(options) {
	return new L.Control.EditInOSM(options);
};
