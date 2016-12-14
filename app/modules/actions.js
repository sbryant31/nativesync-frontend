var nsapi = require('./nativesyncapi')
//memory
var state = require('./state')
//persistence
var store = require('store')
var assert = require('assert')
import { browserHistory } from 'react-router'

//token gets loaded into memory on start
var token = state.get('token')

exports.getToken = function(){
  return token
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
  return nsapi.logout(token).finally(function(){
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
