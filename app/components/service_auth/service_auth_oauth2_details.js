var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var TextInputField = require('../inputs/text_input_field');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      details: {},
      onChange: function(details) { console.log('details changed', details); },
      readOnly: false
    }
  },
  handleChange: function(field, e) {
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
    return <div>
      <label className="pt-label pt-inline">
        <TextInputField label="Client ID" value={this.props.details.clientID} onChange={this.handleChange.bind(this, 'clientID')} />
        <TextInputField label="Client Secret" value={this.props.details.clientSecret} onChange={this.handleChange.bind(this, 'clientSecret')} />
        <TextInputField label="Authorize URL" value={this.props.details.authorizeUrl} onChange={this.handleChange.bind(this, 'authorizeUrl')} />
        <div>Typically https://api.example.com/oauth/authorize</div>
        <TextInputField label="Access Token Url" value={this.props.details.accessTokenUrl} onChange={this.handleChange.bind(this, 'accessTokenUrl')} />
        <div>Typically https://api.example.com/oauth/access_token</div>
        <TextInputField label="Scopes (optional)" value={this.props.details.scopes} onChange={this.handleChange.bind(this, 'accessTokenUrl')} />
        <div>Check with API provider docs to see if scopes should be comma or space separated.</div>
        <TextInputField label="Callback URL" value="https://api.nativesync.io/tools/oauth/callback" />
        <div>Enter this in the application settings with your API provider.</div>
      </label>
    </div>
  }
})
