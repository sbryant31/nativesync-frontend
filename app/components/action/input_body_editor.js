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
  handleRemove: function(index) {
    var parameters = this.props.parameters;
    parameters.splice(index, 1);
    this.props.onChange(parameters);
  },
  handleAdd: function() {
    var parameters = this.props.parameters;
    parameters.push({in: '', name: '', description: '', type: ''});
    this.props.onChange(parameters);
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
    // idk why this is necessary but the select wasnt updating
    this.forceUpdate();
  },
  render() {
    var self = this;
    var bodyTypes = [
      {value: 'formData', label: 'Form'},
      {value: 'json', label: 'JSON'},
      {value: 'xml', label: 'XML'}
    ];
    var bodyCodeTypes = [
      {value: 'javascript', label: 'Javascript'},
      {value: 'handlebars', label: 'Handlebars.js'},
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
      code = "return input; // todo: custom transform input";
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
            <h4>Code Mode</h4>
            <Select value={ this.props.value.body_code_type } options={bodyCodeTypes} onChange={this.handleChange.bind(this, 'body_code_type')} />
          </label>
          <label className="pt-label pt-inline">
            <h4>Input Body</h4>
            {codeMode == 'javascript' &&
              <span>Write a javascript function that returns a request body. Assume "input" is
              a javascript object containing all the parameters above.</span>
            }
            {this.props.value.body_code_type == 'handlebars' &&
              <span>Write a handlebars.js template that creates the request body. You can use
              variables specified in the "parameters" section above. Example: {{variable}}</span>
            }
            <CodeEditor
              onChange={this.handleChange.bind(this, 'code')}
              code={code}
              json={json}
              mode={codeMode}
            />
        </label>
        </div>
      }
    </div>
  }
})
