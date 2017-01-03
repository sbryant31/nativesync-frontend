var React = require('react');
// var _ = require('underscore');
// var lodash = require('lodash');
var Select = require('react-select');
// var actions = require('../../modules/actions');
var ServiceAuthConfigurationDetails = require('./service_auth_configuration_details');
var ServiceAuthApikeyDetails = require('./service_auth_apikey_details');
var ServiceAuthBasicDetails = require('./service_auth_basic_details');
var ServiceAuthOauth2Details = require('./service_auth_oauth2_details');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      type: '',
      details: {},
      onTypeChange: function(type) { console.log('type changed', type); },
      onDetailsChange: function(details) { console.log('details changed', details); },
      readOnly: false
    }
  },
  handleTypeChange: function(type) {
    this.props.onTypeChange(type);
    // reset details object
    this.props.onDetailsChange({});
  },
  render() {
    var self = this;
    var types = [
      {value: 'basic', label: 'Basic'},
      {value: 'apiKey', label: 'API Key'},
      {value: 'configuration', label: 'Configuration Parameters'},
      {value: 'oauth2', label: 'Oauth 2.0'},
    ];
    console.log('rendering details for', this.props);
    return <div>
      <Select options={types} value={this.props.type} onChange={self.handleTypeChange} />
      { this.props.type == 'configuration' &&
        <ServiceAuthConfigurationDetails details={this.props.details} readOnly={this.props.readOnly} onChange={self.props.onDetailsChange} />
      }
      { this.props.type == 'apiKey' &&
        <ServiceAuthApikeyDetails details={this.props.details} readOnly={this.props.readOnly} onChange={self.props.onDetailsChange} />
      }
      { this.props.type == 'basic' &&
        <ServiceAuthBasicDetails details={this.props.details} readOnly={this.props.readOnly} onChange={self.props.onDetailsChange} />
      }
      { this.props.type == 'oauth2' &&
        <ServiceAuthOauth2Details details={this.props.details} readOnly={this.props.readOnly} onChange={self.props.onDetailsChange} />
      }
    </div>
  }
})
