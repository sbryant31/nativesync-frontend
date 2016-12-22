var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var actions = require('../../modules/actions');
var Select = require('react-select');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      services: {},
    }
  },
  getDefaultProps: function() {
    return {
      service: {},
      onChange: (service) => { console.log('change service', service) }
    }
  },
  handleChange: function(selection) {
    this.props.onChange(this.state.services[selection.value]);
  },
  loadOptions: function(input, callback) {
    console.log('loading options for service');
    var self = this;
    return actions.getServices()
    .then(function(services) {
      self.setState({services: _.indexBy(services, 'id')})
      var services = _.map(services, (service) => {
        return {value: service.id, label: service.name}
      })
      return {
        options: services
      };
    })
  },
  render() {
    var self = this;
    return <label className="pt-label pt-inline col-xs">
      Service
      <Select.Async
        name="service-selector"
        value={this.props.service ? this.props.service.id : null}
        loadOptions={this.loadOptions}
        onChange={this.handleChange}
      />
    </label>
  }
})
