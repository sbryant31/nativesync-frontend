var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var ServiceDefinitionView = require('../service_definition/service_definition_view');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      serviceDefinitions: [],
      service: {},
      onChange: function(serviceDefinitions) {console.log('service auths change', serviceDefinitions)},
      readOnly: false,
    }
  },
  handleChange: function(index, serviceDefinition) {
    var self = this;
    var serviceDefinitions = self.props.serviceDefinitions;
    serviceDefinitions[index] = serviceDefinition;
    self.props.onChange(serviceDefinitions);
  },
  handleAdd: function() {
    var self = this;
    var serviceDefinitions = self.props.serviceDefinitions;
    serviceDefinitions.push({});
    self.props.onChange(serviceDefinitions);
  },
  handleRemove: function(index) {
    var self = this;
    var serviceDefinitions = self.props.serviceDefinitions;
    serviceDefinitions.splice(index, 1);
    self.props.onChange(serviceDefinitions);
  },
  render() {
    var self = this;
    var serviceDefinitionList = lodash.map(self.props.serviceDefinitions, (serviceDefinition, index) => {
      return (
          <div>
            <ServiceDefinitionView
              service={self.props.service}
              serviceDefinition={serviceDefinition}
              onChange={self.handleChange.bind(self, index)}
            >
              {!self.props.readOnly &&
                <div className="col-xs">
                  <button className="pt-button" onClick={self.handleRemove.bind(self, index)}>Remove</button>
                </div>
              }
            </ServiceDefinitionView>
          </div>
      );
    })
    return (
        <div>
            <div>
                { serviceDefinitionList }
            </div>
            <div className="row">
                { !self.props.readOnly &&
                    <button className="pt-button" onClick={self.handleAdd.bind(self)}>Add</button>
                }
            </div>
        </div>
    );
  }
})
