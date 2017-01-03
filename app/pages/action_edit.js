var React = require('react');
// var actions = require('../modules/actions');
// var Navbar = require('../components/navbar');
var Action = require('../components/action');
// var lodash = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return { }
  },
  render() {
    return <Action id={this.props.params.id} />
  }
})
