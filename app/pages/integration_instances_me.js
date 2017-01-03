var React = require('react');
// var actions = require('../modules/actions');
// var Navbar = require('../components/navbar');
var IntegrationInstanceBrowser = require('../components/integration_instance_browser');
// var lodash = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filter: { }
    }
  },
  render() {
    console.log('integrationbrowser', this.state);
    return <IntegrationInstanceBrowser initialFilter={this.filter} />
  }
})
