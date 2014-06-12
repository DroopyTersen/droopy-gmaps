if (!google || !google.maps) {
	throw "Error: Google Maps scripts haven't been loaded yet.";
} else {
	var Coord = google.maps.LatLng;
}

var GooglePin = require("./GooglePin");
var GooglePath = require("./GooglePath");

//Assumes all the google javascript has already been pulled down
var GoogleMap = function(element, pos, zoom, options) {
	var mapOptions = options || {};
	mapOptions.center = new Coord(pos.lat, pos.long);
	mapOptions.zoom = zoom || 12;
	this._map = new google.maps.Map(element, mapOptions);
	this._pins = {};
	this._paths = {};
};

// == PINS ==
GoogleMap.prototype.addPin = function(key, pos, options) {
	this._pins[key] = new GooglePin(this._map, pos, options);
	return this._pins[key];
};

GoogleMap.prototype.movePin = function(key, pos) {
	this._pins[key].move(pos.lat, pos.long);
};

GoogleMap.prototype.getPin = function(key) {
	return this._pins[key];
};
GoogleMap.prototype.removePin = function(key) {
	var pin = this._pins[key];
	if (pin) {
		pin._pin.setMap(null);
		delete this._pins[key];
	}
};
GoogleMap.prototype.center = function(pos) {
	this._map.setCenter(new Coord(pos.lat, pos.long));
};
// == PATHS ==
GoogleMap.prototype.addPath = function(key, points, options) {
	this._paths[key] = new GooglePath(this._map, points, options);
};
GoogleMap.prototype.getPath = function(key) {
	return this._paths[key];
};
GoogleMap.prototype.appendPath = function(key, pos) {
	this._paths[key].addPoint(pos);
};
GoogleMap.prototype.removePath = function(key) {
	var path = this._paths[key];
	if (path) {
		path._path.setMap(null);
		delete this._paths[key];
	}
};