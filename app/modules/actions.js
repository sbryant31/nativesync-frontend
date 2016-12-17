var nsapi = require('./nativesyncapi')
//memory
var state = require('./state')
//persistence
var store = require('store')
var assert = require('assert')
import { browserHistory } from 'react-router'

//token gets loaded into memory on start
var token = state.get('token')

exports.getToken = function(){
  return token
}

exports.loginAsPartner = function(partner_id) {
  state.set('partner_id', partner_id);
  state.set('mode', 'partner');
}

exports.loginAsClient = function(client_id) {
  state.set('client_id', client_id);
  state.set('mode', 'client');
}

exports.login = function(username,password){
  return nsapi.login(username,password).then(function(t){
    assert(t,'login failed')
    state.set('token',t.token)
    token = t.token
    return exports.me()
  })
}

exports.signup = function(username,password, accountType, companyName){
  return nsapi.signup(username,password, accountType, companyName).then(function(user){
    assert(user,'signup failed')
    return exports.login(username,password)
  })
}

exports.logout = function(){
  return nsapi.logout(token).then(function(){
    state.set('token',null)
    state.set('me',null)
    token = null
    return true
  }).catch(function(){
    state.set('token',null)
    state.set('me',null)
    token = null
    return true
  })
}

exports.me = function(){
  return nsapi.me(token).then(function(user){
    console.log('me',user,token)
    assert(user,'user not found')
    return state.set('me',user)
  })
}

exports.getIntegrations = function(filter){
  return nsapi.getIntegrations(filter, token)
}

exports.getIntegrationById = function(id) {
  return nsapi.getIntegrationById(id, token)
}

exports.getActions = function(filter){
  return nsapi.getActions(filter, token)
}

exports.getActionById = function(id) {
  return nsapi.getActionById(id, token)
}

exports.myAssociations = function(){
  return nsapi.myAssociations(token).then(function(result){
    state.set('clients',result.clients)
    state.set('partners',result.partners)
    return result
  })
}

exports.toastError = function(error){
  state.set('error',error.message || error)
}

exports.goto = function(url){
  browserHistory.push(url)
}
