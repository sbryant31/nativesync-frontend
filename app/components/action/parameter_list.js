var React = require('react');
var lodash = require('lodash');
var Select = require('react-select');
var ParameterInSelector = require('../action/parameter_in_selector');
var ServiceDefinitionSelector = require('../service_definition/service_definition_selector');

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      service: {},
      parameters: [],
      onChange: (parameters) => { console.log('params changed', parameters); },
      readOnly: false
    };
  },
  handleRemove: function(index) {
    var parameters = this.props.parameters;
    parameters.splice(index, 1);
    this.props.onChange(parameters);
  },
  handleAdd: function() {
    var parameters = this.props.parameters;
    parameters.push({in: 'body', name: '', description: '', type: 'string', required: false, ref: null});
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
          In <ParameterInSelector value={ parameter.in } onChange={self.handleChange.bind(self, currentIndex, 'in')} />
        </label>
        <label className="pt-label pt-inline col-xs">
          Description <input className="pt-input" value={ parameter.description } onChange={self.handleChange.bind(self, currentIndex, 'description')} />
        </label>
        <label className="pt-label pt-inline col-xs">
          Type <Select options={parameterTypes} value={ parameter.type } onChange={self.handleChange.bind(self, currentIndex, 'type')} />
          { (parameter.type == 'object' || parameter.type == 'list') &&
            <ServiceDefinitionSelector service={self.props.service} value={ parameter.ref } onChange={self.handleChange.bind(self, currentIndex, 'ref')} />
          }
        </label>
        {!self.props.readOnly &&
        <div className="pt-label pt-inlinecol-xs">
            <button className="pt-button pt-icon-remove" onClick={removeHandler}>Remove</button>
        </div>
        }
      </div>;
    });
    return <div>
      { parameters }
      <div className="row">
        <div className="col-xs">
          {!self.props.readOnly &&
            <button className="pt-button pt-icon-add" onClick={this.handleAdd}>Add</button>
          }
        </div>
      </div>
    </div>;
  }
});
