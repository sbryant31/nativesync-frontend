var React = require('react')
var ReactDOM = require('react-dom')
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

var actions = require('./modules/actions')


var App = require('./app')
var Landing = require('./pages/landing')
var IntegrationsMe = require('./pages/integrations_me')
var ActionsMe = require('./pages/actions_me');
var Profile = require('./pages/profile');
var Login = require('./pages/login')
var Dashboard = require('./pages/dashboard')
var NavbarLayout = require('./pages/navbar_layout')


function checkToken(nextState,replace,cb){
  return actions.me().then(function(user){
    console.log('checktoken',user)
    if(user == null) {
      replace({pathname:'/login'})
    }
    cb()
  }).catch(function(){
    console.log('error checking tokne')
    // actions.toastError('error getting my user info')
    replace({pathname:'/login'})
    cb()
  })
}

function notLoggedIn(nextState,replace,cb){
  console.log(nextState)
  return actions.me().then(function(user){
    if(user){
      replace({
        pathname:'/dashboard'
      })
    }
    cb()
  }).catch(function(){
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
    replace({
      pathname:'/login'
    })
    cb()
  })
}

module.exports = (
  <Router history = {browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Landing} />
      <Route path='/login' component={Login} onEnter={notLoggedIn}/>
      <Route path='/logout' onEnter={logout}/>
      <Route path='/dashboard' component={NavbarLayout} onEnter={checkToken}>
        <IndexRoute component={Dashboard}/>
      </Route>
      <Route path='/actions/me' component={NavbarLayout}>
        <IndexRoute component={ActionsMe}/>
      </Route>
      <Route path='/profile' component={Profile}/>
    </Route>
  </Router>
)
