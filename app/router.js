var React = require('react')
var ReactDOM = require('react-dom')
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

var actions = require('./modules/actions')


var App = require('./app')
var Landing = require('./pages/landing')
var ClientDashboard = require('./pages/client_dashboard')
// ClientDashboard = require('./pages/client_gigs_new')
var ClientGigs = require('./pages/client_gigs')
var ClientGigsNew = require('./pages/client_gigs_new')
var Partners = require('./pages/partners')
var PartnerDashboard = require('./pages/partner_dashboard')
var Integrations = require('./pages/integrations')
var ClientProfile = require('./pages/client_profile')
var PartnerProfile = require('./pages/partner_profile')
var PartnerGigs = require('./pages/partner_gigs')
var Actions = require('./pages/actions');
var Gigs = require('./pages/gigs');
var PartnerIntegrationsNew = require('./pages/partner_integrations_new');
var PartnerIntegrations = require('./pages/partner_integrations');
var PartnerActionsNew = require('./pages/partner_actions_new');
var PartnerActions = require('./pages/partner_actions');
var PartnerClientsNew = require('./pages/partner_clients_new');
var PartnerClients = require('./pages/partner_clients');
var Profile = require('./pages/profile');
var Login = require('./pages/login')
var Dashboard = require('./pages/dashboard')


function checkToken(nextState,replace,cb){
  return actions.me().then(function(user){
    if(user) {
      replace({pathname:'/dashboard'})
    }else{
      replace({pathname:'/login'})
    }
    cb()
  }).catch(function(){
    replace({pathname:'/login'})
    cb()
  })
}

function logout(nextState,replace,cb){
  actions.logout().then(function(){
    replace({
      pathname:'/login'
    })
    cb()
  }).catch(function(err){
    actions.toastError(err)
    cb()
  })
}

module.exports = (
  <Router history = {browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Landing} />
      <Route path='/login' component={Login}/>
      <Route path='/logout' onEnter={logout}/>
      <Route path='/dashboard' component={Dashboard} onEnter={checkToken}/>
      <Route path='/partner' component={PartnerDashboard}/>
      <Route path='/client' component={ClientDashboard}/>
      <Route path='/client/dashboard' component={ClientDashboard}/>
      <Route path='/client/gigs' component={ClientGigs}/>
      <Route path='/client/gigs/new' component={ClientGigsNew}/>
      <Route path='/partners' component={Partners}/>
      <Route path='/integrations' component={Integrations}/>
      <Route path='/actions' component={Actions}/>
      <Route path='/client/profile' component={ClientProfile}/>
      <Route path='/partner/profile' component={PartnerProfile}/>
      <Route path='/partner/dashboard' component={PartnerDashboard}/>
      <Route path='/partner/gigs' component={PartnerGigs}/>
      <Route path='/gigs' component={Gigs}/>
      <Route path='/partner/integrations/new' component={PartnerIntegrationsNew}/>
      <Route path='/partner/integrations' component={PartnerIntegrations}/>
      <Route path='/partner/actions/new' component={PartnerActionsNew}/>
      <Route path='/partner/actions' component={PartnerActions}/>
      <Route path='/partner/clients' component={PartnerClients}/>
      <Route path='/partner/clients/new' component={PartnerClientsNew}/>
      <Route path='/profile' component={Profile}/>
    </Route>
  </Router>
)
