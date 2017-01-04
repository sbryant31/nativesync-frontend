var React = require('react');
var _ = require('underscore');

var Blockly = require('react-blockly-component');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      onChangeXml: (res) => { console.log(res); },
      onChangeCode: (res) => { console.log(res); },
      initialXml: ''
    };
  },
  render: function() {
    var Editor = React.createElement(Blockly.BlocklyEditor, {
      workspaceConfiguration: {
        grid: {
          spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true
        }
      },
      toolboxCategories: [
        {
          name: "Controls",
          blocks: [
            { type: "controls_if" },
            {
              type: "controls_repeat_ext",
              values: {
                "TIMES": {
                  type: "math_number",
                  shadow: true,
                  fields: {
                    "NUM": 10
                  }
                }
              },
              statements: {
                "DO": {
                  type: "text_print",
                  shadow: true,
                  values: {
                    "TEXT": {
                      type: "text",
                      shadow: true,
                      fields: {
                        "TEXT": "abc"
                      }
                    }
                  }
                }
              }
            }
          ]
        },
        {
          name: "Text",
          blocks: [
            { type: "text" },
            {
              type: "text_print",
              values: {
                "TEXT": {
                  type: "text",
                  shadow: true,
                  fields: {
                    "TEXT": "abc"
                  }
                }
              }
            }
          ]
        }
      ],
      initialXml: this.props.initialXml || '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>',
      wrapperDivClassName: 'fill-height',
      xmlDidChange: function(newXml) {
        console.log('new xml', newXml);
        this.props.onChangeXml(newXml);
      }
    });
    return <div style={{height: 500, width: 500}}>
      {Editor}
    </div>
  }
});
