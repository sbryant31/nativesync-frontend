var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      value: [],
      serviceAuths: []
    }
  },
  getDefaultProps: function() {
    return {
      onChange: () => {},
      value: []
    }
  },
  loadOptions: function(input, callback) {
    var self = this;
    return actions.getServiceAuths(this.props.service.id)
    .then(function(serviceAuths) {
      self.setState({serviceAuths: serviceAuths});
      serviceAuths = _.map(serviceAuths, (serviceAuth) => {
        return {value: serviceAuth.id, label: serviceAuth.name};
      })
      // set initial values (from the database)
      var initialValue = _.map(self.props.value, (serviceAuth) => {
        return {value: serviceAuth.id, label: serviceAuth.name};
      })
      console.log('initial', initialValue, self.props.value);
      self.setState({value: initialValue});
      return {options: serviceAuths};
    })
  },
  getSelectedServiceAuths: function(value) {
    var selectedIDs = _.pluck(value, 'value');
    return _.filter(this.state.serviceAuths, (serviceAuth) => {
      return selectedIDs.indexOf(serviceAuth.id) !== -1;
    })
  },
  handleChange: function(value) {
    this.setState({ value: value })
    var selected = this.getSelectedServiceAuths(value);
    this.props.onChange(selected);
  },
  render() {
    var self = this;
    var selectedIDs = _.pluck(this.state.value, 'value');
    var authList = lodash.map(this.state.serviceAuths,function(serviceAuth){
      var isSelected = (selectedIDs.indexOf(serviceAuth.id) !== -1)
      return <div className="row">
        <div className="col-xs">
          { isSelected && <span className="pt-icon-confirm" /> }
        </div>
        <div className="col-xs-3">
          name: { serviceAuth.name }
        </div>
        <div className="col-xs-3">
          type: { serviceAuth.type }
        </div>
        <div className="col-xs-3">
          details: { JSON.stringify(serviceAuth.details) }
        </div>
      </div>
    })
    return <label className="pt-label pt-inline col-xs">
      <h4>Authentication Schemes for {this.props.service.name}</h4>
      { authList }
      <hr/>
      <h4>Add/Remove Auth Schemes</h4>
      <Select.Async
          value={this.state.value}
          multi={true}
          joinValues={true}
          loadOptions={this.loadOptions}
          onChange={this.handleChange}
      />
    </label>
  }
})
