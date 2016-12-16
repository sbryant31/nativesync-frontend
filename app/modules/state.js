var State = require('statesync')
var lodash = require('lodash')
var store = require('store')

var init = {
  token:store.get('token'),
  me:store.get('me'),
  mode:store.get('mode'),
  partner_id:store.get('partner_id'),
  client_id:store.get('client_id')
}

var state = State(init,lodash.cloneDeep,function(){ return false })

module.exports = state

