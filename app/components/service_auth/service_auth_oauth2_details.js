var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var TextInputField = require('../inputs/text_input_field');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      id: null,
      details: {},
      onChange: function(details) { console.log('details changed', details); },
      readOnly: false
    }
  },
  handleChange: function(field, e) {
    console.log('changing', field, e);
    var details = this.props.details;
    if (e.target) {
      details[field] = e.target.value;
    } else if (e.value) {
      details[field] = e.value;
    } else {
      details[field] = e;
    }
    console.log('changing type to', details, field, e);
    this.props.onChange(details);
  },
  render() {
    var self = this;
    var tokenLocationOptions = [
      {label: 'Token in Header', value: 'header'},
      {label: 'Token in Query Strings', value: 'query'},
    ];
    if (this.props.id) {
      var callbackUrl = `https://api.nativesync.io/oauth/callback/2.0/${this.props.serviceAuth.id}/org/${this.props.organization.id}`
    } else {
      var callbackUrl = "will be generated upon saving"
    }
    return <div>
      <label className="pt-label pt-inline">
        <TextInputField label="Client ID" value={this.props.details.clientId} onChange={this.handleChange.bind(this, 'clientId')} />
        <TextInputField label="Client Secret" value={this.props.details.clientSecret} onChange={this.handleChange.bind(this, 'clientSecret')} />
        <TextInputField label="Secret Param Name (defaults to client_secret)" value={this.props.details.secretParamName} onChange={this.handleChange.bind(this, 'secretParamName')} />
        <TextInputField label="ID Param Name (defaults to client_id)" value={this.props.details.idParamName} onChange={this.handleChange.bind(this, 'idParamName')} />
        <TextInputField label="Token Host" value={this.props.details.tokenHost} onChange={this.handleChange.bind(this, 'tokenHost')} />
        <TextInputField label="Token Path (defaults to /oauth/token)" value={this.props.details.tokenPath} onChange={this.handleChange.bind(this, 'tokenPath')} />
        <TextInputField label="Revoke Path (defaults to /oauth/revoke)" value={this.props.details.revokePath} onChange={this.handleChange.bind(this, 'revokePath')} />
        <TextInputField label="Authorize Host (defaults to Token Host)" value={this.props.details.authorizeHost} onChange={this.handleChange.bind(this, 'authorizeHost')} />
        <TextInputField label="Authorize Path (defaults to /oauth/authorize)" value={this.props.details.authorizePath} onChange={this.handleChange.bind(this, 'authorizePath')} />
        <TextInputField label="Scopes (comma separated)" value={this.props.details.scopes} onChange={this.handleChange.bind(this, 'scopes')} />
        <Select name="token-location-selector" options={tokenLocationOptions} value={this.props.details.tokenLocation ? this.props.details.tokenLocation : 'header'} onChange={this.handleChange.bind(this, 'tokenLocation')} />
        <div>
        <TextInputField label="Callback URL" value={callbackUrl} />
        </div>
      </label>
    </div>
  }
})
