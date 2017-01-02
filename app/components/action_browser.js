var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      view: 'all',
      filter: {},
      actions: []
    }
  },
  getDefaultProps: function() {
    return {
      initialFilter: {}
    }
  },
  componentDidMount: function() {
    var self = this;
    var filter = this.props.initialFilter;
    self.setState({filter: filter});
    console.log('get actions', filter);
    return actions.getActions(filter)
    .then(function(result) {
      self.setState({actions: result});
    })
  },
  handleMakeDuplicate: function(actionId) {
    return actions.duplicateAction(actionId)
    .then((result) => {
      return actions.goto.bind(`/action/${result.action.id}`)
    })
  },
  render() {
    var self = this;
    var actionsList = lodash.map(this.state.actions,function(action){
      return <tr key={action.id}>
        <td>{action.organization.name}</td>
        <td>{action.service_name}</td>
        <td><a onClick={actions.goto.bind(null, '/action/' + action.id)}>{action.function_name}</a></td>
        <td>{action.version}</td>
        <td><a onClick={self.handleMakeDuplicate.bind(null, action.id)}><span className="pt-icon-duplicate">Make a Copy</span></a></td>
      </tr>
    })
    return <div>
      <h1>Actions</h1>
      <a onClick={actions.goto.bind(null, '/action/new')}>New action</a>
      <hr/>
      <table className="pt-table pt-striped">
        <thead>
        <tr>
           <th>Owner</th>
           <th>Service</th>
           <th>Function</th>
           <th>Version</th>
           <th>Menu</th>
        </tr>
        </thead>
        <tbody>
          {actionsList}
        </tbody>
      </table>
    </div>
  }
})

