var React = require('react');
var lodash = require('lodash');
var Select = require('react-select');
import JSONTree from 'react-json-tree'

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      value: [],
      onChange: (parameters) => { console.log('params changed', parameters); }
    }
  },
  render() {
    var inputObject = {};
    for (var configuration of this.props.value) {
      inputObject[configuration.key] = configuration.type;
    }
    return <div>
      <JSONTree data={inputObject} />
    </div>
  }
})
