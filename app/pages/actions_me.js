var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var ActionBrowser = require('../components/action_browser');
var lodash = require('lodash')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filter: {
        partner_id: this.props.partner_id
      }
    }
  },
  render() {
    return <ActionBrowser filter={this.filter} view='self' />
  }
})

