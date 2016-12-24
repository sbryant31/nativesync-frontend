var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var ServiceAuthDetails = require('./service_auth_details');
var TextInputField = require('../inputs/text_input_field');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      serviceAuth: {},
      service: {},
      selected: false,
      readOnly: false,
      onChange: function(serviceAuth) { console.log('service auth changed', serviceAuth); }
    }
  },
  handleChange: function(field, e) {
    var serviceAuth = this.props.serviceAuth;
    if (e.target) {
      serviceAuth[field] = e.target.value;
    } else if (e.value) {
      serviceAuth[field] = e.value;
    } else {
      serviceAuth[field] = e;
    }
    this.props.onChange(serviceAuth);
  },
  render() {
    var self = this;
    return <div className="row">
      <div className="col-xs">
        { this.props.isSelected && <span className="pt-icon-confirm" /> }
      </div>
      <div className="col-xs">
        <TextInputField label="Service" value={this.props.service.name} />
      </div>
      <div className="col-xs">
        <TextInputField label="Name" value={this.props.serviceAuth.name} onChange={this.handleChange.bind(self, 'name')} />
      </div>
      <div className="col-xs-3">
        <ServiceAuthDetails type={this.props.serviceAuth.type} details={this.props.serviceAuth.details} readOnly={self.props.readOnly} onTypeChange={this.handleChange.bind(self, 'type')} onDetailsChange={this.handleChange.bind(self, 'details')} />
      </div>
      { this.props.children }
    </div>
  }
})
