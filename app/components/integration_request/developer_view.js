var React = require('react');
var actions = require('../../modules/actions');
// var Navbar = require('../components/navbar');
var lodash = require('lodash');
var Select = require('react-select');
var Json = require('react-json');

module.exports = React.createClass({
  getInitialState: function() {
    return { }
  },
  getDefaultProps: function() {
    return {
      integrationRequest: {}
    }
  },
  render() {
    return <div>
      Derp an integration request
    </div>
  }
})
