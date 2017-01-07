var React = require('react');
var actions = require('../../modules/actions');

module.exports = React.createClass({
  getInitialState: function() {
    return { };
  },
  getDefaultProps: function() {
    return {
      integrations: [],
    };
  },
  render() {
    var integrationsList = this.props.integrations.map((integration) => {
      var services = integration.Services.map((service) => {
        return (
          <div>
            {service.name} <img src={service.logo_url} style={{height: 50, width: 50}} />
          </div>
        );
      });
      return (
        <tr key={integration.id}>
          <td>{integration.organization.name}</td>
          <td>
            <a onClick={() => { actions.goto('/integration/' + integration.id); }}>
              {integration.title}
            </a>
          </td>
          <td>{integration.description}</td>
          <td>{integration.version}</td>
          <td>{services}</td>
          <td>{JSON.stringify(integration.pricing)}</td>
        </tr>
      );
    });
    return <div>
      <span>Dont see what you need?{" "}
        <a onClick={() => { actions.goto('/marketplace/request'); }}>
          Request a custom integration!
        </a>
      </span>
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
    </div>;
  }
});
