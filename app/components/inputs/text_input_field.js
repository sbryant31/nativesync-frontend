var React = require('react');
// var _ = require('underscore');
// var lodash = require('lodash');
// var actions = require('../../modules/actions');
// var Select = require('react-select');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      onChange: (res) => { console.log(res); }
    };
  },
  render() {
    var self = this;
    return (
        <div>
            <label className="pt-label pt-inline col-xs">
                <span>{this.props.label}</span>
                <input className="pt-input pt-fill" onChange={this.props.onChange} value={this.props.value} />
            </label>
        </div>
    );
  }
});
