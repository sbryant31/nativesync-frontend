webpackJsonp([13],{

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	var Iframe = React.createClass({
	    displayName: "React-Iframe",

	    propTypes: {
	        url: React.PropTypes.string.isRequired,
	        width: React.PropTypes.string,
	        height: React.PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            height: "100%",
	            width: "100%",
	            position: "fixed"
	        };
	    },

	    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	        return this.props.url !== nextProps.url;
	    },

	    render: function render() {
	        return React.createElement("iframe", { ref: "iframe",
	            frameBorder: "0",
	            src: this.props.url,
	            style: { position: this.props.position, height: this.props.height, width: this.props.width },
	            height: this.props.height, width: this.props.width });
	    }
	});

	module.exports = Iframe;

/***/ },

/***/ 625:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _core = __webpack_require__(23);

	var React = __webpack_require__(1);
	var actions = __webpack_require__(5);
	var Navbar = __webpack_require__(20);
	var _ = __webpack_require__(6);
	var lodash = __webpack_require__(4);

	var Iframe = __webpack_require__(67);

	module.exports = React.createClass({
	  displayName: 'exports',

	  getInitialState: function getInitialState() {
	    return {
	      filter: {},
	      filteredServices: {},
	      services: [],
	      serviceInstances: []
	    };
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      initialFilter: {},
	      showInstances: false
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var self = this;
	    self.setState({ filter: this.props.initialFilter });
	    actions.getServices(this.state.filter).then(function (result) {
	      self.setState({
	        services: result.services,
	        filteredServices: result.services
	      });
	    });
	  },
	  handleFilterChange: function handleFilterChange(field, e) {
	    var filter = this.state.filter;
	    var value = void 0;
	    if (e.target) {
	      value = e.target.value;
	    } else if (e.value) {
	      value = e.value;
	    } else {
	      value = e;
	    }
	    if (value) {
	      filter[field] = value.toLowerCase();
	    } else {
	      delete filter[field];
	    }

	    this.setState({ filter: filter });
	    var filteredServices = _.filter(this.state.services, function (service) {
	      var match = true;
	      _.each(filter, function (value, key) {
	        if (service[key].toLowerCase().indexOf(value) === -1) {
	          match = false;
	        }
	      });
	      return match;
	    });
	    this.setState({ filteredServices: filteredServices });
	  },
	  render: function render() {
	    var self = this;
	    var servicesList = lodash.map(self.state.filteredServices, function (service) {
	      var documentationUrl = 'https://swagger-ui.aerobatic.io/?url=https://api.nativesync.io/docs/service/' + service.id + '/swagger.json';
	      return React.createElement(
	        'tr',
	        { key: service.id },
	        React.createElement(
	          'td',
	          null,
	          React.createElement(
	            'a',
	            { onClick: actions.goto.bind(null, '/service/' + service.id) },
	            React.createElement('img', { src: service.logo_url, style: { height: 50, width: 50 } }),
	            ' ',
	            service.name
	          )
	        ),
	        React.createElement(
	          'td',
	          null,
	          React.createElement(
	            'a',
	            { href: documentationUrl, target: 'new' },
	            React.createElement(
	              'button',
	              { className: 'pt-button' },
	              'Action API Documentation'
	            )
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
	        'Services'
	      ),
	      React.createElement(
	        'a',
	        { onClick: actions.goto.bind(null, '/service/new') },
	        'New Service'
	      ),
	      React.createElement('hr', null),
	      React.createElement(
	        'label',
	        { className: 'pt-label' },
	        'Name ',
	        React.createElement('input', { className: 'pt-input', value: this.state.filter.name, onChange: this.handleFilterChange.bind(this, 'name') })
	      ),
	      React.createElement('hr', null),
	      React.createElement(
	        'table',
	        { className: 'pt-table pt-striped' },
	        React.createElement(
	          'tbody',
	          null,
	          servicesList
	        )
	      )
	    );
	  }
	});

/***/ },

/***/ 649:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var actions = __webpack_require__(5);
	var Navbar = __webpack_require__(20);
	var ServiceBrowser = __webpack_require__(625);
	var lodash = __webpack_require__(4);

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
	    return React.createElement(ServiceBrowser, { filter: this.filter });
	  }
	});

/***/ }

});