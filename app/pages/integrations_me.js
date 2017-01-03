var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var IntegrationBrowser = require('../components/integration_browser');
var lodash = require('lodash')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filter: { }
    }
  },
  render() {
    return <IntegrationBrowser org={actions.getState('org')} initialFilter={this.filter} />
  }
})

