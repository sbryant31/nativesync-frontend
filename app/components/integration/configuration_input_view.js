var React = require('react');
var lodash = require('lodash');
var Select = require('react-select');
import JSONTree from 'react-json-tree'

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      configuration: {},
      onChange: (parameters) => { console.log('params changed', parameters); }
    }
  },
  render() {
    var inputObject = {};
    if (this.props.configuration.fields) {
      for (var configurationField of this.props.configuration.fields) {
        inputObject[configurationField.key] = configurationField.type;
      }
    }
    return <div>
      { this.props.configuration.type == 'static' &&
        <JSONTree data={inputObject} />
      }
      { this.props.configuration.type == 'dynamic' &&
        <span>Dynamically generated</span>
      }
    </div>
  }
})
