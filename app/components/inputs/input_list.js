var React = require('react');
var lodash = require('lodash');

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      list: [],
      object: null,
      defaultObject: '',
      onChange: (list) => { console.log('kv changed', list); }
    };
  },
  handleRemove: function(index) {
    var list = this.props.list;
    list.splice(index, 1);
    this.props.onChange(list);
  },
  handleAdd: function() {
    var list = this.props.list;
    list.push(this.props.defaultObject);
    this.props.onChange(list);
  },
  handleChange: function(index,  e) {
    var list = this.props.list;
    if (e.target) {
      list[index] = e.target.value;
    } else if (e.value) {
      list[index] = e.value;
    } else {
      list[index] = e;
    }
    this.props.onChange(list);
  },
  render() {
    var index = 0;
    var self = this;
    console.log('rendering list', self.props.list);
    var list = lodash.map(self.props.list, function(item){
      let currentIndex = index++;
      var object = React.createElement(self.props.object, {
        value: item,
        onChange: self.handleChange.bind(self, currentIndex)
      })

      return <div className="row">
        <label className="pt-label pt-inline col-xs">
          {object}
        </label>
        <div className="col-xs">
          <button className="pt-button pt-icon-remove" onClick={self.handleRemove.bind(self, currentIndex)}>Remove</button>
        </div>
      </div>;
    });
    return <div>
      { list }
      <div className="row">
        <div className="col-xs">
          <button className="pt-button pt-icon-add" onClick={self.handleAdd.bind(self)}>Add</button>
        </div>
      </div>
    </div>;
  }
});
