var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var TextInputField = require('../inputs/text_input_field');
var ActionSelector = require('../action/action_select');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      id: null,
      details: {},
      onChange: function(details) { console.log('details changed', details); },
      readOnly: false
    }
  },
  handleChange: function(field, e) {
    console.log('changing', field, e);
    var details = this.props.details;
    if (e.target) {
      details[field] = e.target.value;
    } else if (e.value) {
      details[field] = e.value;
    } else {
      details[field] = e;
    }
    console.log('changing type to', details, field, e);
    this.props.onChange(details);
  },
  render() {
    var self = this;
    return (
      <div>
        <ActionSelector value={this.props.details.action_id} onChange={this.handleChange.bind(this, 'action_id')} />
      </div>
    )
  }
})
