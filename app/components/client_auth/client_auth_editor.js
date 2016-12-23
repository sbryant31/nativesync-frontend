var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      serviceAuth: {},
      service: {},
      client: {},
      clientAuth: {}
    }
  },
  render() {
    var self = this;
    return <div className="row">
      { JSON.stringify(this.props.clientAuth) }
    </div>
  }
})
