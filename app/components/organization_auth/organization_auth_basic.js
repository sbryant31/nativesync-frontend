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
      value: {},
      onChange: function(values) { console.log('values changed', values); },
      readOnly: false
    }
  },
  handleChange: function(field, e) {
    var value = this.props.value;
    if (e.target) {
      value[field] = e.target.value;
    } else if (e.value) {
      value[field] = e.value;
    } else {
      value[field] = e;
    }
    this.props.onChange(value);
  },
  render() {
    var self = this;
    return <div>
      <label className="pt-label pt-inline">
        <TextInputField label={this.props.details.usernameFieldLabel} value={this.props.value.username} onChange={this.handleChange.bind(this, 'username')} />
        <TextInputField label={this.props.details.passwordFieldLabel} value={this.props.value.password} onChange={this.handleChange.bind(this, 'password')} />
      </label>
    </div>
  }
})
