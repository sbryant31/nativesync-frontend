const React = require('react');
const ReactDOM = require('react-dom');
import { Router, Route, Link, browserHistory, IndexRoute, IndexRedirect } from 'react-router';

var actions = require('./modules/actions');

const App = require('./app');
const Landing = require('./pages/landing');
const IntegrationsMe = require('./pages/integrations_me');
const IntegrationInstancesMe = require('./pages/integration_instances_me');
import Marketplace from './pages/marketplace';
const MarketplaceRequest = require('./pages/marketplace_request');
const IntegrationsBrowse = require('./pages/integrations_browse');
const ServicesBrowse = require('./pages/services_browse');
const ServiceEdit = require('./pages/service_edit');
const IntegrationView = require('./pages/integration_view');
const IntegrationInstanceEdit = require('./pages/integration_instance_edit');
const IntegrationEdit = require('./pages/integration_edit');
const OrganizationEdit = require('./pages/organization_edit');
const ActionsMe = require('./pages/actions_me');
const ActionsBrowse = require('./pages/actions_browse');
const ActionEdit = require('./pages/action_edit');
const Profile = require('./pages/profile');
const Login = require('./pages/login');
const Dashboard = require('./pages/dashboard');

function checkToken(nextState,replace,cb) {
  return actions.me().then(user => {
    console.log('checktoken', user);
    cb();
  },
  // if not logged in, then we'll receive a rejected Promise
  (err) => {
    console.error(err);
    actions.toastError("Please log in first.");
    replace({pathname:'/'});
    cb();
  });
}

// NQ: TODO - do we really need this?
function notLoggedIn(nextState,replace,cb){
  console.log(nextState);
  return actions.me().then(user => {
    replace({ pathname:'/dashboard' });
    cb();
  }).catch(function(){
    cb();
  });
}

function logout(nextState, replace, cb){
  actions.logout().then(function(){
    // replace('/');
    cb();
  }).catch(function(err){
    actions.toastError(err);
    // replace({
    //   pathname:'/login'
    // });
    cb();
  });
}

// FOR CODE SPLITTING
function getComponentGenerator(Component) {
  return (nextState, cb) => { cb(null, (props) => (
    <Component {...props} />
  )); };
}

module.exports = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute getComponent={getComponentGenerator(Marketplace)} />
      <Route path='/login' getComponent={getComponentGenerator(Login)} onEnter={notLoggedIn}/>
      <Route path='/dashboard' getComponent={getComponentGenerator(Dashboard)} onEnter={checkToken} />
      <Route path='/actions/me' getComponent={getComponentGenerator(ActionsMe)} onEnter={checkToken} />
      <Route path='/actions/browse' getComponent={getComponentGenerator(ActionsBrowse)} onEnter={checkToken} />
      <Route path='/action/:id' getComponent={getComponentGenerator(ActionEdit)} onEnter={checkToken} />
      <Route path='/action/new' getComponent={getComponentGenerator(ActionEdit)} onEnter={checkToken} />
      <Route path='/integrations/me' getComponent={getComponentGenerator(IntegrationsMe)} onEnter={checkToken} />
      <Route path='/integrations/browse' getComponent={getComponentGenerator(IntegrationsBrowse)} onEnter={checkToken} />
      <Route path='/integration/:id' getComponent={getComponentGenerator(IntegrationView)} onEnter={checkToken} />
      <Route path='/integration/:integrationId/instance/new' getComponent={getComponentGenerator(IntegrationInstanceEdit)} onEnter={checkToken} />
      <Route path='/integration/:integrationId/instance/:id' getComponent={getComponentGenerator(IntegrationInstanceEdit)} onEnter={checkToken} />
      <Route path='/integration_instance/:id' getComponent={getComponentGenerator(IntegrationInstanceEdit)} onEnter={checkToken} />
      <Route path='/integration_instances' getComponent={getComponentGenerator(IntegrationInstancesMe)} onEnter={checkToken} />
      <Route path='/integration/new' getComponent={getComponentGenerator(IntegrationEdit)} onEnter={checkToken} />
      <Route path='/integration/:id/edit' getComponent={getComponentGenerator(IntegrationEdit)} onEnter={checkToken} />
      <Route path='/services/browse' getComponent={getComponentGenerator(ServicesBrowse)} onEnter={checkToken} />
      <Route path='/service/new' getComponent={getComponentGenerator(ServiceEdit)} onEnter={checkToken} />
      <Route path='/service/:id' getComponent={getComponentGenerator(ServiceEdit)} onEnter={checkToken} />
      <Route path='/organization/:id' getComponent={getComponentGenerator(OrganizationEdit)} onEnter={checkToken} />
      <Route path='/organization/new' getComponent={getComponentGenerator(OrganizationEdit)} onEnter={checkToken} />
      <Route path='/marketplace' getComponent={getComponentGenerator(Marketplace)} />
      <Route path='/marketplace/request' getComponent={getComponentGenerator(MarketplaceRequest)} />
      <Route path='/marketplace/:id' getComponent={getComponentGenerator(Marketplace)} />
      <Route path='/profile' getComponent={getComponentGenerator(Profile)} onEnter={checkToken} />
    </Route>
  </Router>
);
