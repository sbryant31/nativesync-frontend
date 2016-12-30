var React = require('react');
var lodash = require('lodash');
var Select = require('react-select');
var Json = require('react-json');
var CodeEditor = require('../inputs/code_editor');

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      value: {},
      onChange: (body) => { console.log('body changed', body); },
      readOnly: false
    }
  },
  handleChange(field, e) {
    var value = this.props.value;
    if (e.target) {
      value[field] = e.target.value;
    } else if (e.value) {
      value[field] = e.value;
    } else {
      value[field] = e;
    }
    this.props.onChange(value);
  },
  render() {
    var self = this;
    var bodyTypes = [
      {value: 'json', label: 'JSON'},
      {value: 'xml', label: 'XML'}
    ];
    var bodyCodeTypes = [
      {value: 'javascript', label: 'Javascript'},
    ];
    var code;
    if (this.props.value.code) {
      code = this.props.value.code;
    } else {
      code = 'return output; // todo: custom transform output'
      this.handleChange('code', code);
    }
    return <div>
      <label className="pt-label">
        <h4>Data Type</h4>
        <Select value={ this.props.value.content_type } options={bodyTypes} onChange={this.handleChange.bind(this, 'content_type')} />
      </label>
      { (this.props.value.content_type == 'xml' || this.props.value.content_type == 'json') &&
        <div>
          <label className="pt-label pt-inline">
            <h4>Code Mode</h4>
            <Select value={ this.props.value.body_code_type } options={bodyCodeTypes} onChange={this.handleChange.bind(this, 'body_code_type')} />
          </label>
          <label className="pt-label pt-inline">
            <h4>Output Body Parser</h4>
            <span>Write a javascript function that parses the result of the request. Assume "output" is a javascript object representing the parsed result of your API call.</span>
            <CodeEditor
              onChange={this.handleChange.bind(this, 'code')}
              code={code}
              mode={'javascript'}
            />
        </label>
        </div>
      }
    </div>
  }
})