var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var Integration = require('../components/integration');
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
    return <Integration id={this.props.params.id} />
  }
})
