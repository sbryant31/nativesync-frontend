var React = require('react');
var lodash = require('lodash');

module.exports = React.createClass({
  getDefaultProps: () => {
    return {
      parameters: [],
			onRemove: (index) => { console.log('removed', index); },
			onAdd: () => { console.log('add button clicked'); },
    }
  },
  render() {
		var index = 0;
		var self = this;
    var parameters = lodash.map(this.props.parameters, function(parameter){
			var removeHandler = self.props.onRemove.bind(self, index);
			index++;
      return <div className="row">
        <label className="pt-label pt-inline col-xs">
          Name <input className="pt-input" value={ parameter.name } />
        </label>
        <label className="pt-label pt-inline col-xs">
          In <input className="pt-input" value={ parameter.in } />
        </label>
        <label className="pt-label pt-inline col-xs">
          Description <input className="pt-input" value={ parameter.description } />
        </label>
        <label className="pt-label pt-inline col-xs">
          Type <input className="pt-input" value={ parameter.type } />
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
					<button className="pt-button pt-icon-add" onClick={this.props.onAdd}>Add</button>
				</div>
			</div>
		</div>
  }
})
