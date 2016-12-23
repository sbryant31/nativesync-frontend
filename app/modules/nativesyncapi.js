var request = require('request-promise')
var state = require('./state')
var env = process.env
var base = env.NS_API_URL ? env.NS_API_URL : 'https://api.nativesync.io/internal/'
var urljoin = require('url-join')

function call(path,data,method,authtoken,clienttoken){
  console.log(arguments)
  var method = method || 'POST';
  return request({
    method: method,
    uri: urljoin(base,path),
    body: (method == 'POST' && data) ? data : {},
    qs: (method == 'GET' && data) ? data : {},
    json: true,
    headers: {
      Token: authtoken
    }
  }).catch((response) => {
    console.log(response);
    throw response;
  })
}

exports.login = function(email,password){
  return call('auth/login',{email:email,password:password})
}

exports.signup = function(email,password, accountType, companyName){
  return call('auth/signup',{email:email,password:password, accountType: accountType, companyName: companyName})
}

exports.logout = function(token){
  return call('auth/logout',null,null,token)
}

exports.me = function(token){
  return call('me',null,'GET',token)
}

exports.myAssociations = function(token){
  return call('me/associations',null,'GET',token)
}

exports.getActions = function(filter, token){
  return call('/actions', filter,'GET',token)
}

exports.getServices = function(filter, token){
  return call('/services', filter,'GET',token)
}

exports.getServiceAuths = function(service_id, token){
  return call('/service_auths', {service_id: service_id}, 'GET',token)
}

exports.getIntegrations = function(filter, token){
  return call('/integrations', filter, 'GET', token)
}

exports.getClients = function(filter, token){
  return call('/clients', filter, 'GET', token)
}

exports.getIntegrationInstances = function(integrationId, token){
  return call('/integration/' + integrationId + '/instances', {}, 'GET', token)
}

exports.getIntegrationInstanceById = function(id, token){
  return call('/integration_instance/' + id, {}, 'GET', token)
}

exports.getIntegrationById = function(id, options, token){
  return call('/integration/' + id, options, 'GET', token)
}

exports.getClientById = function(id, token){
  return call('/client/' + id, null, 'GET', token)
}

exports.getPartnerById = function(id, token){
  return call('/partner/' + id, null, 'GET', token)
}

exports.getActionById = function(id, token){
  return call('/action/' + id,null,'GET',token)
}

exports.upsertAction = function(action, service, serviceAuths, token){
  return call('/actions/upsert',{action: action, service: service, serviceAuths: serviceAuths},'POST',token)
}

exports.upsertClient = function(client, token){
  return call('/clients/upsert',{client: client},'POST',token)
}

exports.upsertPartner = function(partner, token){
  return call('/partners/upsert',{partner: partner},'POST',token)
}

exports.upsertIntegration = function(integration, services, actions, integrationCode, token){
  return call('/integrations/upsert',{integration: integration, services: services, actions: actions, integrationCode: integrationCode},'POST',token)
}

exports.upsertIntegrationInstance = function(integrationInstance, integration, client, token){
  return call('/integration_instances/upsert',{integrationInstance: integrationInstance, integration: integration, client: client},'POST',token)
}
