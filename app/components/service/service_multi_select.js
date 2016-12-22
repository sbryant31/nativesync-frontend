var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var actions = require('../../modules/actions');
var Select = require('react-select');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      services: [],
    }
  },
  getDefaultProps: function() {
    return {
      value: [],
      onChange: (services) => { console.log('change services', services) }
    }
  },
  handleChange: function(selection) {
		var selectedIDs = _.pluck(value, 'value');
    var services = _.filter(this.state.services, (service) => {
      return selectedIDs.indexOf(service.id) !== -1;
    })
    this.props.onChange(services);
  },
  componentDidMount: function() {
    console.log('loading options for service');
    var self = this;
    return actions.getServices()
    .then(function(services) {
      self.setState({services: services});
      var serviceOptions = _.map(services, (service) => {
        return {value: service.id, label: service.name}
      })
			self.setState({serviceOptions: serviceOptions})
    })
  },
  render() {
    var self = this;
		var value = _.map(self.props.value, (service) => {
			return {value: service.id, label: service.name};
		})
    return <label className="pt-label pt-inline col-xs">
      Service
      <Select
        name="service-multi-select"
        value={value}
        options={this.state.serviceOptions}
        onChange={this.handleChange}
      />
    </label>
  }
})
