var React = require('react')
var actions = require('../../modules/actions')
var Navbar = require('../../components/navbar')
var lodash = require('lodash')

module.exports = React.createClass({
  getInitialState: function() {
    return { }
  },
  getDefaultProps: function() {
    return {
      integrations: [],
    }
  },
  render() {
    var self = this;
    var integrationsList = lodash.map(self.props.integrations,function(integration){
      return (
        <tr key={integration.id}>
          <td>{integration.organization_id}</td>
          <td><a onClick={actions.goto.bind(null, '/integration/' + integration.id)}>{integration.title}</a></td>
          <td>{integration.description}</td>
          <td>{integration.version}</td>
          <td>{JSON.stringify(integration.pricing)}</td>
        </tr>
      )
    })
    return <div>
      <h1>Integration Marketplace</h1>
      <span>Dont see what you need? <a onClick={actions.goto.bind(null, '/marketplace/request')}>Request a custom integration!</a></span>
      <hr/>
      <table className="pt-table pt-striped">
        <thead>
        <tr>
           <th>Built By</th>
           <th>Title</th>
           <th>Description</th>
           <th>Version</th>
           <th>Cost*</th>
        </tr>
        </thead>
        <tbody>
          {integrationsList}
        </tbody>
      </table>
      <span>*Costs do not include platform fees which may incur from usage</span>
    </div>
  }
})

