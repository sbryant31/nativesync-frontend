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
const NavbarLayout = require('./pages/navbar_layout');

function checkToken(nextState,replace,cb){
  return actions.me().then(function(user){
    console.log('checktoken',user);
    if(user == null) {
      replace({pathname:'/login'});
    }
    cb();
  }).catch(function(){
    console.log('error checking token');
    // actions.toastError('error getting my user info')
    replace({pathname:'/login'});
    cb();
  });
}

function notLoggedIn(nextState,replace,cb){
  console.log(nextState);
  return actions.me().then(function(user){
    if(user){
      replace({
        pathname:'/dashboard'
      });
    }
    cb();
  }).catch(function(){
    cb();
  });
}

function logout(nextState,replace,cb){
  actions.logout().then(function(){
    replace({
      pathname:'/login'
    });
    cb();
  }).catch(function(err){
    actions.toastError(err);
    replace({
      pathname:'/login'
    });
    cb();
  });
}

module.exports = (
  <Router history = {browserHistory}>
    <Route path='/' component={App}>
      {/* <IndexRoute component={Marketplace} /> */}
      {/* <IndexRedirect to="/marketplace" /> */}
      <Route getComponent={(location, cb) => {
        cb(null, props => <NavbarLayout {...props} pagetitle="Ready to use Integrations" />);
      }}>
        <IndexRoute component={Marketplace} />
      </Route>
      <Route path='/login' component={Login} onEnter={notLoggedIn}/>
      <Route path='/logout' onEnter={logout}/>
      <Route path='/dashboard' component={NavbarLayout} onEnter={checkToken}>
        <IndexRoute component={Dashboard}/>
      </Route>
      <Route path='/actions/me' component={NavbarLayout}>
        <IndexRoute component={ActionsMe}/>
      </Route>
      <Route path='/actions/browse' component={NavbarLayout}>
        <IndexRoute component={ActionsBrowse}/>
      </Route>
      <Route path='/action/:id' component={NavbarLayout}>
        <IndexRoute component={ActionEdit}/>
      </Route>
      <Route path='/action/new' component={NavbarLayout}>
        <IndexRoute component={ActionEdit}/>
      </Route>
      <Route path='/integrations/me' component={NavbarLayout}>
        <IndexRoute component={IntegrationsMe}/>
      </Route>
      <Route path='/integrations/browse' component={NavbarLayout}>
        <IndexRoute component={IntegrationsBrowse}/>
      </Route>
      <Route path='/integration/:id' component={NavbarLayout}>
        <IndexRoute component={IntegrationView}/>
      </Route>
      <Route path='/integration/:integrationId/instance/new' component={NavbarLayout}>
        <IndexRoute component={IntegrationInstanceEdit}/>
      </Route>
      <Route path='/integration/:integrationId/instance/:id' component={NavbarLayout}>
        <IndexRoute component={IntegrationInstanceEdit}/>
      </Route>
      <Route path='/integration_instance/:id' component={NavbarLayout}>
        <IndexRoute component={IntegrationInstanceEdit}/>
      </Route>
      <Route path='/integration_instances' component={NavbarLayout}>
        <IndexRoute component={IntegrationInstancesMe}/>
      </Route>
      <Route path='/integration/new' component={NavbarLayout}>
        <IndexRoute component={IntegrationEdit}/>
      </Route>
      <Route path='/integration/:id/edit' component={NavbarLayout}>
        <IndexRoute component={IntegrationEdit}/>
      </Route>
      <Route path='/services/browse' component={NavbarLayout}>
        <IndexRoute component={ServicesBrowse}/>
      </Route>
      <Route path='/service/new' component={NavbarLayout}>
        <IndexRoute component={ServiceEdit}/>
      </Route>
      <Route path='/service/:id' component={NavbarLayout}>
        <IndexRoute component={ServiceEdit}/>
      </Route>
      <Route path='/organization/:id' component={NavbarLayout}>
        <IndexRoute component={OrganizationEdit}/>
      </Route>
      <Route path='/organization/new' component={NavbarLayout}>
        <IndexRoute component={OrganizationEdit}/>
      </Route>
      <Route path='/marketplace' getComponent={(location, cb) => {
        cb(null, props => <NavbarLayout {...props} pagetitle="Ready to use Integrations" />);
      }}>
        <IndexRoute component={Marketplace} />
      </Route>
      <Route path='/marketplace/request' component={NavbarLayout}>
        <IndexRoute component={MarketplaceRequest}/>
      </Route>
      <Route path='/marketplace/:id' component={NavbarLayout}>
        <IndexRoute component={Marketplace} />
      </Route>
      <Route path='/profile' component={Profile}/>
    </Route>
  </Router>
);
