var React = require('react');
var lodash = require('lodash');
var Select = require('react-select');
var ServiceObjectPropertyEditor = require('./service_object_property_editor');
var ServiceObjectPropertyEditor2 = require('./service_object_property_editor');
var TextInputField = require('../inputs/text_input_field');

// todo: refactor this into a generic key_value_list

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      list: [],
      onChange: (parameters) => { console.log('params changed', parameters); },
      readOnly: false
    }
  },
  handleChange: function(index, field, e) {
    var list = this.props.list;
    list[index] = e;
    this.props.onChange(list);
  },
  handleRemove: function(index) {
    var list = this.props.list;
    list.splice(index, 1);
    this.props.onChange(list);
  },
  handleAdd: function() {
    var list = this.props.list;
    list.push({name: '', property: {type: 'string'}});
    this.props.onChange(list);
  },
  render() {
    var self = this;
    var servicePropertyList = lodash.map(self.props.list, (item, index) => {
      return (
				<div>
					<TextInputField label="Name" onChange={self.handleChange.bind(self, index, 'name')} value={item.name} />
					<ServiceObjectPropertyEditor2 value={item.property} onChange={self.handleChange.bind(self, index, 'property')} />
					<div className="col-xs">
						<button className="pt-button pt-icon-remove" onClick={self.handleRemove.bind(self, index)}>Remove</button>
					</div>
				</div>
			)
    });
    return (
      <div>
        { servicePropertyList }
				<div className="row">
					<div className="col-xs">
						<button className="pt-button pt-icon-add" onClick={self.handleAdd.bind(self)}>Add</button>
					</div>
				</div>
      </div>
    )
  }
})
