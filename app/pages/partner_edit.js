var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var Partner = require('../components/partner');
var lodash = require('lodash')

module.exports = React.createClass({
  getInitialState: function() {
    return { }
  },
  render() {
    return <Partner id={this.props.params.id} />
  }
})

