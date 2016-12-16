var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      view: 'all',
      filter: {},
      integrations: []
    }
  },
  componentDidMount: function() {
    var self = this;
    actions.getIntegrations(this.state.filter)
    .then(function(result) {
      self.setState({integrations: result});
    })
  },
  render() {
    var integrationsList = lodash.map(this.state.integrations,function(integration){
      return <tr key={integration.id}>
        <td><a onClick={actions.goto.bind(null, '/integration/' + integration.id)}>{integration.title}</a></td>
        <td>{integration.description}</td>
      </tr>
    })
    return <div>
      <h1>Integrations</h1>
      { this.state.mode == 'partner' &&
        <a onClick={actions.goto.bind(null, '/integration/new')}>New Integration</a>
      }
      <hr/>
      <table className="pt-table pt-striped">
        <thead>
        <tr>
           <th>Title</th>
           <th>Description</th>
        </tr>
        </thead>
        <tbody>
          {integrationsList}
        </tbody>
      </table>
    </div>
  }
})

