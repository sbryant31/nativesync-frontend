var React = require('react');
var lodash = require('lodash');
var Select = require('react-select');
var ParameterInSelector = require('../action/parameter_in_selector');

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
  handleChange(index, field, e) {
    var parameters = this.props.parameters;
    if (e.target) {
      parameters[index][field] = e.target.value;
    } else if (e.value) {
      parameters[index][field] = e.value;
    } else {
      parameters[index][field] = e;
    }
    this.props.onChange(parameters);
  },
  render() {
    var self = this;
    var bodyTypes = [
      {value: 'formData', label: 'Form'},
      {value: 'json', label: 'JSON'},
      {value: 'xml', label: 'XML'}
    ];
    return <div>
      <label className="pt-label">
        Content Type
        <Select value={ this.props.value.content_type } options={bodyTypes} onChange={this.handleChange.bind(this, 'content_type')} />
      </label>
      <label className="pt-label" >
        Parameters
        <textarea className="pt-input" onChange={this.handleChange.bind(this, 'parameters')} value={this.props.value.parameters} />
      </label>
      <label className="pt-label" >
        Example
        <textarea className="pt-input" onChange={this.handleChange.bind(this, 'example')} value={this.props.value.example} />
      </label>

    </div>
  }
})
