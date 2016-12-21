var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var actions = require('../../modules/actions');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      services: [],
    }
  },
  getDefaultProps: function() {
    return {
      service: {}
    }
  },
  componentDidMount: function() {
    var self = this;
    actions.getServices()
    .then(function(services) {
      self.setState({services: services})
    })
  },
  render() {
    var self = this;
    var services = lodash.map(this.state.services, function(service) {
      return <option value={service.id} key={service.id}>
               {service.name}
      </option>
    });
    return <label className="pt-label pt-inline col-xs">
      Service
      <select value={this.props.service.id}>
        {services}
      </select>
    </label>
  }
})
