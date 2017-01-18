var React = require('react');
// var lodash = require('lodash');
var Select = require('react-select');
var TextInputField = require('../inputs/text_input_field');

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      value: {},
      onChange: (parameters) => { console.log('params changed', parameters); }
    };
  },
  handleChange: function(field, selection) {
    var triggerInfo = this.props.value;
    triggerInfo[field] = selection.value;
    console.log('trigger info', triggerInfo);
    this.props.onChange(triggerInfo);
  },
  render() {
    var triggerTypes = [
      {value: 'cron', label: 'Scheduled'}
    ];
    var cronOptions = [
      {value: '0 0 12 1/1 * ? *', label: 'Daily'},
      {value: '0 0 0/1 1/1 * ? *', label: 'Hourly'},
      {value: '0 0/30 * 1/1 * ? *', label: 'Every 30 Minutes'},
      {value: '0 0/15 * 1/1 * ? *', label: 'Every 15 Minutes'},
    ];
    return <div>
      Trigger info
      <Select options={triggerTypes} value={this.props.value.type} onChange={this.handleChange.bind(this, 'type')} />
      { this.props.value.type == 'cron' &&
        <Select options={cronOptions}
          value={this.props.value.value}
          onChange={this.handleChange.bind(this, 'value')} />
      }
    </div>;
  }
});
