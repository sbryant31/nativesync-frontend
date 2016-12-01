var nsapi = require('./nativesyncapi')
var state = require('./state')
var store = require('store')

var token = null
exports.getToken = function(){
  token = state.get('token')
  if(token) return 
  token = store.get('token')
  if(token) return state.set('token',token)
  return
}

exports.login = function(username,password){
  return nsapi.login(username,password).then(function(t){
    state.set('token',t.id)
    store.set('token',t.id)
    token = t.id
    return exports.me()
  })
}

exports.signup = function(username,password){
  return nsapi.signup(username,password).then(function(user){
    return exports.login(username,password)
  })
}

exports.me = function(){
  return nsapi.me(token).then(function(user){
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

exports.toastError = function(message){
  console.log('setting state',message)
  state.set('error',message)
}
