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
  handleChange: function(field, e) {
    var pricingInfo = this.props.value;
    if (e.target) {
      pricingInfo[field] = e.target.value;
    } else if (e.value) {
      pricingInfo[field] = e.value;
    } else {
      pricingInfo[field] = e;
    }
    this.props.onChange(pricingInfo);
  },
  render() {
    return <div>
      <TextInputField label="Upfront Fee" value={this.props.value.upfront} onChange={this.handleChange.bind(this, 'upfront')} />
      <TextInputField label="Monthly Fee" value={this.props.value.monthly} onChange={this.handleChange.bind(this, 'monthly')} />
      <TextInputField label="Hourly rate (for support)" value={this.props.value.hourly} onChange={this.handleChange.bind(this, 'hourly')} />
    </div>
  }
})
