var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
// var Select = require('react-select');
// var actions = require('../../modules/actions');
var ServiceAuthView = require('../service_auth/service_auth_view');
var OrganizationServiceAuthEditor = require('../organization_service_auth/organization_service_auth_editor');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      organization: {},
      services: [],
      serviceAuths: [],
      organizationServiceAuths: []
    }
  },
  render() {
    var self = this;
    var servicesById = _.indexBy(this.props.services, 'id');
    var organizationServiceAuthsByServiceAuthID = _.indexBy(this.props.organizationServiceAuths, 'service_auth_id');
    var organizationServiceAuthList = lodash.map(this.props.serviceAuths, function(serviceAuth) {
      return (
        <div>
          <ServiceAuthView service={servicesById[serviceAuth.service_id]} serviceAuth={serviceAuth} readOnly />
          <OrganizationServiceAuthEditor organization={self.props.organization} service={servicesById[serviceAuth.service_id]} serviceAuth={serviceAuth} organizationServiceAuth={organizationServiceAuthsByServiceAuthID[serviceAuth.id]} />
        </div>
      )
    });
    return <div>
      <h2>Service Authentications for Organization {self.props.organization.name}</h2>
      { organizationServiceAuthList }
    </div>
  }
})
