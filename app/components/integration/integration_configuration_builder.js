var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var TextInputField = require('../inputs/text_input_field');
var CodeEditor = require('../inputs/code_editor');

var defaultConfiguration = {type: 'static', fields: [], code: ''}
module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      configuration: defaultConfiguration,
      onChange: function(configuration) {console.log('service auths change', configuration)},
      readOnly: false,
    }
  },
  handleChange: function(field, e) {
    var self = this;
    var configuration = this.props.configuration;
    if (e.target) {
      configuration[field] = e.target.value;
    } else if (e.value) {
      configuration[field] = e.value;
    } else {
      configuration[field] = e;
    }
    self.props.onChange(configuration);
  },
  handleChangeField: function(index, field, e) {
    var self = this;
    var configuration = this.props.configuration;
    if (e.target) {
      configuration['fields'][index][field] = e.target.value;
    } else if (e.value) {
      configuration['fields'][index][field] = e.value;
    } else {
      configuration['fields'][index][field] = e;
    }
    self.props.onChange(configuration);
  },
  handleAddField: function() {
    var self = this;
    var configuration = self.props.configuration;
    if (!configuration.fields) { configuration.fields = []};
    configuration.fields.push({label: '', key: '', type: ''});
    self.props.onChange(configuration);
  },
  handleRemoveField: function(index) {
    var self = this;
    var configuration = self.props.configuration;
    if (!configuration.fields) { configuration.fields = []};
    configuration.fields.splice(index, 1);
    self.props.onChange(configuration);
  },
  render() {
    var configurationTypes = [
      {value: 'static', label: 'Static'},
      {value: 'dynamic', label: 'Dynamic'}
    ];
    var configurationFieldTypes = [
      {value: 'string', label: 'String'},
      {value: 'number', label: 'Number'},
      {value: 'mapping', label: 'Mapping'},
    ];
    var self = this;
    var configurationList = lodash.map(self.props.configuration.fields, (configurationField, index) => {
      return (
        <div>
          <TextInputField label="Label" value={configurationField.label} onChange={self.handleChangeField.bind(self, index, 'label')} />
          <TextInputField label="Key" value={configurationField.key} onChange={self.handleChangeField.bind(self, index, 'key')} />
          Type: <Select options={configurationFieldTypes}
                  value={configurationField.type}
                  onChange={self.handleChangeField.bind(self, index, 'type')}
          />
          {!self.props.readOnly &&
            <div className="col-xs">
              <button className="pt-button" onClick={self.handleRemoveField.bind(self, index)}>Remove</button>
            </div>
          }
        </div>
      );
    })
    return (
        <div>
          <div>
            Type: <Select options={configurationTypes}
                    value={this.props.configuration.type}
                    onChange={self.handleChange.bind(self, 'type')}
                  />
          </div>
          <hr />
          { self.props.configuration.type == 'static' &&
            <div>
              <div>
                  { configurationList }
              </div>
              <div className="row">
                  { !self.props.readOnly &&
                      <button className="pt-button" onClick={self.handleAddField.bind(self)}>Add</button>
                  }
              </div>
            </div>
          }
          { self.props.configuration.type == 'dynamic' &&
            <CodeEditor
              code={this.props.configuration.code}
              onChange={self.handleChange.bind(self, 'code')}
            />
          }
        </div>
    );
  }
})
