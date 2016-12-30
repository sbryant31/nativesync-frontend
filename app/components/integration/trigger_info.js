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
  handleChange: function(field, selection) {
    var triggerInfo = this.props.value;
    triggerInfo[field] = selection.value;
    this.props.onChange(triggerInfo);
  },
  render() {
    var triggerTypes = [
      {value: 'cron', label: 'Scheduled'}
    ];
    return <div>
      Trigger info
      <Select options={triggerTypes} value={this.props.value.type} onChange={this.handleChange.bind(this, 'type')} />
      <TextInputField label="Cron" value={this.props.value.value} onChange={this.handleChange.bind(this, 'value')} />
    </div>
  }
})
