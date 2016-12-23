var nsapi = require('./nativesyncapi')
//memory
var state = require('./state')
//persistence
var store = require('store')
var assert = require('assert')
import { browserHistory } from 'react-router'

//token gets loaded into memory on start
var token = state.get('token')

exports.getState = function(key) {
  return state.get(key);
}

exports.getToken = function(){
  return token
}

exports.setViewToOrg = function(type, org) {
  // {partner: <partner>, mode: 'partner', 'org': <partner>}
  state.set(type, org);
  state.set('mode', type);
  state.set('org', org);
  exports.goto('/dashboard');
}

exports.loginAsClient = function(client) {
  state.set('client', client);
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

exports.getClients = function(filter){
  return nsapi.getClients(filter, token)
}

exports.getIntegrationInstances = function(integrationId){
  return nsapi.getIntegrationInstances(integrationId, token)
}

exports.getIntegrationById = function(id, includeAssociations) {
  return nsapi.getIntegrationById(id, {includeAssociations: includeAssociations}, token)
}

exports.getIntegrationInstanceById = function(id) {
  return nsapi.getIntegrationInstanceById(id, token)
}

exports.getClientById = function(id) {
  return nsapi.getClientById(id, token)
}

exports.getPartnerById = function(id) {
  return nsapi.getPartnerById(id, token)
}

exports.getActions = function(filter){
  return nsapi.getActions(filter, token)
}

exports.getServices = function(filter){
  return nsapi.getServices(filter, token)
}

exports.getServiceAuths = function(service_id){
  return nsapi.getServiceAuths(service_id, token)
}

exports.getActionById = function(id) {
  return nsapi.getActionById(id, token)
}

exports.upsertAction = function(action, service, serviceAuths) {
  return nsapi.upsertAction(action, service, serviceAuths, token)
  .then((result) => {
    return exports.goto('/action/' + result.action.id);
  })
}

exports.upsertClient = function(client) {
  return nsapi.upsertClient(client, token)
  .then((result) => {
    return exports.goto('/client/' + result.client.id);
  })
}

exports.upsertPartner = function(partner) {
  return nsapi.upsertPartner(partner, token)
  .then((result) => {
    return exports.goto('/partner/' + result.partner.id);
  })
}

exports.upsertIntegration = function(integration, services, actions, integrationCode) {
  return nsapi.upsertIntegration(integration, services, actions, integrationCode, token)
  .then((result) => {
    return exports.goto('/integration/' + result.integration.id);
  })
}

exports.upsertIntegrationInstance = function(integrationInstance, integration, client) {
  return nsapi.upsertIntegrationInstance(integrationInstance, integration, client, token)
  .then((result) => {
    return exports.goto('/integration_instance/' + result.integrationInstance.id);
  })
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
