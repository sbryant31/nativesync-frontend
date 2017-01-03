var React = require('react');
// var actions = require('../modules/actions');
// var Navbar = require('../components/navbar');
var Service = require('../components/service');
// var lodash = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return { }
  },
  render() {
    return <Service id={this.props.params.id} />
  }
})
