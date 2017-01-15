var React = require('react');
var TextInputField = require('../inputs/text_input_field');

class OrganizationAuthAPIKey extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field = 'apiKeyValue', e) {
    var value = this.props.value;
    if (e.target) {
      value[field] = e.target.value;
    } else if (e.value) {
      value[field] = e.value;
    } else {
      value[field] = e;
    }
    this.props.onChange(value);
  }

  render() {
    return <div>
      <TextInputField
        label={"Api Key"}
        value={this.props.value.apiKeyValue}
        onChange={this.handleChange.bind(this, 'apiKeyValue')}
      />
    </div>;
  }
}
OrganizationAuthAPIKey.defaultProps = {
  details: {},
  value: {},
  onChange: (value) => { console.log('valuechanged', value); },
  readOnly: false
};
module.exports = OrganizationAuthAPIKey;
