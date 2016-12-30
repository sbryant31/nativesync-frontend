var React = require('react');
var lodash = require('lodash');
var Select = require('react-select');
var _ = require('underscore');

var statusCodeParam = {name: 'statusCode', description: 'http status code response', type: 'number', readOnly: true};

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      parameters: [statusCodeParam],
      onChange: (parameters) => { console.log('params changed', parameters); },
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
    parameters.push({name: '', description: '', type: ''});
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
  componentWillMount: function() {
    var parameters = this.props.parameters;
    if (!_.findWhere(parameters, {name: 'statusCode'})) {
      parameters.push(statusCodeParam);
      this.props.onChange(parameters);
    }
  },
  render() {
    var index = 0;
    var self = this;
    var parameters = lodash.map(this.props.parameters, function(parameter){
      var removeHandler = self.handleRemove.bind(self, index);
      var currentIndex = index++;
      var parameterTypes = [
        {value: 'string', label: 'String'},
        {value: 'number', label: 'Number'},
        {value: 'date', label: 'Date'},
        {value: 'object', label: 'Object'},
        {value: 'list', label: 'List'},
      ];
      return <div className="row">
        <label className="pt-label pt-inline col-xs">
          Name <input className="pt-input" value={ parameter.name } onChange={self.handleChange.bind(self, currentIndex, 'name')} />
        </label>
        <label className="pt-label pt-inline col-xs">
          Description <input className="pt-input" value={ parameter.description } onChange={self.handleChange.bind(self, currentIndex, 'description')} />
        </label>
        <label className="pt-label pt-inline col-xs">
          Type <Select options={parameterTypes} value={ parameter.type } onChange={self.handleChange.bind(self, currentIndex, 'type')} />
        </label>
        {!self.props.readOnly && !parameter.readOnly &&
        <div className="pt-label pt-inlinecol-xs">
            <button className="pt-button pt-icon-remove" onClick={removeHandler}>Remove</button>
        </div>
        }
      </div>
    })
    return <div>
      { parameters }
      <div className="row">
        <div className="col-xs">
          {!self.props.readOnly &&
            <button className="pt-button pt-icon-add" onClick={this.handleAdd}>Add</button>
          }
        </div>
      </div>
    </div>
  }
})
