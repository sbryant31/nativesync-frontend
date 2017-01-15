const React = require('react');
const ReactDOM = require('react-dom');
import { Router, Route, Link, browserHistory, IndexRoute, IndexRedirect } from 'react-router';

var actions = require('./modules/actions');

const App = require('./app');
const Landing = require('./pages/landing');
// bundle?lazy! Webpack directive below is for code splitting
const IntegrationsMe = require('bundle?lazy!./pages/integrations_me');
const IntegrationInstancesMe = require('bundle?lazy!./pages/integration_instances_me');
const Marketplace = require('bundle?lazy!./pages/marketplace');
const MarketplaceRequest = require('bundle?lazy!./pages/marketplace_request');
const IntegrationsBrowse = require('bundle?lazy!./pages/integrations_browse');
const ServicesBrowse = require('bundle?lazy!./pages/services_browse');
const ServiceEdit = require('bundle?lazy!./pages/service_edit');
const IntegrationView = require('bundle?lazy!./pages/integration_view');
const IntegrationInstanceEdit = require('bundle?lazy!./pages/integration_instance_edit');
const IntegrationEdit = require('bundle?lazy!./pages/integration_edit');
const OrganizationEdit = require('bundle?lazy!./pages/organization_edit');
const ActionsMe = require('bundle?lazy!./pages/actions_me');
const ActionsBrowse = require('bundle?lazy!./pages/actions_browse');
const ActionEdit = require('bundle?lazy!./pages/action_edit');
const Profile = require('bundle?lazy!./pages/profile');
const Login = require('bundle?lazy!./pages/login');
const Dashboard = require('bundle?lazy!./pages/dashboard');

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
// function lazyLoadComponent(Component) {
//   return (location, cb) => { cb(null, (props) => (
//     <Component {...props} />
//   )); };
// }
const lazyLoadComponent = lazyModule => {
  return (location, cb) => {
    lazyModule(Module => (
      cb(null, props => (
        <Module {...props} />))
      )
    );
  };
};

module.exports = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute getComponent={lazyLoadComponent(Marketplace)} />
      <Route path='/login' getComponent={lazyLoadComponent(Login)} onEnter={notLoggedIn}/>
      <Route path='/dashboard' getComponent={lazyLoadComponent(Dashboard)} onEnter={checkToken} />
      <Route path='/actions/me' getComponent={lazyLoadComponent(ActionsMe)} onEnter={checkToken} />
      <Route path='/actions/browse' getComponent={lazyLoadComponent(ActionsBrowse)} onEnter={checkToken} />
      <Route path='/action/:id' getComponent={lazyLoadComponent(ActionEdit)} onEnter={checkToken} />
      <Route path='/action/new' getComponent={lazyLoadComponent(ActionEdit)} onEnter={checkToken} />
      <Route path='/integrations/me' getComponent={lazyLoadComponent(IntegrationsMe)} onEnter={checkToken} />
      <Route path='/integrations/browse' getComponent={lazyLoadComponent(IntegrationsBrowse)} onEnter={checkToken} />
      <Route path='/integration/:id' getComponent={lazyLoadComponent(IntegrationView)} onEnter={checkToken} />
      <Route path='/integration/:integrationId/instance/new' getComponent={lazyLoadComponent(IntegrationInstanceEdit)} onEnter={checkToken} />
      <Route path='/integration/:integrationId/instance/:id' getComponent={lazyLoadComponent(IntegrationInstanceEdit)} onEnter={checkToken} />
      <Route path='/integration_instance/:id' getComponent={lazyLoadComponent(IntegrationInstanceEdit)} onEnter={checkToken} />
      <Route path='/integration_instances' getComponent={lazyLoadComponent(IntegrationInstancesMe)} onEnter={checkToken} />
      <Route path='/integration/new' getComponent={lazyLoadComponent(IntegrationEdit)} onEnter={checkToken} />
      <Route path='/integration/:id/edit' getComponent={lazyLoadComponent(IntegrationEdit)} onEnter={checkToken} />
      <Route path='/services/browse' getComponent={lazyLoadComponent(ServicesBrowse)} onEnter={checkToken} />
      <Route path='/service/new' getComponent={lazyLoadComponent(ServiceEdit)} onEnter={checkToken} />
      <Route path='/service/:id' getComponent={lazyLoadComponent(ServiceEdit)} onEnter={checkToken} />
      <Route path='/organization/:id' getComponent={lazyLoadComponent(OrganizationEdit)} onEnter={checkToken} />
      <Route path='/organization/new' getComponent={lazyLoadComponent(OrganizationEdit)} onEnter={checkToken} />
      <Route path='/marketplace' getComponent={lazyLoadComponent(Marketplace)} />
      <Route path='/marketplace/request' getComponent={lazyLoadComponent(MarketplaceRequest)} />
      <Route path='/marketplace/:id' getComponent={lazyLoadComponent(Marketplace)} />
      <Route path='/profile' getComponent={lazyLoadComponent(Profile)} onEnter={checkToken} />
    </Route>
  </Router>
);
