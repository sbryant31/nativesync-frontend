var nsapi = require('./nativesyncapi')
//memory
var state = require('./state')
var _ = require('underscore');
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

exports.setViewToOrg = function(org) {
  state.set('org', org);
  exports.goto('/dashboard');
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

exports.getServices = function(filter){
  return nsapi.getServices(filter, token)
}

exports.getOrganizationAuths = function(organizationId, serviceAuthIDs){
  return nsapi.getOrganizationAuths(organizationId, serviceAuthIDs, token);
}

exports.getOrganizations = function(filter){
  return nsapi.getOrganizations(filter, token)
}

exports.getIntegrationInstances = function(integrationId){
  return nsapi.getIntegrationInstances(integrationId, token)
}

exports.getIntegrationById = function(id, includeAssociations) {
  return nsapi.getIntegrationById(id, {includeAssociations: includeAssociations}, token)
}

exports.getServiceById = function(id) {
  return nsapi.getServiceById(id, token)
}

exports.getIntegrationInstanceById = function(id) {
  return nsapi.getIntegrationInstanceById(id, token)
}

exports.getOrganizationById = function(id) {
  return nsapi.getOrganizationById(id, token)
}

exports.getActions = function(filter){
  return nsapi.getActions(filter, token)
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

exports.upsertOrganization = function(org) {
  return nsapi.upsertOrganization(org, token)
  .then((result) => {
    return exports.goto('/organization/' + result.organization.id);
  })
}

exports.upsertIntegration = function(integration, services, actions, integrationCode) {
  return nsapi.upsertIntegration(integration, services, actions, integrationCode, token)
  .then((result) => {
    return exports.goto('/integration/' + result.integration.id);
  })
}

exports.upsertService = function(service, serviceAuths) {
  return nsapi.upsertService(service, serviceAuths, token)
}

exports.upsertIntegrationInstance = function(integrationInstance, integration, organization) {
  return nsapi.upsertIntegrationInstance(integrationInstance, integration, organization, token)
  .then((result) => {
    return exports.goto('/integration_instance/' + result.integrationInstance.id);
  })
}

exports.myAssociations = function(){
  return nsapi.myAssociations(token).then(function(result){
    state.set('organizations',result.organizations)
    return result
  })
}

exports.toastError = function(error){
  state.set('error',error.message || error)
}

exports.goto = function(url){
  browserHistory.push(url)
}
