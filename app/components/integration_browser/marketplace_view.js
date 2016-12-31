var React = require('react')
var actions = require('../../modules/actions')
var Navbar = require('../../components/navbar')
var lodash = require('lodash')
var _ = require('underscore');

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
    console.log(self.props.integrations);
    var integrationsList = lodash.map(self.props.integrations, function(integration){
      var services = _.map(integration.Services, function(service) {
        return (<div>
            {service.name} <img src={service.logo_url} style={{height: 50, width: 50}} />
          </div>
        )
      });
      return (
        <tr key={integration.id}>
          <td>{integration.organization.name} <img src={integration.organization.logo_url} style={{height: 50, width: 50}} /></td>
          <td><a onClick={actions.goto.bind(null, '/integration/' + integration.id)}>{integration.title}</a></td>
          <td>{integration.description}</td>
          <td>{integration.version}</td>
          <td>{services}</td>
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
           <th>Services</th>
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

