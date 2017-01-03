var React = require('react');
// var _ = require('underscore');
// var lodash = require('lodash');
// var Select = require('react-select');
// var actions = require('../../modules/actions');
var ParameterInSelector = require('../action/parameter_in_selector');
var TextInputField = require('../inputs/text_input_field');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      details: {},
      onChange: function(details) { console.log('details changed', details); },
      readOnly: false
    }
  },
  handleChange: function(field, e) {
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
    return <div>
      <label className="pt-label pt-inline">
        In <ParameterInSelector onChange={this.handleChange.bind(this, 'in')} value={this.props.details.in} />
        <TextInputField label="Field Name" value={this.props.details.name} onChange={this.handleChange.bind(this, 'name')} />
      </label>
    </div>
  }
})
