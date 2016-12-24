var React = require('react');
var lodash = require('lodash');
var Select = require('react-select');

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      value: '',
      onChange: (parameters) => { console.log('params changed', parameters); },
      readOnly: false
    }
  },
  handleChange: function(selection) {
    console.log('params thing handling change', selection);
    if (!this.props.readOnly) {
      this.props.onChange(selection.value);
    }
  },
  render() {
    var self = this;
    var parameterInLocations = [
      {value: 'query', label: 'Query'},
      {value: 'header', label: 'Header'},
      {value: 'body', label: 'Body'},
      {value: 'path', label: 'Path'},
      {value: 'host', label: 'Host'},
      {value: 'formData', label: 'Form Data'},
    ];
    return (
      <Select options={parameterInLocations} value={this.props.value} onChange={self.handleChange} />
    )
  }
})
