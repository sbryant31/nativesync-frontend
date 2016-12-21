var React = require('react');
var lodash = require('lodash');

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      list: {},
      onChange: (list) => { console.log('kv changed', list); }
    }
  },
  handleRemove: function(index) {
    var list = this.props.list;
    list.splice(index, 1);
    this.props.onChange(list);
  },
  handleAdd: function() {
    var list = this.props.list;
    list.push({key: '', value: ''});
    this.props.onChange(list);
  },
  handleChange: function(index, field, e) {
    var list = this.props.list;
    list[index][field] = e.target.value;
    this.props.onChange(list);
  },
  render() {
    var index = 0;
    var self = this;
    var list = lodash.map(self.props.list, function(item){
      let currentIndex = index++;
      return <div className="row">
        <label className="pt-label pt-inline col-xs">
          Key <input className="pt-input" value={ item.key } onChange={self.handleChange.bind(self, currentIndex, 'key')}/>
        </label>
        <label className="pt-label pt-inline col-xs">
          Value <input className="pt-input" value={ item.value } onChange={self.handleChange.bind(self, currentIndex, 'value')}/>
        </label>
        <div className="col-xs">
          <button className="pt-button pt-icon-remove" onClick={self.handleRemove.bind(self, currentIndex)}>Remove</button>
        </div>
      </div>
    })
    return <div>
      { list }
      <div className="row">
        <div className="col-xs">
          <button className="pt-button pt-icon-add" onClick={self.handleAdd.bind(self)}>Add</button>
        </div>
      </div>
    </div>
  }
})
