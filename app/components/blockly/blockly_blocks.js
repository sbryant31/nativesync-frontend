module.exports = (services, actions, configuration) => {
  var Blockly = window.Blockly;
  Blockly.Blocks['get_object_by_name'] = {
    init: function() {
      this.appendValueInput("NAME")
          .appendField("Object named");
      this.setColour(90);
      this.setInputsInline(true);
      this.setOutput(true, 'nativesync_object');
    }
  };
  Blockly.Blocks['get_list_by_name'] = {
    init: function() {
      this.appendValueInput("NAME")
          .appendField("List named");
      this.setColour(90);
      this.setInputsInline(true);
      this.setOutput(true, 'Array');
    }
  };
  Blockly.Blocks['get_variable_by_name'] = {
    init: function() {
      this.appendValueInput("NAME")
          .appendField("Variable named");
      this.setColour(90);
      this.setInputsInline(true);
      this.setOutput(true);
    }
  };
  Blockly.Blocks['set_variable_by_name'] = {
    init: function() {
      this.appendValueInput("NAME")
          .appendField("Set variable named");
      this.appendValueInput("INPUT")
          .appendField("value");
      this.setColour(90);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };
  Blockly.Blocks['get_object_key'] = {
    init: function() {
      this.appendValueInput("NAME")
          .appendField("Object");
      this.appendValueInput("KEY")
          .appendField("Key");
      this.setColour(90);
      this.setInputsInline(true);
      this.setOutput(true);
    }
  };
  Blockly.Blocks['set_object_key'] = {
    init: function() {
      this.appendValueInput("NAME")
          .appendField("Set object");
      this.appendValueInput("KEY")
          .appendField("key");
      this.appendValueInput("VALUE")
          .appendField("value");
      this.setColour(120);
      this.setInputsInline(true);
      this.setOutput(true);
    }
  };
  Blockly.Blocks['nativesync_object_parameter'] = {
    init: function() {
      this.appendValueInput("KEY")
          .appendField("key");
      this.appendValueInput("VALUE")
          .appendField("value");
      this.setColour(150);
      this.setInputsInline(true);
      this.setPreviousStatement(true, 'nativesync_object_parameter');
      this.setNextStatement(true, 'nativesync_object_parameter');
    }
  };


    Blockly.Blocks['nativesync_object'] = {
      init: function() {
        this.appendDummyInput().appendField('New Object');
        this.appendStatementInput('PARAMS')
            .setCheck(['nativesync_object_parameter']);
        this.setOutput(true, 'nativesync_object');
        this.setColour(180);
      }
    };

    _.each(actions, (action) => {
       Blockly.Blocks[action.internal_name] = {
        init: function() {
          this.appendDummyInput().appendField(`${action.internal_name}`);
          _.each(action.input, (param) => {
            this.appendValueInput(param.name)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(`${param.name} [${param.type}]: `);
          })
          this.setPreviousStatement(true);
          this.setNextStatement(true);
          this.setColour(270);
          this.setTooltip('');
          this.setHelpUrl('http://www.example.com/');
        }
      };
       Blockly.Blocks[`result_${action.internal_name}`] = {
        init: function() {
          this.appendDummyInput().appendField('Name outputs');
          _.each(action.output, (param) => {
            this.appendValueInput(param.name)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(`${param.name}`);
          })
          this.setPreviousStatement(true);
          this.setNextStatement(true);
          this.setColour(200);
          this.setTooltip('');
          this.setHelpUrl('http://www.example.com/');
        }
      };
    })

   Blockly.Blocks['data_set'] = {
      init: function() {
        this.appendValueInput("KEY")
            .setCheck("String")
            .appendField("Persist data key");
        this.appendValueInput("VALUE")
            .setCheck("nativesync_object")
            .appendField("value");
        this.setOutput(true, 'boolean');
        this.setInputsInline(true);
        this.setColour(140);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };

     Blockly.Blocks['data_get'] = {
      init: function() {
        this.appendDummyInput().appendField('Retrieve data');
        this.appendValueInput("KEY")
            .setCheck("String")
            .appendField("key");
        this.setOutput(true, 'nativesync_object');
        this.setInputsInline(true);
        this.setColour(170);
      }
    };

     Blockly.Blocks['name_result'] = {
      init: function() {
        this.appendValueInput("NAME")
            .setCheck("String")
            .appendField("Name outputs as variables");
        this.setColour(200);
        this.setPreviousStatement(true, 'nativesync_object');
        this.setNextStatement(true);
        this.setTooltip('end the program with an optional value');
        this.setHelpUrl('http://www.example.com/');
      }
    };

    Blockly.Blocks[`input_by_key`] = {
      init: function() {
        this.appendValueInput("NAME")
            .setCheck("String")
            .appendField("Input named");
        this.setColour(230);
        this.setOutput(true);
        this.setTooltip('end the program with an optional value');
        this.setHelpUrl('http://www.example.com/');
      }
    };
    _.each(configuration.fields, (field) => {
      Blockly.Blocks[`input_${field.key}`] = {
        init: function() {
          this.appendDummyInput().appendField(`Input ${field.label}`);
          this.setColour(230);
          this.setOutput(true);
          this.setTooltip('end the program with an optional value');
          this.setHelpUrl('http://www.example.com/');
        }
      };

    })

     Blockly.Blocks['start_program'] = {
      init: function() {
        this.appendDummyInput().appendField('Start integration');
        this.setColour(230);
        this.setNextStatement(true);
        this.setTooltip('end the program with an optional value');
        this.setHelpUrl('http://www.example.com/');
      }
    };

     Blockly.Blocks['end_program'] = {
      init: function() {
        this.appendDummyInput().appendField('End integration');
        this.appendValueInput("object")
            .setCheck("nativesync_object")
            .appendField("Output");
        this.setPreviousStatement(true);
        this.setInputsInline(true);
        this.setColour(270);
        this.setTooltip('end the program with an optional value');
        this.setHelpUrl('http://www.example.com/');
      }
    };

     Blockly.Blocks['log_value'] = {
      init: function() {
        this.appendDummyInput().appendField('Log value');
        this.appendValueInput("object")
            .setCheck("nativesync_object")
            .appendField("Object");
        this.appendValueInput("message")
            .appendField("Message");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(300);
        this.setTooltip('log a message and an object');
        this.setHelpUrl('http://www.example.com/');
      }
    };

};
