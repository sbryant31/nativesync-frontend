var React = require('react');
var lodash = require('lodash');
var _ = require('underscore');

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      object: {},
      onChange: (object) => { console.log('kv changed', object); },
      readOnly: false
    }
  },
  handleRemove: function(key) {
    var object = this.props.object;
    delete object.key;
    this.props.onChange(object);
  },
  handleAdd: function() {
    var object = this.props.object;
    var newKey = 'new key' + _.random(0,1000);
    var newValue = 'new value' + _.random(0,1000);
    object[newKey] = newValue;
    this.props.onChange(object);
  },
  handleChangeKey: function(key, e) {
    var object = this.props.object;
    var value = object[key];
    delete object[key];
    object[e.target.value] = value;
    this.props.onChange(object);
  },
  handleChangeValue: function(key, e) {
    var object = this.props.object;
    object[key] = e.target.value;
    this.props.onChange(object);
  },
  render() {
    var key = 0;
    var self = this;
    var object = lodash.map(self.props.object, function(value, key){
      return <div className="row">
        <label className="pt-label pt-inline col-xs">
          Key <input className="pt-input" value={ key } onChange={self.handleChangeKey.bind(self, key)}/>
        </label>
        <label className="pt-label pt-inline col-xs">
          Value <input className="pt-input" value={ value } onChange={self.handleChangeValue.bind(self, key)}/>
        </label>
        <div className="col-xs">
        { !self.props.readOnly &&
          <button className="pt-button pt-icon-remove" onClick={self.handleRemove.bind(self, key)}>Remove</button>
        }
        </div>
      </div>
    })
    return <div>
      { object }
      <div className="row">
        <div className="col-xs">
          { !this.props.readOnly &&
            <button className="pt-button pt-icon-add" onClick={self.handleAdd.bind(self)}>Add</button>
          }
        </div>
      </div>
    </div>
  }
})
