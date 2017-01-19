var request = require('request-promise');
var state = require('./state');
var env = process.env;
var base = env.NS_API_URL ? env.NS_API_URL : 'https://api.nativesync.io/internal/';
var urljoin = require('url-join');

function call(path, data, method, authtoken, organizationtoken) {
  console.log(arguments);
  var meth = method || 'POST';
  var opts = {
    method: meth,
    uri: urljoin(base, path),
    body: (meth == 'POST' && data) ? data : {},
    qs: (meth == 'GET' && data) ? data : {},
    json: true,
  };
  if (authtoken) opts['headers'] = { Token: authtoken };

  return request(opts).catch((response) => {
    console.log(response);
    throw response;
  });
}

exports.login = function(email, password) {
  return call('auth/login', {email:email, password:password});
};

exports.signup = function(first_name, last_name, email, password, accountType, companyName) {
  return call('auth/signup', {
    first_name,
    last_name,
    email,
    password,
    accountType,
    companyName
  });
};

exports.logout = function(token) {
  return call('auth/logout', null, null, token);
};

exports.me = function(token) {
  return call('me', null, 'GET', token);
};

exports.myAssociations = function(token) {
  return call('me/associations', null, 'GET', token);
};

exports.getActions = function(filter, token) {
  return call('/actions', filter, 'GET', token);
};

exports.verifyDiscountCode = function(code, token) {
  return call('/marketplace/checkDiscount', {code: code}, 'GET', token)
};

exports.duplicateAction = function(actionId, organizationId, token) {
  return call('/action/' + actionId + '/duplicate', {organization_id: organizationId}, 'POST', token);
};

exports.getServices = function(filter, token) {
  return call('/services', filter, 'GET', token);
};

exports.getServiceAuths = function(service_id, token) {
  return call('/service_auths', {service_id: service_id}, 'GET', token);
};

exports.getServiceDefinitions = function(service_id, token) {
  return call('/service_definitions', {service_id: service_id}, 'GET', token);
};

exports.getIntegrations = function(filter, token) {
  return call('/integrations', filter, 'GET', token);
};

exports.getMarketplaceIntegrations = function(filter) {
  return call('/marketplace/integrations', filter, 'GET');
};

exports.getIntegrationById = function(id, options, token) {
  return call('/integration/' + id, options, 'GET', token)
}

exports.getIntegrationRequestById = function(id, token) {
  return call('/integration_request/' + id, {}, 'GET', token)
}

exports.getOrganizationAuths = function(organizationId, serviceAuthIds, token) {
  return call('/organization_auths', {organization_id: organizationId, service_auth_ids: serviceAuthIds}, 'GET', token);
};

exports.getOrganizations = function(filter, token) {
  return call('/organizations', filter, 'GET', token);
};

exports.getIntegrationInstances = function(integrationId, token) {
  return call('/integration/' + integrationId + '/instances', {}, 'GET', token);
};

exports.getIntegrationInstancesForOrg = function(organizationId, token) {
  return call('/integration_instances/', {organization_id: organizationId}, 'GET', token);
};

exports.getIntegrationInstanceById = function(id, token) {
  return call('/integration_instance/' + id, {}, 'GET', token);
};

exports.getServiceById = function(id, token) {
  return call('/service/' + id, {}, 'GET', token);
};

exports.getMarketplaceIntegrationById = function(id) {
  return call('/marketplace/integration/' + id, {}, 'GET');
};

exports.getOrganizationById = function(id, token) {
  return call('/organization/' + id, null, 'GET', token);
};

exports.getActionById = function(id, token) {
  return call('/action/' + id, null, 'GET', token);
};

exports.upsertAction = function(action, service, serviceAuths, token) {
  return call('/actions/upsert', {action: action, service: service, serviceAuths: serviceAuths}, 'POST', token);
};

exports.updateUser = function(data, token) {
  return call('/me/update', data, 'POST', token);
};

exports.updateOrganization = function(organization, token) {
  return call('/me/updateOrg', {organization: organization}, 'POST', token);
};

exports.testAction = function(id, organizationId, input, token) {
  return call('/actions/test', {id: id, organizationId: organizationId, input: input}, 'POST', token);
};

exports.testIntegration = function(id, organizationId, input, token) {
  return call('/integrations/test', {id: id, organizationId: organizationId, input: input}, 'POST', token);
};

exports.upsertService = function(service, serviceAuths, serviceDefinitions, token) {
  return call('/services/upsert', {service: service, serviceAuths: serviceAuths, serviceDefinitions: serviceDefinitions}, 'POST', token);
};

exports.saveOrganizationAuth = function(organizationAuth, token){
  return call('/organization_auths/upsert',{organizationAuth: organizationAuth},'POST',token);
};


exports.upsertOrganization = function(organization, token) {
  return call('/organizations/upsert', {organization: organization}, 'POST', token);
};


exports.createIntegrationRequest = function(integrationRequest, token) {
  return call('/integration_requests', {integrationRequest: integrationRequest}, 'POST', token);
};

exports.updateIntegrationRequest = function(id, data, token) {
  return call('/integration_request/' + id , data, 'POST', token);
};

exports.upsertIntegration = function(integration, services, actions, integrationCode, token) {
  return call('/integrations/upsert', {integration: integration, services: services, actions: actions, integrationCode: integrationCode}, 'POST', token);
};

exports.upsertIntegrationInstance = function(integrationInstance, integration, organization, token) {
  return call('/integration_instances/upsert', {integrationInstance: integrationInstance, integration: integration, organization: organization}, 'POST', token);
};
