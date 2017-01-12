var React = require('react');
// var lodash = require('lodash');
var Select = require('react-select');
// var Json = require('react-json');
var CodeEditor = require('../inputs/code_editor');

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      value: {},
      onChange: (body) => { console.log('body changed', body); },
      readOnly: false
    };
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
    this.forceUpdate();
  },
  render() {
    // var self = this;
    var bodyTypes = [
      {value: 'text/plain', label: 'Text/Plain'},
      {value: 'formData', label: 'Form'},
      {value: 'json', label: 'JSON'},
      {value: 'xml', label: 'XML'}
    ];
    var bodyCodeTypes = [
      {value: 'direct', label: 'Directly Map Input Params to POST Body'},
      {value: 'javascript', label: 'Map Input Params to POST Body with Javascript '},
    ];
    var codeMode;
    var json = false;
    if (this.props.value.body_code_type == 'javascript') {
      codeMode = 'javascript';
    } else {
      if (this.props.value.content_type == 'json') {
        codeMode = 'javascript';
        json = true;
      } else if (this.props.value.content_type == 'xml') {
        codeMode = 'xml';
      }
    }
    var code;
    if (this.props.value.code) {
      code = this.props.value.code;
    } else {
      code = "callback(input); // todo: custom transform input";
      this.handleChange('code', code);
    }
    return <div>
      <label className="pt-label">
        <h4>Data Type</h4>
        <Select value={ this.props.value.content_type } options={bodyTypes} onChange={this.handleChange.bind(this, 'content_type')} />
        {this.props.value.content_type == 'form' &&
          <span>The parameters specified as in "body" will be sent as form data</span>
        }
      </label>
      { (this.props.value.content_type == 'xml' || this.props.value.content_type == 'json') &&
        <div>
          <label className="pt-label pt-inline">
            <Select value={ this.props.value.body_code_type } options={bodyCodeTypes} onChange={this.handleChange.bind(this, 'body_code_type')} />
          </label>
          <label className="pt-label pt-inline">
            {this.props.value.body_code_type == 'javascript' &&
              <div>
                <h4>Input Body Generator</h4>
                <span>Write a javascript function that returns a request body. Assume "input" is
                a javascript object containing all the parameters above.</span>
                <CodeEditor
                  onChange={this.handleChange.bind(this, 'code')}
                  code={code}
                  json={json}
                  mode={codeMode}
                />
              </div>
            }
        </label>
        </div>
      }
    </div>;
  }
});
