webpackJsonp([18],{

/***/ 628:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var actions = __webpack_require__(4);
	// var Navbar = require('../components/navbar');
	var lodash = __webpack_require__(5);

	module.exports = React.createClass({
	  displayName: 'exports',

	  getInitialState: function getInitialState() {
	    return {
	      filter: {},
	      integrationInstances: []
	    };
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      initialFilter: {}
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var self = this;
	    self.setState({ filter: this.props.initialFilter });
	    var org = actions.getState('org');
	    actions.getIntegrationInstancesForOrg(org.id).then(function (result) {
	      self.setState({
	        integrationInstances: result.integrationInstances
	      });
	    });
	  },
	  render: function render() {
	    var self = this;
	    var integrationInstancesList = lodash.map(self.state.integrationInstances, function (integrationInstance) {
	      return React.createElement(
	        'tr',
	        { key: integrationInstance.id },
	        React.createElement(
	          'td',
	          null,
	          React.createElement(
	            'a',
	            { onClick: actions.goto.bind(null, '/integration_instance/' + integrationInstance.id) },
	            integrationInstance.title ? integrationInstance.title : 'untitled'
	          )
	        )
	      );
	    });
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h1',
	        null,
	        'Integrations'
	      ),
	      React.createElement('hr', null),
	      React.createElement(
	        'table',
	        { className: 'pt-table pt-striped' },
	        React.createElement(
	          'thead',
	          null,
	          React.createElement(
	            'tr',
	            null,
	            React.createElement(
	              'th',
	              null,
	              'Title'
	            )
	          )
	        ),
	        React.createElement(
	          'tbody',
	          null,
	          integrationInstancesList
	        )
	      )
	    );
	  }
	});

/***/ },

/***/ 648:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var actions = __webpack_require__(4);
	// var Navbar = require('../components/navbar');
	var IntegrationInstanceBrowser = __webpack_require__(628);
	// var lodash = require('lodash');

	module.exports = React.createClass({
	  displayName: 'exports',

	  getInitialState: function getInitialState() {
	    return {
	      filter: {}
	    };
	  },
	  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	    if (!nextProps.token) {
	      actions.goto('/');
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'pt-content' },
	      React.createElement(IntegrationInstanceBrowser, { initialFilter: this.filter })
	    );
	  }
	});

/***/ }

});