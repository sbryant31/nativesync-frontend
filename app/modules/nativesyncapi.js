var request = require('request-promise')
var state = require('./state')
var env = process.env
var base = env.NS_API_URL ? env.NS_API_URL : 'https://api.nativesync.io/internal/'
var urljoin = require('url-join')

function call(path,data,method,authtoken,clienttoken){
  console.log(arguments)
  return request({
    method: method || 'POST',
    uri: urljoin(base,path),
    body: (method == 'POST' && data) ? data : {},
    qs: (method == 'GET' && data) ? data : {},
    json: true,
    headers: {
      Token: authtoken
    }
  }).catch((response) => {
    console.log(response);
    return response;
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

exports.getIntegrationById = function(id, token){
  return call('/integration/' + id, null, 'GET', token)
}

exports.getActionById = function(id, token){
  return call('/action/' + id,null,'GET',token)
}

exports.upsertAction = function(action, service, serviceAuths, token){
  return call('/actions/upsert',{action: action, service: service, serviceAuths: serviceAuths},'POST',token)
}
