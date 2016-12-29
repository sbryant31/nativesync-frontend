var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var actions = require('../../modules/actions');
var Select = require('react-select');
var CodeMirror = require('react-codemirror');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      onChange: (res) => { console.log(res); },
      code: '',
      mode: 'javascript'
    }
  },
  render() {
    var self = this;
    var options = {
      lineNumbers: true,
      mode: this.props.mode ? this.props.mode : 'javascript'
    };
    return <CodeMirror value={this.props.code} onChange={this.props.onChange} options={options} />
  }
})
