var React = require('react');
var lodash = require('lodash');
var Select = require('react-select');

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      onChange: (parameters) => { console.log('params changed', parameters); }
    }
  },
  render() {
    return <div>
      Trigger info {JSON.stringify(this.props.value)}
    </div>
  }
})
