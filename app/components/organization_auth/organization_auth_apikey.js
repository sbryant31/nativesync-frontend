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
      onChange: function(value) { console.log('valuechanged', value); },
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
      <TextInputField label={"Api Key"} value={self.props.value.apiKeyValue} onChange={self.handleChange.bind(self, 'apiKeyValue')} />
    </div>
  }
})
