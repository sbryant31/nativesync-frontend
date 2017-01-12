var React = require('react');
var _ = require('underscore');
var ReactBlockly = require('react-blockly-component');
var BlocklyBlocks = require('./blockly_blocks');

var internalize = require('../../modules/helpers').internalize;

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      onChangeXml: (res) => { console.log(res); },
      services: [],
      actions: [],
      configuration: {},
      initialXml: ''
    };
  },
  componentWillMount: function() {
    BlocklyBlocks(this.props.services, this.props.actions, this.props.configuration);
  },
  render: function() {
    var self = this;
    // default values for names of things

    var defaultVariableValues = { NAME: { type: "text", fields: {'TEXT': 'name'} }}
    var defaultObjectKeyValues = {
      'NAME': defaultVariableValues.NAME,
      'KEY': { type: 'text', fields: {'TEXT': 'key'}}
    };

    var defaultListInput = {
      type: 'get_list_by_name',
      values: {"NAME": defaultVariableValues.NAME}
    }

    var listsCategory = {
      name: "Lists", // TODO: Push, Get, Put
      blocks: [
        { type: "new_empty_list", values: defaultVariableValues },
        { type: "lists_create_with" },
        { type: "lists_repeat", values: {"NUM": {type: 'math_number', fields: {"NUM": 5}}} },
        { type: "lists_length" },
        { type: "lists_isEmpty" },
        { type: "lists_indexOf", values: {"VALUE": defaultListInput}},
        { type: "lists_getIndex", values: {"VALUE": defaultListInput}},
        { type: "lists_setIndex", values: {"LIST": defaultListInput}},
        { type: "lists_getSublist", values: {"LIST": defaultListInput}},
      ]
    };

    var defaultKeyValue = { type: 'text', fields: {'TEXT': 'key'}}
    var dataCategory = {
      name: "Data Storage", // TODO: Push, Get, Put
      blocks: [
        { type: "data_set", values: {KEY: defaultKeyValue} },
        { type: "data_get", values: {KEY: defaultKeyValue} },
      ]
    };

    var miscCategory = {
      name: "Miscellaneous",
      blocks: [
        { type: "start_program" },
        { type: "end_program" },
        { type: "log_value" },
      ]
    };

    var textCategory = {
      name: "Text",
      blocks: [
        { type: "text" },
        { type: "text_join" },
        { type: "text_append", values: {'TEXT': {type: 'text'}} },
        { type: "text_length" },
        { type: "text_isEmpty" },
        { type: "text_changeCase" },
        { type: "text_trim" },
      ]
    };
    var mathCategory = {
      name: "Math",
      blocks: [
        { type: "math_number" },
        { type: "math_random_float" },
        { type: "math_modulo" },
        { type: "math_arithmetic" },
        { type: "math_number_property" },
        { type: "math_round" },
        { type: "math_on_list" },
        { type: "math_change", values: { "DELTA": { type: 'math_number', fields: { "NUM": 1 } } } },
        { type: "math_constrain", values: { "LOW": { type: 'math_number', fields: { "NUM": 1 } }, "HIGH": { type: 'math_number', fields: { "NUM": 1 } } } },
        { type: "math_random_int", values: { "FROM": { type: 'math_number', fields: { "NUM": 1 } }, "TO": { type: 'math_number', fields: { "NUM": 1 } } } },
      ]
    };

    var actionBlocks = [];
    var actionCategories = _.map(this.props.services, (service) => {
      var serviceActions = _.where(this.props.actions, {service_id: service.id});
      var serviceActionBlocks = _.map(serviceActions, (action) => {
        var paramValues = {};
        // todo: make this "get object / get list / get string / get number" dynamically
        _.each(action.input, (param) => {
          paramValues[param.name] = {
            type: 'get_variable_by_name',
            values: defaultVariableValues
          }
        })
        // TODO: create "name" text for output values
        var outputValues = {};
        _.each(action.output, (param) => {
          outputValues[param.name] = { type: "text", fields: {'TEXT': internalize(`${action.function_name}_${param.name}`)} }
        });
        var action = {
          type: action.internal_name,
          values: paramValues,
          next: {
            type: `result_${action.internal_name}`,
            values: outputValues
          },
        };
        return action;
      });
      console.log('service action blocks', serviceActionBlocks);
      return {
        name: `${service.name} Actions`,
        blocks: serviceActionBlocks
      };
    });

    var serviceDefinitionBlocks = [];
    _.each(this.props.services, (service) => {
      _.each(service.ServiceDefinitions, (definition) => {
        var paramValues = {}
        _.each(definition.definition, (param) => {
          paramValues[param.name] = {
            type: 'get_variable_by_name',
            values: defaultVariableValues
          }
        })
        serviceDefinitionBlocks.push({
          type: internalize(`${service.name}_${definition.name}_definition`),
          values: paramValues,
        });
      })
    })

    var objectsCategory = {
      name: 'Objects',
      blocks: [
        { type: "new_empty_object", values: defaultVariableValues },
        { type: "nativesync_object" },
        { type: "nativesync_object_parameter" },
      ].concat(serviceDefinitionBlocks)
    }

    console.log('default var values', defaultObjectKeyValues);
    var inputVariables = _.map(this.props.configuration.fields, (field) => {
      return {type: `input_${field.key}`};
    })
    var variablesCategory = {
      name: "Variables",
      blocks: [
        { type: 'set_variable_by_name', values: defaultVariableValues},
        { type: 'get_variable_by_name', values: defaultVariableValues},
        { type: 'get_list_by_name', values: defaultVariableValues},
        { type: 'get_object_by_name', values: defaultVariableValues },
        { type: "get_object_key", values: defaultObjectKeyValues },
        { type: "set_object_key", values: defaultObjectKeyValues },
        { type: "input_by_key", values: defaultObjectKeyValues },
      ]
      .concat(inputVariables)
    };


    var logicCategory = {
      name: "Logic",
      blocks: [
        { type: "controls_if" },
        { type: "logic_compare" },
        { type: "logic_operation" },
        { type: "logic_negate" },
        { type: "logic_boolean" },
        { type: "logic_ternary" },
      ]
    };
    var loopsCategory = {
      name: "Loops",
      blocks: [
        { type: "controls_repeat" },
        { type: "controls_whileUntil" },
        { type: "controls_forEach" },
        { type: "controls_flow_statements" },
      ]
    };
    console.log('actionblocks', actionBlocks);
    var toolboxCategories = actionCategories.concat([
      miscCategory,
      objectsCategory,
      listsCategory,
      logicCategory,
      loopsCategory,
      mathCategory,
      textCategory,
      dataCategory,
      variablesCategory,
    ])
    var Editor = React.createElement(ReactBlockly.BlocklyEditor, {
      workspaceConfiguration: {
        grid: {
          spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true
        }
      },
      toolboxCategories: toolboxCategories,
      initialXml: this.props.initialXml || '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>',
      wrapperDivClassName: 'fill-height',
      xmlDidChange: function(newXml) {
        self.props.onChangeXml(newXml);
      }
    });
    return <div className='fill-height'>
      {Editor}
    </div>;
  }
});
