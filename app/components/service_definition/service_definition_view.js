var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var ServiceDefinitionSchema = require('./service_definition_schema');
var TextInputField = require('../inputs/text_input_field');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      serviceDefinition: {},
      service: {},
      readOnly: false,
      onChange: function(serviceDefinition) { console.log('service auth changed', serviceDefinition); }
    }
  },
  handleChange: function(field, e) {
    console.log('change', field, e);
    var serviceDefinition = this.props.serviceDefinition;
    if (e.target) {
      serviceDefinition[field] = e.target.value;
    } else if (e.value) {
      serviceDefinition[field] = e.value;
    } else {
      serviceDefinition[field] = e;
    }
    this.props.onChange(serviceDefinition);
  },
  render() {
    var self = this;
    return (
      <div>
          <div className="row">
            <div className="col-xs">
              <TextInputField label="Service" value={this.props.service.name} />
            </div>
            <div className="col-xs">
              <TextInputField label="Name" value={this.props.serviceDefinition.name}
                                           onChange={this.handleChange.bind(self, 'name')} />
            </div>
            <div className="col-xs-3">
              <label className="pt-label">
              Schema
                <ServiceDefinitionSchema
                  definition={this.props.serviceDefinition.definition}
                  onChange={this.handleChange.bind(self, 'definition')}
                 />
              </label>
            </div>
            <div className="col-xs-3">
              {this.props.children}
            </div>
          </div>
      </div>
    );
  }
})
