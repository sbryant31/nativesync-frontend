var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var actions = require('../../modules/actions');
var Select = require('react-select');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      actions: {},
    }
  },
  getDefaultProps: function() {
    return {
      idOnly: true,
      filter: {},
      action: {},
      onChange: (action) => { console.log('change action', action) }
    }
  },
  handleChange: function(selection) {
    if (selection == null) {
      this.props.onChange(null);
    } else if (this.props.idOnly) {
      this.props.onChange(selection.value);
    } else {
      this.props.onChange(this.state.actions[selection.value]);
    }
  },
  componentDidMount: function() {
    console.log('loading options for action');
    var self = this;
    return actions.getActions(this.props.filter)
    .then(function(result ) {
      self.setState({actions: _.indexBy(result.actions, 'id')})
      var actionOptions = _.map(result.actions, (action) => {
        return {value: action.id, label: action.title}
      })
      self.setState({actionOptions: actionOptions})
    })
  },
  render() {
    var self = this;
    var value;
    if (this.props.idOnly) {
      value = this.props.value;
    } else {
      value = this.props.value ? this.props.value.id : null
    }
    return <label className="pt-label pt-inline col-xs">
      Action
      <Select
        name="action-selector"
        value={value}
        options={this.state.actionOptions}
        onChange={this.handleChange}
      />
    </label>
  }
})
