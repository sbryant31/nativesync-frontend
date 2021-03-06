var React = require('react');
var actions = require('../modules/actions');
// var Navbar = require('../components/navbar');
var ServiceBrowser = require('../components/service_browser');
var lodash = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filter: { }
    }
  },
  componentWillUpdate: function(nextProps, nextState) {
    if (!nextProps.token) {
      actions.goto('/');
    }
  },
  render() {
    return <ServiceBrowser filter={this.filter} />
  }
})
