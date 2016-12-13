var nsapi = require('./nativesyncapi')
var state = require('./state')
var store = require('store')
var assert = require('assert')
import { browserHistory } from 'react-router'

var token = null

exports.getToken = function(){
  token = state.get('token')
  if(token) return 
  token = store.get('token')
  if(token) return state.set('token',token)
  return 
}
//get token on load
exports.getToken()

exports.login = function(username,password){
  return nsapi.login(username,password).then(function(t){
    assert(t,'login failed')
    state.set('token',t.token)
    store.set('token',t.token)
    token = t.token
    return exports.me()
  })
}

exports.signup = function(username,password){
  return nsapi.signup(username,password).then(function(user){
    assert(user,'signup failed')
    return exports.login(username,password)
  })
}

exports.logout = function(){
  return nsapi.logout(token).then(function(){
    state.set('token',null)
    state.set('me',null)
    token = null
  })
}

exports.me = function(){
  return nsapi.me(token).then(function(user){
    console.log('me',user,token)
    assert(user,'user not found')
    return state.set('me',user)
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
