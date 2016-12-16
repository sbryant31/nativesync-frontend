var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      actions: []
    }
  },
  componentDidMount: function() {
    var self = this;
    actions.myActions()
    .then(function(result) {
      self.setState({actions: result});
    })
  },
  render() {
    var actionsList = lodash.map(this.state.actions,function(action){
      return <tr key={action.id}>
        <td>{action.service_name}</td>
        <td>{action.function_name}</td>
        <td><a onClick={actions.goto.bind(null, '/action/' + action.id)}>Edit</a></td>
      </tr>
    })
    return <div>
      <a onClick={actions.goto.bind(null, '/action/new')}>New action</a>
      <hr/>
      <table className="pt-table pt-striped">
        <thead>
        <tr>
           <th>Service Name</th>
           <th>Function Name</th>
           <th>Edit</th>
        </tr>
        </thead>
        <tbody>
          {actionsList}
        </tbody>
      </table>
    </div>
  }
})

