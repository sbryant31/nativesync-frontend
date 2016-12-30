var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var actions = require('../../modules/actions');
var Select = require('react-select');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      actions: [],
    }
  },
  getDefaultProps: function() {
    return {
      value: [],
      services: [],
      onChange: (actions) => { console.log('change actions', actions) }
    }
  },
  handleChange: function(selection) {
    var selectedIDs = _.pluck(selection, 'value');
    var actions = _.filter(this.state.actions, (action) => {
      return selectedIDs.indexOf(action.id) !== -1;
    })
    console.log('actions changed', actions);
    this.props.onChange(actions);
  },
  componentDidMount: function() {
    this.loadOptions()
  },
  loadOptions: function() {
    console.log('loading options for action');
    var serviceIds = _.pluck(this.props.services, 'id');
    var self = this;
    return actions.getActions({service_ids: serviceIds})
    .then(function(actions) {
      self.setState({actions: actions});
      var actionOptions = _.map(actions, (action) => {
        return {value: action.id, label: action.service_name + " " + action.function_name}
      })
      self.setState({actionOptions: actionOptions})
    })
  },
  render() {
    var self = this;
    var value = _.map(self.props.value, (action) => {
      return {value: action.id, label: action.service_name + " " + action.function_name};
    })
    return <label className="pt-label pt-inline col-xs">
      Action
      <Select
        name="action-multi-select"
        value={value}
        multi={true}
        options={this.state.actionOptions}
        onChange={this.handleChange}
      />
    </label>
  }
})
