var React = require('react');
// var actions = require('../../modules/actions');
// var _ = require('underscore');

var Select = require('react-select');
// import NumericInput from 'react-numeric-input';


module.exports = React.createClass({
	getDefaultProps: function() {
		return {
			value: null,
			onChange: function(select) { console.log('change', select) }
		}
	},
  render() {
    var environmentOptions = [
      {label: 'Developer', value: 'developer'},
      {label: 'Test', value: 'test'},
      {label: 'Production', value: 'production'}
    ];
    return (
      <label className="pt-label pt-inline col-xs">
				Environment
        <Select options= {environmentOptions} value={ this.props.value } onChange={this.props.onChange.bind(this)} />
      </label>
    );
  }
});
