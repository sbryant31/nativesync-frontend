var React = require('react');
var lodash = require('lodash');
var Select = require('react-select');
var Json = require('react-json');

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
    return <div>
      <label className="pt-label">
        Content Type
        <Select value={ this.props.value.content_type } options={bodyTypes} onChange={this.handleChange.bind(this, 'content_type')} />
      </label>
      <label className="pt-label" >
        Parameters
        <Json onChange={this.handleChange.bind(this, 'object')} value={this.props.value.object} />
      </label>
      <label className="pt-label" >
        Example
        <textarea className="pt-input" onChange={this.handleChange.bind(this, 'example')} value={this.props.value.example} />
      </label>

    </div>
  }
})
