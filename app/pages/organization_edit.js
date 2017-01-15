var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var Organization = require('../components/organization');
var lodash = require('lodash')

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
    return <Organization id={this.props.params.id} />
  }
})
