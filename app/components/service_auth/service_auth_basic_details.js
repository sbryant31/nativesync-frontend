var React = require('react');
// var _ = require('underscore');
// var lodash = require('lodash');
// var Select = require('react-select');
// var actions = require('../../modules/actions');
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
        <TextInputField label="Username Field Label" value={this.props.details.usernameFieldLabel} onChange={this.handleChange.bind(this, 'usernameFieldLabel')} />
        <TextInputField label="Password Field Label" value={this.props.details.passwordFieldLabel} onChange={this.handleChange.bind(this, 'passwordFieldLabel')} />
      </label>
    </div>
  }
})
