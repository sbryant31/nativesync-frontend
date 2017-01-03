var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')
var ServiceSelector = require('./service/service_selector');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      view: 'all',
      filter: {},
      filteredActions: [],
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
    return actions.getActions(filter)
    .then(function(result) {
      self.setState({
        actions: result.actions,
        filteredActions: result.actions
      });
    })
  },
  handleMakeDuplicate: function(actionId) {
    return actions.duplicateAction(actionId)
    .then((result) => {
      return actions.goto.bind(`/action/${result.action.id}`)
    })
  },
 handleFilterChange: function(field, e) {
    var filter = this.state.filter;
    let value;
    if (e.target) {
      value = e.target.value;
    } else if (e.value) {
      value = e.value;
    } else {
      value = e;
    }
    if (value) {
      filter[field] = value;
    } else {
      delete filter[field];
    }

		this.setState({filter: filter});
		var filteredActions = _.filter(this.state.actions, (action) => {
			var match = true;
			_.each(filter, (value, key) => {
				if (key == 'service_id') {
					if (action.service_id != value.id	) {
						match = false;
					}
				} else if (action[key].toLowerCase().indexOf(value.toLowerCase()) === -1) {
					match = false;
				}
			});
			return match;
		});
		this.setState({filteredActions: filteredActions});
	},
  render() {
    var self = this;
    var actionsList = lodash.map(this.state.filteredActions, function(action){
      return <tr key={action.id}>
        <td>{action.organization.name}</td>
        <td>{action.service_name}</td>
        <td><a onClick={actions.goto.bind(null, '/action/' + action.id)}>{action.function_name}</a></td>
        <td>{action.version}</td>
        <td><a onClick={self.handleMakeDuplicate.bind(null, action.id)}><span className="pt-icon-duplicate"></span></a></td>
      </tr>
    })
    return <div>
      <h1>Actions</h1>
			<ServiceSelector
				value={this.state.filter.service_id}
				onChange={this.handleFilterChange.bind(this, 'service_id')} />
			<hr/>
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

