var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var TextInputField = require('../inputs/text_input_field');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      configuration: [],
      onChange: function(configuration) {console.log('service auths change', configuration)},
      readOnly: false,
    }
  },
  handleChange: function(index, field, e) {
    var self = this;
    var configuration = this.props.configuration;
    if (e.target) {
      configuration[index][field] = e.target.value;
    } else if (e.value) {
      configuration[index][field] = e.value;
    } else {
      configuration[index][field] = e;
    }
    self.props.onChange(configuration);
  },
  handleAdd: function() {
    var self = this;
    var configuration = self.props.configuration;
    configuration.push({label: '', key: '', type: ''});
    self.props.onChange(configuration);
  },
  handleRemove: function(index) {
    var self = this;
    var configuration = self.props.configuration;
    configuration.splice(index, 1);
    self.props.onChange(configuration);
  },
  render() {
    var configurationTypes = [
      {value: 'string', label: 'String'},
      {value: 'number', label: 'Number'},
      {value: 'mapping', label: 'Mapping'},
    ];
    var self = this;
    var configurationList = lodash.map(self.props.configuration,function(configuration, index){
      return (
          <div>
            <TextInputField label="Label" value={configuration.label} onChange={self.handleChange.bind(self, index, 'label')} />
            <TextInputField label="Key" value={configuration.key} onChange={self.handleChange.bind(self, index, 'key')} />
            Type: <Select options={configurationTypes}
                    value={configuration.type}
                    onChange={self.handleChange.bind(self, index, 'type')}
            />
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
                { configurationList }
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
