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
  componentDidMount: function() {
    var self = this;
    actions.getActions(this.state.filter)
    .then(function(result) {
      self.setState({actions: result});
    })
  },
  render() {
    var actionsList = lodash.map(this.state.actions,function(action){
      return <tr key={action.id}>
        <td>{action.service_name}</td>
        <td><a onClick={actions.goto.bind(null, '/action/' + action.id)}>{action.function_name}</a></td>
      </tr>
    })
    return <div>
      <h1>Actions</h1>
      { this.state.mode == 'partner' &&
        <a onClick={actions.goto.bind(null, '/action/new')}>New action</a>
      }
      <hr/>
      <table className="pt-table pt-striped">
        <thead>
        <tr>
           <th>Service</th>
           <th>Function</th>
        </tr>
        </thead>
        <tbody>
          {actionsList}
        </tbody>
      </table>
    </div>
  }
})

