var nsapi = require('./nativesyncapi');
//memory
var state = require('./state');
var _ = require('underscore');
//persistence
var store = require('store');
var assert = require('assert');
import { browserHistory } from 'react-router';

//token gets loaded into memory on start
var token = state.get('token');

exports.getState = function(key) {
  return state.get(key);
};

exports.getToken = function(){
  return token;
};

exports.setViewToOrg = function(org) {
  state.set('org', org);
  var user = state.get('me');
  user.default_organization_id = org.id;
  state.set('me', user);

  return exports.updateUser({default_organization_id: org.id})
  .then((result) => {
    exports.goto('/dashboard');
  });
};

exports.login = function(username,password){
  return nsapi.login(username, password).then(function(t) {
    assert(t, 'login failed');
    state.set('token', t.token);
    token = t.token;
    return exports.me();
  });
};

exports.signup = function(username,password, accountType, companyName){
  return nsapi.signup(username,password, accountType, companyName).then(function(user){
    assert(user,'signup failed');
    return exports.login(username,password);
  });
};

exports.logout = function(){
  return nsapi.logout(token).then(function(){
    state.set('token',null);
    state.set('me',null);
    token = null;
    return true;
  }).catch(function(){
    state.set('token',null);
    state.set('me',null);
    token = null;
    return true;
  });
};

exports.me = function(){
  return token ?
    // only call API to check token if there is one to check in the first place
    nsapi.me(token)
    .then(function(user) {
      console.log('me', user, token);
      assert(user,'user not found');
      return state.set('me', user);
    }) :
    // otherwise return null straight away
    Promise.reject('not logged in');
};

exports.getIntegrations = function(filter){
  return nsapi.getIntegrations(filter, token);
};

exports.getMarketplaceIntegrations = function(filter){
  return nsapi.getMarketplaceIntegrations(filter);
};

exports.getServices = function(filter){
  return nsapi.getServices(filter, token);
};

exports.getOrganizationAuths = function(organizationId, serviceAuthIDs){
  return nsapi.getOrganizationAuths(organizationId, serviceAuthIDs, token);
};

exports.getOrganizations = function(filter){
  return nsapi.getOrganizations(filter, token);
};

exports.getIntegrationInstances = function(integrationId){
  return nsapi.getIntegrationInstances(integrationId, token);
};

exports.getIntegrationInstancesForOrg = function(organizationId){
  return nsapi.getIntegrationInstancesForOrg(organizationId, token);
};

exports.getIntegrationById = function(id, includeAssociations) {
  return nsapi.getIntegrationById(id, {includeAssociations: includeAssociations}, token);
};

exports.getMarketplaceIntegrationById = function(id) {
  return nsapi.getMarketplaceIntegrationById(id);
};

exports.duplicateAction = function(actionId) {
  var org = exports.getState('org');
  return nsapi.duplicateAction(actionId, org.id, token)
  .then((result) => {
    exports.goto('/action/' + result.action.id);
  });
};

exports.getServiceById = function(id) {
  return nsapi.getServiceById(id, token);
};

exports.getIntegrationInstanceById = function(id) {
  return nsapi.getIntegrationInstanceById(id, token);
};

exports.updateUser = function(data) {
  return nsapi.updateUser(data, token);
};

exports.getOrganizationById = function(id) {
  return nsapi.getOrganizationById(id, token);
};

exports.getActions = function(filter){
  return nsapi.getActions(filter, token);
};

exports.getServiceAuths = function(service_id){
  return nsapi.getServiceAuths(service_id, token);
};

exports.getServiceDefinitions = function(service_id){
  return nsapi.getServiceDefinitions(service_id, token);
};

exports.getActionById = function(id) {
  return nsapi.getActionById(id, token);
};

exports.upsertAction = function(action, service, serviceAuths) {
  if (!action.organization_id) {
    var org = exports.getState('org');
    action.organization_id = org.id;
    action.organization_name = org.name;
  }
  return nsapi.upsertAction(action, service, serviceAuths, token)
  .then((result) => {
    exports.goto('/action/' + result.action.id);
    return result;
  });
};

exports.saveOrganizationAuth = function(organizationAuth) {
  return nsapi.saveOrganizationAuth(organizationAuth, token)
};

exports.testAction = function(id, organizationId, input) {
  return nsapi.testAction(id, organizationId, input, token);
};

exports.testIntegration = function(id, organizationId, input) {
  return nsapi.testIntegration(id, organizationId, input, token);
};

exports.upsertOrganization = function(org) {
  return nsapi.upsertOrganization(org, token)
  .then((result) => {
    return exports.goto('/organization/' + result.organization.id);
  });
};

exports.upsertIntegration = function(integration, services, actions, integrationCode) {
  if (!integration.organization_id) {
    integration.organization_id = exports.getState('org').id;
  }
  return nsapi.upsertIntegration(integration, services, actions, integrationCode, token)
  .then((result) => {
    exports.goto('/integration/' + result.integration.id);
    return result;
  });
};

exports.upsertService = function(service, serviceAuths, serviceDefinitions) {
  return nsapi.upsertService(service, serviceAuths, serviceDefinitions, token)
  .then((result) => {
    exports.goto('/service/' + result.service.id);
    return result;
  });
};

exports.upsertIntegrationInstance = function(integrationInstance, integration, organization) {
  return nsapi.upsertIntegrationInstance(integrationInstance, integration, organization, token)
  .then((result) => {
    exports.goto('/integration_instance/' + result.integrationInstance.id);
    return result;
  });
};

exports.myAssociations = function(){
  return nsapi.myAssociations(token).then(function(result){
    state.set('organizations',result.organizations);
    return result;
  });
};

exports.toastError = function(error){
  state.set('error',error.message || error);
};

exports.goto = function(url /*, params_obj*/) {
  browserHistory.push({
    pathname: url,
    // query: params_obj
  });
};
