var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var ServiceAuthView = require('../service_auth/service_auth_view');
var OrganizationAuthEditor = require('../organization_auth/organization_auth_editor');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      organization: {},
      services: [],
      serviceAuths: [],
      organizationAuths: []
    };
  },
  render() {
    var self = this;
    var servicesById = _.indexBy(this.props.services, 'id');
    var organizationAuthsByServiceAuthID = _.indexBy(this.props.organizationAuths, 'service_auth_id');
    var organizationAuthList = lodash.map(this.props.serviceAuths, function(serviceAuth) {
      var service = servicesById[serviceAuth.service_id];
      return (
        <div>
          <OrganizationAuthEditor organization={self.props.organization} service={servicesById[serviceAuth.service_id]} serviceAuth={serviceAuth} organizationAuth={organizationAuthsByServiceAuthID[serviceAuth.id]} />
        </div>
      );
    });
    return <div>
      <h2>Service Authentications for Organization {self.props.organization.name}</h2>
      { organizationAuthList }
    </div>;
  }
});
