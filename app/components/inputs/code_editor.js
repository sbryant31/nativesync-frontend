var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var actions = require('../../modules/actions');
var Select = require('react-select');
var CodeMirror = require('react-codemirror');
require('codemirror/mode/javascript/javascript');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      onChange: (res) => { console.log(res); },
      code: ''
    }
  },
  render() {
    var self = this;
		var options = {
			lineNumbers: true,
			mode: 'javascript'
		};
		return <CodeMirror value={this.props.code} onChange={this.props.onChange} options={options} />
  }
})
