var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filter: {},
      integrations: [],
      selectedIntegrationId: null,
      integrationInstances: []
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
    actions.getIntegrations(this.state.filter)
    .then(function(result) {
      self.setState({
        integrations: result.integrations
      });
    })
  },
  handleGetIntegrationInstances: function(integrationId) {
    var self = this;
    self.setState({selectedIntegrationId: integrationId});
    actions.getIntegrationInstances(integrationId)
    .then(function(result) {
      console.log('got instances', result);
      self.setState({integrationInstances: result.integrationInstances});
    })
  },
  render() {
    var self = this;
    var integrationsList = lodash.map(self.state.integrations,function(integration){
      var instances = '';
      if (self.state.selectedIntegrationId == integration.id) {
        instances = lodash.map(self.state.integrationInstances, function(instance) {
          return <div className="row">
            <a onClick={actions.goto.bind(null, '/integration_instance/' + instance.id)}>{instance.organization.name} {instance.title}</a>
          </div>
        });
      }
      return (
        <tr key={integration.id}>
          <td><a onClick={actions.goto.bind(null, '/integration/' + integration.id)}>{integration.title}</a></td>
          <td>{integration.description}</td>
          <td>
            <div className="row">
              <span className="pt-icon-double-chevron-down" onClick={self.handleGetIntegrationInstances.bind(self, integration.id)} />
            </div>
            {instances}
          </td>
          <td>
            <span className="pt-icon-add" onClick={actions.goto.bind(self, `/integration/${integration.id}/instance/new`)} />
          </td>
        </tr>
      )
    })
    console.log('list', integrationsList);
    return <div>
      <h1>Integrations</h1>
      <a onClick={actions.goto.bind(null, '/integration/new')}>New Integration</a>
      <hr/>
      <table className="pt-table pt-striped">
        <thead>
        <tr>
           <th>Title</th>
           <th>Description</th>
           <th>Managed Instances</th>
           <th>New Instance</th>
        </tr>
        </thead>
        <tbody>
          {integrationsList}
        </tbody>
      </table>
    </div>
  }
})

