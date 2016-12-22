var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var actions = require('../../modules/actions');
var Select = require('react-select');
var ActionMultiSelect = require('./action_multi_select');
var ParameterList = require('./parameter_list');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      action: [],
    }
  },
  render() {
    return <div>
      <h4><b>{ this.props.action.service_name }</b> - { this.props.action.function_name }</h4>
      <h5>Input</h5>
      <ParameterList parameters={ this.props.action.input } readOnly={true} />
      <h5>Outputs</h5>
      <ParameterList parameters={ this.props.action.output } readOnly={true} />
    </div>
  }
})
