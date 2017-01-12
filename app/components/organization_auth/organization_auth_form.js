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
      organizationAuths: [],
      onChange: function(orgs) { console.log('change', orgs) }
    };
  },
  handleChange: function(index, organizationAuth) {
    var organizationAuths = this.props.organizationAuths;
    organizationAuths[index] = organizationAuth;
    this.props.onChange(organizationAuths);
  },
  render() {
    var self = this;
    var servicesById = _.indexBy(this.props.services, 'id');
    var organizationAuthsByServiceAuthID = _.indexBy(this.props.organizationAuths, 'service_auth_id');
    console.log('org auths', organizationAuthsByServiceAuthID);
    var organizationAuthList = lodash.map(this.props.serviceAuths, function(serviceAuth, index) {
      var service = servicesById[serviceAuth.service_id];
      var organizationAuth = organizationAuthsByServiceAuthID[serviceAuth.id];
      return (
        <div>
          <OrganizationAuthEditor
            organization={self.props.organization}
            service={servicesById[serviceAuth.service_id]}
            serviceAuth={serviceAuth}
            organizationAuth={organizationAuth}
            onChange={self.handleChange.bind(self, index)}
           />
        </div>
      );
    });
    return <div>
      <h2>Service Authentications for Organization {self.props.organization.name}</h2>
      { organizationAuthList }
    </div>;
  }
});
