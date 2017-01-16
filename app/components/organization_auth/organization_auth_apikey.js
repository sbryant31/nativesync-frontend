var React = require('react');
var TextInputField = require('../inputs/text_input_field');

class OrganizationAuthAPIKey extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(ev) {
    this.props.onChange(ev.target.value);
  }

  render() {
    return <TextInputField
        label={"Api Key"}
        defaultValue={this.props.value.apiKeyValue}
        onChange={this.handleChange.bind(this)}
      />
  }
}
OrganizationAuthAPIKey.defaultProps = {
  details: {},
  value: {},
  onChange: (value) => { console.log('valuechanged', value); },
  readOnly: false
};
module.exports = OrganizationAuthAPIKey;
