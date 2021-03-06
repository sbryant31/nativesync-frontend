var React = require('react');
// var _ = require('underscore');
// var lodash = require('lodash');
// var actions = require('../../modules/actions');
// var Select = require('react-select');
// var ActionMultiSelect = require('./action_multi_select');
// var ParameterList = require('./parameter_list');
import {Popover, Position} from '@blueprintjs/core'
var Json = require('react-json');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      action: [],
    };
  },
  render() {
    var action = this.props.action;
    var inputJson = {};
    for (let param of action.input) {
      inputJson[param.name] = ` <${param['type']}> - ${param['description']}`;
    }

    var outputJson = {};
    for (let param of action.output) {
      outputJson[param.name] = ` <${param['type']}> - ${param['description']}`;
    }

    var example = `callAction(${action.internal_name}, ${JSON.stringify(inputJson)})`;
    return <div>
      <Popover content={
          <div>
            <h6><b>{ action.service_name }</b> - { action.function_name }</h6>
            <p>{action.description}</p>
            <h5>Input</h5>
            <Json value={inputJson} />
            <h5>Outputs</h5>
            <Json value={outputJson} />
            <h5>Example</h5>
            <textarea value={example} className="pt-input pt-fill" />
          </div>
        }
        position={Position.LEFT}
        isModal={true}>
        <a>{action.internal_name}</a>
      </Popover>
    </div>;
  }
});
