var request = require('request-promise')
var state = require('./state')
var env = require('../../.env')
var base = env.NS_API_URL ? env.NS_API_URL : '/api'
var url = require('url')

function call(path,data,method,authtoken,clienttoken){
  console.log(base,path,url.resolve(base,path))
  return request({
    method:method || 'POST',
    uri:url.resolve(base,path),
    body:data || {},
    json:true,
    header:{
      Token:authtoken
    }
  })
}

exports.login = function(email,password){
  return call('auth/login',{email:email,password:password})
}

exports.signup = function(email,password){
  return call('auth/signup',{email:email,password:password})
}

exports.logout = function(token){
  return call('auth/logout',null,null,token)
}

exports.me = function(token){
  return call('auth/user',null,null,token)
}

exports.myAssociations = function(token){
  return call('me/associations',null,'GET',token)
}