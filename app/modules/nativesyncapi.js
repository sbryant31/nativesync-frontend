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
    body: data || {},
    json: true,
    headers: {
      Token: authtoken
    }
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

exports.getActions = function(token){
  return call('/actions',null,'GET',token)
}

exports.getActionById = function(id, token){
  return call('/action/' + id,null,'GET',token)
}
