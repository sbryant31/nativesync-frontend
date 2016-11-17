var React = require('react')
var ReactDOM = require('react-dom')
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

var App = require('./app')
var Landing = require('./pages/landing')
var Develop = require('./pages/develop')
var Login = require('./pages/login')

module.exports = (
  <Router history = {browserHistory}>
    <Route path='/' component={App}> 
      <IndexRoute component={Landing} />
      <Route path='/develop' component={Develop}/>
      <Route path='/login' component={Login}/>
    </Route>
  </Router>
)
