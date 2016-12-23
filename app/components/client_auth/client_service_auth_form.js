var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var ServiceAuthView = require('../service_auth/service_auth_view');
var ClientServiceAuthEditor = require('../client_service_auth/client_service_auth_editor');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
			client: {},
			services: [],
			serviceAuths: [],
			clientServiceAuths: []
    }
  },
  render() {
    var self = this;
		var servicesById = _.indexBy(this.props.services, 'id');
		var clientServiceAuthsByServiceAuthID = _.indexBy(this.props.clientServiceAuths, 'service_auth_id');
		var clientServiceAuthList = lodash.map(this.props.serviceAuths, function(serviceAuth) {
			return (
				<div>
					<ServiceAuthView service={servicesById[serviceAuth.service_id]} serviceAuth={serviceAuth} readOnly />
					<ClientServiceAuthEditor client={self.props.client} service={servicesById[serviceAuth.service_id]} serviceAuth={serviceAuth} clientServiceAuth={clientServiceAuthsByServiceAuthID[serviceAuth.id]} />
				</div>
			)
		});
    return <div>
			<h2>Service Authentications for Client {self.props.client.name}</h2>
			{ clientServiceAuthList }
    </div>
  }
})
