var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var ServiceAuthDetails = require('./service_auth_details');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      serviceAuth: {},
      service: {},
      selected: false
    }
  },
  render() {
    var self = this;
    return <div className="row">
      <div className="col-xs">
        { this.props.isSelected && <span className="pt-icon-confirm" /> }
      </div>
      <div className="col-xs-3">
        service: {this.props.service.name}
      </div>
      <div className="col-xs-3">
        name: { this.props.serviceAuth.name }
      </div>
      <div className="col-xs-3">
        <ServiceAuthDetails type={this.props.serviceAuth.type} details={this.props.serviceAuth.details} readOnly={self.props.readOnly} />
      </div>
    </div>
  }
})
