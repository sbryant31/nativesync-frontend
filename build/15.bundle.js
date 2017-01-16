webpackJsonp([15],{

/***/ 629:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactRouter = __webpack_require__(103);

	var React = __webpack_require__(1);
	var lodash = __webpack_require__(4);


	module.exports = React.createClass({
	  displayName: 'exports',

	  getDefaultProps: function getDefaultProps() {
	    return {
	      items: {}
	    };
	  },
	  goto: function goto(url) {
	    _reactRouter.browserHistory.push(url);
	  },
	  render: function render() {
	    var items = lodash.map(this.props.items, function (item) {
	      return React.createElement(
	        'li',
	        { key: item.name },
	        React.createElement(
	          'button',
	          {
	            type: 'button',
	            onClick: this.goto.bind(this, item.url),
	            className: 'pt-menu-item' },
	          item.name
	        )
	      );
	    }.bind(this));
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'ul',
	        { className: 'pt-menu' },
	        items
	      )
	    );
	  }
	});

/***/ },

/***/ 647:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Navbar = __webpack_require__(20);
	var Sidebar = __webpack_require__(629);

	module.exports = React.createClass({
	  displayName: 'exports',

	  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	    if (!nextProps.token) {
	      actions.goto('/');
	    }
	  },
	  render: function render() {
	    var sidebarItems = [{ name: 'Dashboard', url: '/organization/dashboard' }, { name: 'My Gigs', url: '/organization/gigs' }, { name: 'Post a Gig', url: '/organization/gigs/new' }, { name: 'Browse Integrations', url: '/integrations' }, { name: 'Profile', url: '/profile' }];

	    return React.createElement(
	      'div',
	      { style: { paddingTop: 50 } },
	      React.createElement(Navbar, null),
	      React.createElement(
	        'div',
	        { className: 'container' },
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'pt-card col-xs-3' },
	            React.createElement(Sidebar, { items: sidebarItems })
	          ),
	          React.createElement(
	            'div',
	            { className: 'pt-card col-xs-9' },
	            'Main Body'
	          )
	        )
	      )
	    );
	  }
	});

/***/ }

});