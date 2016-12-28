var React = require('react');
var lodash = require('lodash');
var Select = require('react-select');
var TextInputField = require('../inputs/text_input_field');

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      value: {},
      onChange: (parameters) => { console.log('params changed', parameters); }
    }
  },
  handleChange: function(field) {
    var pricingInfo = this.props.value;
    pricingInfo[field] = selection.value;
    this.props.onChange(pricingInfo);
  },
  render() {
    return <div>
      <TextInputField label="Upfront Fee" value={this.props.value.upfront} onChange={this.handleChange.bind('upfront')} />
      <TextInputField label="Monthly Fee" value={this.props.value.monthly} onChange={this.handleChange.bind('monthly')} />
      <TextInputField label="Hourly rate (for support)" value={this.props.value.hourly} onChange={this.handleChange.bind('hourly')} />
    </div>
  }
})
