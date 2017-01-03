var React = require('react');
// var _ = require('underscore');
var lodash = require('lodash');
// var Select = require('react-select');
// var actions = require('../../modules/actions');
var TextInputField = require('../inputs/text_input_field');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      configuration: [],
      value: {},
      onChange: function(configuration) {console.log('service auths change', configuration)},
      readOnly: false,
    }
  },
  handleChange: function(field, e) {
    var self = this;
    var value = this.props.value;
    if (e.target) {
      value[field] = e.target.value;
    } else if (e.value) {
      value[field] = e.value;
    } else {
      value[field] = e;
    }
    self.props.onChange(value);
  },
  render() {
    var self = this;
    var configurationList = lodash.map(self.props.configuration,function(configuration, index){
      return (
          <div>
            <TextInputField label={configuration.label}
              value={self.props.value[configuration.key]}
              onChange={self.handleChange.bind(self, configuration.key)}
             />
          </div>
      );
    })
    return (
        <div>
          { configurationList }
        </div>
    );
  }
})
