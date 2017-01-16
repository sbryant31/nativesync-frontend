var React = require('react');
var actions = require('../modules/actions');
// var Navbar = require('../components/navbar');
var lodash = require('lodash');
var ServiceSelector = require('./service/service_selector');
var TextInputField = require('./inputs/text_input_field');

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
    console.log('filter change', field, e);
    var filter = this.state.filter;
    let value;
    if (e == null) {
      value = null;
    } else if (e.target) {
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
        if (action[key].toLowerCase().indexOf(value.toLowerCase()) === -1) {
          match = false;
        }
      });
      return match;
    });
    this.setState({filteredActions: filteredActions});
    this.forceUpdate();
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
      <TextInputField label="Service" value={this.state.filter.service_name} onChange={this.handleFilterChange.bind(this, 'service_name')} />
      <TextInputField label="Function" value={this.state.filter.function_name} onChange={this.handleFilterChange.bind(this, 'function_name')} />
      <TextInputField label="Organization" value={this.state.filter.organization_name} onChange={this.handleFilterChange.bind(this, 'organization_name')} />
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
