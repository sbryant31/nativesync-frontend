var React = require('react');
// var _ = require('underscore');
var lodash = require('lodash');
// var actions = require('../../modules/actions');
// var Select = require('react-select');
var ActionDocumentation = require('./action_documentation');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      actions: [],
    };
  },
  render() {
    var documentationList = lodash.map(this.props.actions, function(action) {
      return <div>
        <ActionDocumentation action={action} />
      </div>;
    });
    return <div style={{height:350, overflow:'auto'}}>
      { documentationList }
    </div>;
  }
});
