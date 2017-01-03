var React = require('react');
var actions = require('../modules/actions');
// var Navbar = require('../components/navbar');
var ActionBrowser = require('../components/action_browser');
// var lodash = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filter: {
        organization_id: actions.getState('org').id
      }
    }
  },
  render() {
    return <ActionBrowser initialFilter={this.state.filter} view='self' />
  }
})
