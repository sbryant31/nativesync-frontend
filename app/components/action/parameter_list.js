var React = require('react');
var lodash = require('lodash');

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      parameters: [],
      onChange: (parameters) => { console.log('params changed', parameters); }
    }
  },
  handleRemove: function(index) {
    var parameters = this.props.parameters;
    parameters.splice(index, 1);
    this.props.onChange(parameters);
  },
  handleAdd: function() {
    var parameters = this.props.parameters;
    parameters.push({in: '', name: '', description: '', type: ''});
    this.props.onChange(parameters);
  },
  handleChange(index, field, e) {
    var parameters = this.props.parameters;
    parameters[index][field] = e.target.value;
    this.props.onChange(parameters);
  },
  render() {
    var index = 0;
    var self = this;
    var parameters = lodash.map(this.props.parameters, function(parameter){
      var removeHandler = self.handleRemove.bind(self, index);
      var currentIndex = index++;
      return <div className="row">
        <label className="pt-label pt-inline col-xs">
          Name <input className="pt-input" value={ parameter.name } onChange={self.handleChange.bind(self, currentIndex, 'name')} />
        </label>
        <label className="pt-label pt-inline col-xs">
          In <input className="pt-input" value={ parameter.in } onChange={self.handleChange.bind(self, currentIndex, 'in')} />
        </label>
        <label className="pt-label pt-inline col-xs">
          Description <input className="pt-input" value={ parameter.description } onChange={self.handleChange.bind(self, currentIndex, 'description')} />
        </label>
        <label className="pt-label pt-inline col-xs">
          Type <input className="pt-input" value={ parameter.type } onChange={self.handleChange.bind(self, currentIndex, 'type')} />
        </label>
        <div className="col-xs">
          <button className="pt-button pt-icon-remove" onClick={removeHandler}>Remove</button>
        </div>
      </div>
    })
    return <div>
      { parameters }
      <div className="row">
        <div className="col-xs">
          <button className="pt-button pt-icon-add" onClick={this.handleAdd}>Add</button>
        </div>
      </div>
    </div>
  }
})
