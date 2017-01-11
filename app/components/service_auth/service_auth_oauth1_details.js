var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var TextInputField = require('../inputs/text_input_field');
var Guid = require('guid')

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      details: {callbackId: Guid.raw()},
      onChange: function(details) { console.log('details changed', details); },
      readOnly: false
    }
  },
  handleChange: function(field, e) {
    var details = this.props.details;
    if (!details.callbackId) {
      details.callbackId = Guid.raw();
    }

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
   var callbackUrl = `api.nativesync.io/oauth/${this.props.details.callbackId}`;
   var signatureMethodOptions = [
      {label: 'HMAC-SHA1', value: 'HMAC-SHA1'},
      {label: 'HMAC-SHA256', value: 'HMAC-SHA256'},
    ];
    return <div>
      <label className="pt-label pt-inline">
        <TextInputField label="Consumer Key" value={this.props.details.consumerKey} onChange={this.handleChange.bind(this, 'consumerKey')} />
        <TextInputField label="Consumer Secret" value={this.props.details.consumerSecret} onChange={this.handleChange.bind(this, 'consumerSecret')} />
        <TextInputField label="Request Token URL" value={this.props.details.requestTokenUrl} onChange={this.handleChange.bind(this, 'requestTokenUrl')} />
        <TextInputField label="Access Token Request URL" value={this.props.details.accessTokenRequestUrl} onChange={this.handleChange.bind(this, 'accessTokenRequestUrl')} />
        <TextInputField label="Auth URL" value={this.props.details.authUrl} onChange={this.handleChange.bind(this, 'authUrl')} />
        <label className="pt-label">
          Signature Method
          <Select value={this.props.details.signatureMethod} onChange={this.handleChange.bind(this, 'signatureMethod')} options={signatureMethodOptions} name="select-signaturemethod" />
        </label>
      </label>
      { this.props.details.callbackId &&
        <label className="pt-label">
          Callback Url:
          <input type="pt-text" value={callbackUrl} readOnly={true} />
        </label>
      }
    </div>
  }
})
