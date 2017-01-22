var React = require('react');
var _ = require('underscore');
// var lodash = require('lodash');
var actions = require('../../modules/actions');
var Select = require('react-select');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      services: [],
      serviceOptions: []
    };
  },
  getDefaultProps: function() {
    return {
      creatable: false,
      value: [],
      onChange: (services) => { console.log('change services', services); },
      label: "Services"
    };
  },
  handleChange: function(selection) {
    var selectedIDs = _.pluck(selection, 'value');
    var services = _.filter(this.state.services, (service) => {
      return selectedIDs.indexOf(service.id) !== -1;
    });
    this.props.onChange(services);
  },
  componentDidMount: function() {
    console.log('loading options for service');
    return actions.getServices()
    .then(result => {
      var serviceOptions = _.map(result.services, (service) => ({
        value: service.id,
        label: service.name
      }));
      this.setState({
        services: result.services,
        serviceOptions: serviceOptions
      });
    });
  },
  render() {
    var value = _.map(this.props.value, (service) => {
      return {value: service.id, label: service.name};
    });

    return <label className="pt-label pt-inline">
      {this.props.label}
      <Select
        name="service-multi-select"
        multi={true}
        value={value}
        options={this.state.serviceOptions}
        onChange={this.handleChange}
      />
    </label>;
  }
});
