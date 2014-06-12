var GooglePath = function(map, points, options) {
  this._map = map;
  var pathOptions = options || {
    geodesic: true,
    strokeColor: '#16e',
    strokeOpacity: 0.8,
    strokeWeight: 2.5
  };
  pathOptions.map = this._map;
  pathOptions.path = points.map(function(pos) {
    return new Coord(pos.lat, pos.long);
  });
  this._path = new google.maps.Polyline(pathOptions);
};

GooglePath.prototype.addPoint = function(pos) {
  var points = this._path.getPath();
  points.push(new Coord(pos.lat, pos.long));
  this._path.setPath(points);
};

module.exports = GooglePath;