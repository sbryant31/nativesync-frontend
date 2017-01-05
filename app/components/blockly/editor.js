var React = require('react');
var _ = require('underscore');
var ReactBlockly = require('react-blockly-component');

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
  render: function() {
    var self = this;

    var listsCategory = {
      name: "Lists", // TODO: Push, Get, Put
      blocks: [
        { type: "lists_create_empty" },
        { type: "lists_create_with" },
        { type: "lists_repeat", values: {"NUM": {type: 'math_number', fields: {"NUM": 5}}} },
        { type: "lists_length" },
        { type: "lists_isEmpty" },
        { type: "lists_indexOf", values: {"VALUE": {type: 'variables_get', fields: {"VAR": 'list'}}}},
        { type: "lists_getIndex", values: {"VALUE": {type: 'variables_get', fields: {"VAR": 'list'}}}},
        { type: "lists_setIndex", values: {"LIST": {type: 'variables_get', fields: {"VAR": 'list'}}}},
        { type: "lists_getSublist", values: {"LIST": {type: 'variables_get', fields: {"VAR": 'list'}}}},
      ]
    };

    var dataCategory = {
      name: "Data Storage", // TODO: Push, Get, Put
      blocks: [
        { type: "data_set" },
        { type: "data_get" },
      ]
    };

    var miscCategory = {
      name: "Miscellaneous",
      blocks: [
        { type: "start_program" },
        { type: "end_program" },
        { type: "input_value" },
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

    var variablesCategory = {
      name: "Variables",
      custom: 'VARIABLE',
    };
    var actionBlocks = [];
    var actionCategories = _.map(this.props.services, (service) => {
      var serviceActions = _.where(this.props.actions, {service_id: service.id});
      var serviceActionBlocks = _.map(serviceActions, (action) => {
				var actionParamsList = _.map(action.input, (param) => {
					return {
						type: 'nativesync_object_parameter',
						values: {
							'KEY': {type: 'text', fields: {'TEXT': param.name}},
							'VALUE': {type: 'text', fields: {'TEXT': param.type}}
						}
					};
				});
				console.log('action params list', actionParamsList);
				// super weird but we are basically constructing the
				// params tree by iterating through the params list in reverse
				// Its basically like building a linked list. Super fucking annoying
				// that we cant just pass a list.
				var paramsObject = {};
				for (var i = actionParamsList.length - 1; i >= 0 ; i--) {
					var currentParamsObject = paramsObject;
					paramsObject = actionParamsList[i];
					paramsObject['next'] = currentParamsObject;
				}
				console.log('paramsObject', paramsObject);

        var action = {
          type: 'nativesync_action',
          values: {
            "NAME": { type: 'text', fields: {'TEXT': action.internal_name} } ,
            "INPUT": {
							type: 'nativesync_object',
							values: {
								"PARAMS": paramsObject
							}
						}
          },
					next: {
						type: 'name_result',
						values:  {
							"NAME": { type: 'text', fields: {'TEXT': 'result'} } ,
						}
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

    var objectsCategory = {
      name: 'Objects',
      blocks: [
        { type: "nativesync_object" },
        { type: "nativesync_object_parameter" },
        { type: "get_object" },
        { type: "get_object_key" },
        { type: "set_object_key" },
      ]
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
      variablesCategory,
      objectsCategory,
      listsCategory,
      logicCategory,
      loopsCategory,
      mathCategory,
      textCategory,
      dataCategory,
    ]);
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
