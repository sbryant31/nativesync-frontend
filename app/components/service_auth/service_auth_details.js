var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var ServiceAuthConfigurationDetails = require('./service_auth_configuration_details');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      type: '',
      details: {},
      readOnly: false
    }
  },
  render() {
    var self = this;
    return <div>
      Type: {this.props.type}
      { this.props.type == 'configuration' &&
        <ServiceAuthConfigurationDetails details={this.props.details} readOnly={this.props.readOnly} />
      }
    </div>
  }
})
