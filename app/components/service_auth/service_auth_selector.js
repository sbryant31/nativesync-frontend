var React = require('react');
// var _ = require('underscore');
// var lodash = require('lodash');
// var Select = require('react-select');
// var actions = require('../../modules/actions');
var ServiceAuthList = require('./service_auth_list');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      onSelectChange: () => {},
      serviceAuths: [],
      selected: [],
      service: {},
    }
  },
  render() {
    var self = this;
    return <label className="pt-label pt-inline col-xs">
      <h4>Authentication Schemes for {this.props.service.name}</h4>
      <ServiceAuthList
        serviceAuths={this.props.serviceAuths}
        selected={this.props.selected}
        services={[this.props.service]}
        onSelectChange={this.props.onSelectChange}
        readOnly />
    </label>
  }
})
