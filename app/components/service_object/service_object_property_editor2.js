var React = require('react');
var lodash = require('lodash');
var Select = require('react-select');
var ServiceObjectPropertyList = require('./service_object_property_list');

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      value: {
        type: 'string',
        ref: '',
        properties: []
      },
      onChange: (parameters) => { console.log('params changed', parameters); },
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
    var parameterTypes = [
      {value: 'string', label: 'String'},
      {value: 'number', label: 'Number'},
      {value: 'object', label: 'Object'},
      {value: 'list', label: 'List'}
    ];
    var refs = [];
    return <div className="row">
      <label className="pt-label pt-inline col-xs">
        Description <input className="pt-input" value={ self.props.value.description } onChange={self.handleChange.bind(self, 'description')} />
      </label>
      <label className="pt-label pt-inline col-xs">
        Type <Select options={parameterTypes} value={ self.props.value.type } onChange={self.handleChange.bind(self, 'type')} />
      </label>
      { self.props.value.type == 'object' &&
        <div>
          Description
          <label className="pt-label pt-inline col-xs">
            Properties <ServiceObjectPropertyList list={ self.props.value.properties } onChange={self.handleChange.bind(self, 'properties')} />
          </label>
          <label className="pt-label pt-inline col-xs">
            Ref <Select options={refs} value={ self.props.value.ref } onChange={self.handleChange.bind(self, 'ref')} />
          </label>
        </div>
      }
      { self.props.value.type == 'list' &&
        <div>
          Items:
          <label className="pt-label pt-inline col-xs">
            Properties <ServiceObjectPropertyList list={ self.props.value.properties } onChange={self.handleChange.bind(self, 'properties')} />
          </label>
          <label className="pt-label pt-inline col-xs">
            Ref <Select options={refs} value={ self.props.value.ref } onChange={self.handleChange.bind(self, 'ref')} />
          </label>
        </div>
      }
    </div>
  }
})
