L.Control.EditInOSM = class extends L.Control {
	_edit() {
		window.open(`http://www.openstreetmap.org/edit?zoom=${this._map.getZoom()}${this.options.editor ? '&editor=' + this.options.editor : ''}&lat=${this._map.getCenter().lat}&lon=${this._map.getCenter().lng}`);
	}
	onAdd(map) {
		const container = L.DomUtil.create('div', 'leaflet-control-attribution leaflet-edit-osm'),
			link = L.DomUtil.create('a', '', container);

		link.href = '#';
		link.innerHTML = '✎ Edit';
		link.title = 'Edit in OpenStreetMap';

		L.DomEvent
			.on(link, 'click', L.DomEvent.stopPropagation)
			.on(link, 'mousedown', L.DomEvent.stopPropagation)
			.on(link, 'dblclick', L.DomEvent.stopPropagation)
			.on(link, 'click', L.DomEvent.preventDefault)
			.on(link, 'click', this._edit, this);

		return container;
	}
};

// backcomp for leaflet v1.x
L.Control.EditInOSM.prototype.options = Object.assign(Object.create(L.Control.prototype.options), {
	position: "bottomright",
	editor: false, // eg: "id", "potlatch2" or "remote"
});

if (L.control) {
	L.control.editInOSM = function(options) {
		return new L.Control.EditInOSM(options);
	};
}