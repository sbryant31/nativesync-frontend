var State = require('statesync');
var lodash = require('lodash');
var store = require('store');

var init = {
  token: store.get('token'),
  me: store.get('me'),
  org: store.get('org')
};

var state = State(init, lodash.cloneDeep, () => { return false; });

module.exports = state;
