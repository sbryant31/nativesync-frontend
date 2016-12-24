var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var ServiceAuthDetails = require('./service_auth_details');
var KeyValueObject = require('../inputs/key_value_object');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      details: {},
      readOnly: false,
      onChange: function(details) { console.log('details changed', details); }
    }
  },
  render() {
    var self = this;
    return <div>
      <KeyValueObject
				object={this.props.details}
				readOnly={this.props.readOnly}
				onChange={this.props.onChange}
			/>
    </div>
  }
})
