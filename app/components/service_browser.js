var React = require('react');
var actions = require('../modules/actions');
// var Navbar = require('../components/navbar');
var _ = require('underscore');
var lodash = require('lodash');
import {Position,Popover} from "@blueprintjs/core"
var Iframe = require('react-iframe');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filter: {},
      filteredServices: {},
      services: [],
      serviceInstances: []
    };
  },
  getDefaultProps: function() {
    return {
      initialFilter: {},
      showInstances: false,
    };
  },
  componentDidMount: function() {
    var self = this;
    self.setState({filter: this.props.initialFilter});
    actions.getServices(this.state.filter)
    .then(function(result) {
      self.setState({
        services: result.services,
        filteredServices: result.services
      });
    });
  },
  handleFilterChange: function(field, e) {
    var filter = this.state.filter;
    let value;
    if (e.target) {
      value = e.target.value;
    } else if (e.value) {
      value = e.value;
    } else {
      value = e;
    }
    if (value) {
      filter[field] = value.toLowerCase();
    } else {
      delete filter[field];
    }

    this.setState({filter: filter});
    var filteredServices = _.filter(this.state.services, (service) => {
      var match = true;
      _.each(filter, (value, key) => {
        if (service[key].toLowerCase().indexOf(value) === -1) {
          match = false;
        }
      });
      return match;
    });
    this.setState({filteredServices: filteredServices});
  },
  render() {
    var self = this;
    var servicesList = lodash.map(self.state.filteredServices, function(service){
      var documentationUrl = `https://swagger-ui.aerobatic.io/?url=https://api.nativesync.io/docs/service/${service.id}/swagger.json`;
      return (
        <tr key={service.id}>
          <td><a onClick={actions.goto.bind(null, '/service/' + service.id)}><img src={service.logo_url} style={{height: 50, width: 50}} /> {service.name}</a></td>
          <td>
            <a href={documentationUrl} target="new">
              <button className="pt-button">Action API Documentation</button>
            </a>
          </td>
        </tr>
      );
    });
    return <div>
      <h1>Services</h1>
      <a onClick={actions.goto.bind(null, '/service/new')}>New Service</a>
      <hr />
      <label className="pt-label">
        Name <input className="pt-input" value={this.state.filter.name} onChange={this.handleFilterChange.bind(this, 'name')} />
      </label>
      <hr/>
      <table className="pt-table pt-striped">
        <tbody>
          {servicesList}
        </tbody>
      </table>
    </div>;
  }
});
