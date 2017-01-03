var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filter: {},
      integrationInstances: []
    }
  },
  getDefaultProps: function() {
    return {
      initialFilter: {},
    }
  },
  componentDidMount: function() {
    var self = this;
    self.setState({filter: this.props.initialFilter})
    var org = actions.getState('org');
    actions.getIntegrationInstancesForOrg(org.id)
    .then(function(result) {
      self.setState({
        integrationInstances: result.integrationInstances
      });
    })
  },
  render() {
    var self = this;
    var integrationInstancesList = lodash.map(self.state.integrationInstances,function(integrationInstance){
      return (
        <tr key={integrationInstance.id}>
          <td><a onClick={actions.goto.bind(null, '/integration_instance/' + integrationInstance.id)}>{integrationInstance.title ? integrationInstance.title : 'untitled'}</a></td>
        </tr>
      )
    })
    return <div>
      <h1>Integrations</h1>
      <hr/>
      <table className="pt-table pt-striped">
        <thead>
        <tr>
           <th>Title</th>
        </tr>
        </thead>
        <tbody>
          {integrationInstancesList}
        </tbody>
      </table>
    </div>
  }
})

