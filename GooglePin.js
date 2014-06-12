var GooglePin = function(map, pos, options) {
  this._map = map;
  this.pos = pos;
  var pinOptions = options || {
    draggable: false
  };
  pinOptions.map = map;
  pinOptions.position = new Coord(pos.lat, pos.long);
  this._pin = new google.maps.Marker(pinOptions);
};

GooglePin.prototype.move = function(lat, long) {
  this._pin.setPosition(new Coord(lat, long));
};

GooglePin.prototype.animate = function(onOrOff) {
  var animation = onOrOff === false ? null : google.maps.Animation.BOUNCE;
  this._pin.setAnimation(animation);
};

module.exports = GooglePin;