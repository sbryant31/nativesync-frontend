var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var ServiceAuthView = require('../service_auth/service_auth_view');
var ClientAuthEditor = require('../client_auth/client_auth_editor');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      client: {},
      services: [],
      serviceAuths: [],
      clientAuths: []
    }
  },
  render() {
    var self = this;
    var servicesById = _.indexBy(this.props.services, 'id');
    var clientAuthsByServiceAuthID = _.indexBy(this.props.clientAuths, 'service_auth_id');
    var clientAuthList = lodash.map(this.props.serviceAuths, function(serviceAuth) {
      return (
        <div>
          <ServiceAuthView service={servicesById[serviceAuth.service_id]} serviceAuth={serviceAuth} readOnly />
          <ClientAuthEditor client={self.props.client} service={servicesById[serviceAuth.service_id]} serviceAuth={serviceAuth} clientAuth={clientAuthsByServiceAuthID[serviceAuth.id]} />
        </div>
      )
    });
    return <div>
      <h2>Service Authentications for Client {self.props.client.name}</h2>
      { clientAuthList }
    </div>
  }
})
