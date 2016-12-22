var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var Client = require('../components/client');
var lodash = require('lodash')

module.exports = React.createClass({
  getInitialState: function() {
    return { }
  },
  render() {
    return <Client id={this.props.params.id} />
  }
})

