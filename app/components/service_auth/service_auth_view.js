var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var ServiceAuthDetails = require('./service_auth_details');
var TextInputField = require('../inputs/text_input_field');
var EnvironmentSelector = require('../inputs/environment_selector');

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
    var checkboxHandler = this.props.isSelected ? this.props.onDeselect : this.props.onSelect;
    var checked = this.props.isSelected ? true : false;
        //<Checkbox onChange={checkboxHandler} checked={checked} />
    return (
        <div>
            <div className="row">
              <div className="col-xs">
               <input type="checkbox" checked={checked} onChange={checkboxHandler} />
              </div>
              <div className="col-xs">
                <TextInputField label="Service" value={this.props.service.name} />
              </div>
              <div className="col-xs">
                <TextInputField label="Name" value={this.props.serviceAuth.name}
                                             onChange={this.handleChange.bind(self, 'name')} />
              </div>
              <div className="col-xs">
                <EnvironmentSelector value={this.props.serviceAuth.environment} onChange={this.handleChange.bind(self, 'environment')} />
              </div>
              <div className="col-xs-3">
                <ServiceAuthDetails type={this.props.serviceAuth.type}
                                    details={this.props.serviceAuth.details}
                                    readOnly={self.props.readOnly}
                                    onTypeChange={this.handleChange.bind(self, 'type')}
                                    onDetailsChange={this.handleChange.bind(self, 'details')} />
              </div>
              <div className="button-container">
                  { this.props.children }
              </div>
            </div>
        </div>
    );
  }
})
