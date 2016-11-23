var nsapi = require('./nativesyncapi')
var state = require('./state')

exports.login = function(username,password){
  return nsapi.login(username,password).then(function(token){
    state.set('token',token)
    return nsapi.me(token.id)
  }).then(function(user){
    state.set('me',user)
    return user
  })
}

exports.signup = function(username,password){
  return nsapi.signup(username,password).then(function(user){
    return exports.login(username,password)
  })
}

exports.toastError = function(message){
  console.log('setting state',message)
  state.set('error',message)
}
