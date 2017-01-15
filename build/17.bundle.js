webpackJsonp([17],{

/***/ 635:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Navbar = __webpack_require__(17);
	module.exports = React.createClass({
	  displayName: 'exports',

	  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	    if (!nextProps.token) {
	      actions.goto('/');
	    }
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      'Dashboard'
	    );
	  }
	});

/***/ }

});