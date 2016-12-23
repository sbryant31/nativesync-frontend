var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var IntegrationBrowser = require('../components/integration_browser');
var lodash = require('lodash')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filter: {
        partner_id: actions.getState('org').id
      }
    }
  },
  render() {
    console.log('integrationbrowser', this.state);
    return <IntegrationBrowser initialFilter={this.filter} />
  }
})

