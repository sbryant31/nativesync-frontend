var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      service: {},
      value: {},
      onChange: function(serviceDefinitions) {console.log('service auths change', serviceDefinitions)},
      readOnly: false,
    }
  },
  getInitialState: function() {
    return {
      serviceDefinitions: {},
			serviceDefinitionOptions: []
    };
  },
  componentDidMount: function() {
		var self = this;
    return actions.getServiceDefinitions(this.props.service.id)
    .then((result) => {
      var serviceDefinitionOptions = _.map(result.serviceDefinitions, (serviceDefinition) => {
        return { value: serviceDefinition.id, label: serviceDefinition.name}
      })
      self.setState({
        serviceDefinitions: _.indexBy(result.serviceDefinitions, 'id'),
        serviceDefinitionOptions: serviceDefinitionOptions
      })
    });
  },
  render() {
   var self = this;
    return <label className="pt-label pt-inline col-xs">
			Object Definition
      <Select
        name="serviceDefinition-selector"
        value={this.props.value}
        options={this.state.serviceDefinitionOptions}
        onChange={this.props.onChange.bind(self)}
      />
    </label>
  }
})
