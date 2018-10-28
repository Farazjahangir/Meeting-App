'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var calculateAngle = function calculateAngle(distance) {
  var boundary = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

  var radians = void 0;
  radians = distance / boundary;
  if (radians < 0) {
    radians = Math.max(radians, -1);
  } else {
    radians = Math.min(radians, 1);
  }
  var degrees = radians * (180 / Math.PI);
  // console.log(degrees);
  return degrees;
};

var translate3d = exports.translate3d = function translate3d(x, y) {
  var beingSwiped = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var initialPosition = arguments[3];

  var translate = void 0;
  // console.log(initialPosition, x, y);
  if (!beingSwiped) {
    translate = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
  } else {
    translate = 'translate3d(' + (initialPosition.x + x) + 'px, ' + (initialPosition.y + Math.abs(x)) + 'px, 0) rotate(' + calculateAngle(x) + 'deg)';
  }
  return {
    msTransform: translate,
    WebkitTransform: translate,
    transform: translate
  };
};

var DIRECTIONS = exports.DIRECTIONS = ['Right', 'Left', 'Top', 'Bottom'];