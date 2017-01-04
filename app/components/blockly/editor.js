var React = require('react');
var _ = require('underscore');
var DOMParser = require('xmldom').DOMParser;

var toolbox = new DOMParser().parseFromString(`
<xml style="display: none" id="toolbox">
</xml>`);

var ReactBlockly = require('react-blockly-component');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      onChangeXml: (res) => { console.log(res); },
      services: [],
      actions: [],
      initialXml: ''
    };
  },
  render: function() {
    var self = this;

/*
		var variablesCategory: {
			name: 'Local Variables',
			custom: 'VARIABLE',
			blocks: []
		};

		var proceduresCategory: {
			name: 'Procedures',
			custom: 'PROCEDURE',
			blocks: []
		};
*/

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
		}

    var dataCategory = {
      name: "Data Storage", // TODO: Push, Get, Put
      blocks: [
        { type: "text" },
        { type: "text_join" },
			]
		}

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
		}
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
    var actionCategories = _.map(this.props.services, (service) => {
      var serviceActions = _.where(this.props.actions, {service_id: service.id})
      var serviceActionBlocks = _.map(serviceActions, (action) => {
        var name = `${action.organization_name}/${action.service_name}.${action.function_name}:${action.version}`;
        return {
          type: "thing",
          custom: 'PROCEDURE',
          values: {
            "NAME": {
              type: "text",
            },
            "INPUT": {
              type: "text",
            }
          },
          fields: {
            "NAME": 'name',
            "INPUT": 'input'
          },
        }
      })
      console.log('service action blocks', serviceActionBlocks);
      return {
        name: `${service.name} Actions`,
        blocks: serviceActionBlocks
      }
    });

    var actionsCategory = {
      name: 'Actions',
      categories: actionCategories
    }

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
		}
    var toolboxCategories = [
      logicCategory,
      loopsCategory,
			mathCategory,
			textCategory,
			listsCategory,
      //variablesCategory,
      //proceduresCategory,
			dataCategory,
      actionsCategory
    ]
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
    </div>
  }
});
