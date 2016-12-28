var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filter: {},
      services: [],
      selectedServiceId: null,
      serviceInstances: []
    }
  },
  getDefaultProps: function() {
    return {
      initialFilter: {},
      showInstances: false,
    }
  },
  componentDidMount: function() {
    var self = this;
    self.setState({filter: this.props.initialFilter})
    actions.getServices(this.state.filter)
    .then(function(result) {
      self.setState({
        services: result.services
      });
    })
  },
  render() {
    var self = this;
    var servicesList = lodash.map(self.state.services,function(service){
      var instances = '';
      if (self.state.selectedServiceId == service.id) {
        instances = lodash.map(self.state.serviceInstances, function(instance) {
          return <div className="row">
            <a onClick={actions.goto.bind(null, '/service_instance/' + instance.id)}>{instance.organization.name} {instance.title}</a>
          </div>
        });
      }
      return (
        <tr key={service.id}>
          <td><a onClick={actions.goto.bind(null, '/service/' + service.id)}>{service.name}</a></td>
        </tr>
      )
    })
    return <div>
      <h1>Services</h1>
      <a onClick={actions.goto.bind(null, '/service/new')}>New Service</a>
      <hr/>
      <table className="pt-table pt-striped">
        <thead>
        <tr>
           <th>Name</th>
        </tr>
        </thead>
        <tbody>
          {servicesList}
        </tbody>
      </table>
    </div>
  }
})

