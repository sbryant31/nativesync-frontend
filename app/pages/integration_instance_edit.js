var React = require('react');
var actions = require('../modules/actions');
// var Navbar = require('../components/navbar');
var IntegrationInstance = require('../components/integration_instance');
var lodash = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return { }
  },
  componentWillUpdate: function(nextProps, nextState) {
    if (!nextProps.token) {
      actions.goto('/');
    }
  },
  render() {
    return <IntegrationInstance id={this.props.params.id} integrationId={this.props.params.integrationId} />
  }
})
