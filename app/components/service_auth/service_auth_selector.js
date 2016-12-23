var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var ServiceAuthList = require('./service_auth_list');

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
  componentDidMount: function(input, callback) {
    var self = this;
    console.log('loading options for service_auth_selector');
    return actions.getServiceAuths(this.props.service.id)
    .then(function(serviceAuths) {
      console.log('loading service auths', serviceAuths);
      self.setState({serviceAuths: serviceAuths});

      var serviceAuthOptions = _.map(serviceAuths, (serviceAuth) => {
        return {value: serviceAuth.id, label: serviceAuth.name};
      })
      self.setState({serviceAuthOptions: serviceAuthOptions});

      // set initial values (from the database)
      var initialValue = _.map(self.props.value, (serviceAuth) => {
        return {value: serviceAuth.id, label: serviceAuth.name};
      })
      self.setState({value: initialValue});
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
    return <label className="pt-label pt-inline col-xs">
      <h4>Authentication Schemes for {this.props.service.name}</h4>
      <ServiceAuthList serviceAuths={this.state.serviceAuths} selectedIDs={selectedIDs} services={[this.props.service]} readOnly />
      <hr/>
      <h4>Add/Remove Auth Schemes</h4>
      <Select
          name="service-auth-selector"
          value={this.state.value}
          multi={true}
          joinValues={true}
          options={self.state.serviceAuthOptions}
          onChange={this.handleChange}
      />
    </label>
  }
})
