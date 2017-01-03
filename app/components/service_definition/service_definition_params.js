var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var TextInputField = require('../inputs/text_input_field');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      definition: [],
      onChange: function(definition) {console.log('service auths change', definition)},
    }
  },
  handleChange: function(index, name, e) {
    var self = this;
    var definition = this.props.definition;
    if (e.target) {
      definition[index][name] = e.target.value;
    } else if (e.value) {
      definition[index][name] = e.value;
    } else {
      definition[index][name] = e;
    }
    this.props.onChange(definition);
  },
  handleAdd: function() {
    var self = this;
    var definition = self.props.definition;
    definition.push({});
    self.props.onChange(definition);
  },
  handleRemove: function(index) {
    var self = this;
    var definition = self.props.definition;
    definition.splice(index, 1);
    self.props.onChange(definition);
  },
  render() {
    var self = this;
    var paramTypes = [
      { value: 'object', label: 'Object' },
      { value: 'list', label: 'List' },
      { value: 'string', label: 'String' },
      { value: 'number', label: 'Number' },
    ];
    var paramsList = lodash.map(self.props.definition, function(param, index){
      return (
          <div>
            <label className="pt-label">
              Name
              <TextInputField
                value={param.name}
                onChange={self.handleChange.bind(self, index, 'name')}
              />
            </label>
            <label className="pt-label">
              Type
              <Select
                options={paramTypes}
                value={param.type}
                onChange={self.handleChange.bind(self, index, 'type')}
              />
            </label>
            { (param.type == 'object' || param.type == 'list') &&
              <label className="pt-label">
                Reference
                <TextInputField
                  value={param.ref}
                  onChange={self.handleChange.bind(self, index, 'ref')}
                />
              </label>
            }
            {!self.props.readOnly &&
              <div className="col-xs">
                <button className="pt-button" onClick={self.handleRemove.bind(self, index)}>Remove</button>
              </div>
            }
          </div>
      );
    })
    return (
        <div>
            <div>
                { paramsList }
            </div>
            <div className="row">
                { !self.props.readOnly &&
                    <button className="pt-button" onClick={self.handleAdd.bind(self)}>Add</button>
                }
            </div>
        </div>
    );
  }
})
