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
      onChange: (actions) => { console.log('change actions', actions) }
    }
  },
  handleChange: function(selection) {
    var selectedIDs = _.pluck(value, 'value');
    var actions = _.filter(this.state.actions, (action) => {
      return selectedIDs.indexOf(action.id) !== -1;
    })
    this.props.onChange(actions);
  },
  componentDidMount: function() {
    console.log('loading options for action');
    var self = this;
    return actions.getActions()
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
        options={this.state.actionOptions}
        onChange={this.handleChange}
      />
    </label>
  }
})
