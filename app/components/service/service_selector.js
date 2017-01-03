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
    if (selection == null) {
      this.props.onChange(null);
    } else {
      this.props.onChange(this.state.services[selection.value]);
    }
  },
  componentDidMount: function() {
    console.log('loading options for service');
    var self = this;
    return actions.getServices()
    .then(function(result ) {
      self.setState({services: _.indexBy(result.services, 'id')})
      var serviceOptions = _.map(result.services, (service) => {
        return {value: service.id, label: service.name}
      })
      self.setState({serviceOptions: serviceOptions})
    })
  },
  render() {
    var self = this;
    return <label className="pt-label pt-inline col-xs">
      Service
      <Select
        name="service-selector"
        value={this.props.service ? this.props.service.id : null}
        options={this.state.serviceOptions}
        onChange={this.handleChange}
      />
    </label>
  }
})
