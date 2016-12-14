var State = require('statesync')
var lodash = require('lodash')
var store = require('store')

var init = {
  token:store.get('token'),
  me:store.get('me')
}

var state = State(init,lodash.cloneDeep,function(){ return false })

module.exports = state

