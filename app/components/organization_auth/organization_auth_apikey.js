var React = require('react');
var TextInputField = require('../inputs/text_input_field');

module.exports = React.createClass({
  getDefaultProps() {
    return {
      details: {},
      value: {},
      onChange: (value) => { console.log('valuechanged', value); },
      readOnly: false
    };
  },

  handleChange(e, field = 'apiKeyValue') {
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
    return <div>
      <TextInputField
        label={"Api Key"}
        value={this.props.value.apiKeyValue}
        onChange={this.handleChange}
      />
    </div>;
  }
});
