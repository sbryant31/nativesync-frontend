var React = require('react');
// var actions = require('../modules/actions');
// var Navbar = require('../components/navbar');
var Organization = require('../components/organization');
// var lodash = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return { }
  },
  render() {
    return <Organization id={this.props.params.id} />
  }
})
