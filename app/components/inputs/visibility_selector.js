var React = require('react');
var actions = require('../../modules/actions');
var _ = require('underscore');

var Select = require('react-select');
import NumericInput from 'react-numeric-input';


module.exports = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  render() {
    var visibilityOptions = [
      {value: 'private', label: 'Private'},
      {value: 'published', label: 'Published'},
    ];
    return (
      <label className="pt-label pt-inline col-xs">
        Visibility
        <Select options= {visibilityOptions} value={ this.props.value } onChange={this.props.onChange.bind(this)} />
      </label>
    );
  }
});

