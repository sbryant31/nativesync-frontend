var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var actions = require('../../modules/actions');
var Select = require('react-select');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      clients: {},
    }
  },
  getDefaultProps: function() {
    return {
      client: {},
      onChange: (client) => { console.log('change client', client) }
    }
  },
  handleChange: function(selection) {
    this.props.onChange(this.state.clients[selection.value]);
  },
  componentDidMount: function() {
    console.log('loading options for client');
    var self = this;
    return actions.getClients()
    .then(function(result) {
      var clients = result.clients;
      self.setState({clients: _.indexBy(clients, 'id')})
      var clientOptions = _.map(clients, (client) => {
        return {value: client.id, label: client.name}
      })
      self.setState({clientOptions: clientOptions})
      console.log(self.state);
    })
  },
  render() {
    var self = this;
    return <label className="pt-label pt-inline col-xs">
      Client
      <Select
        name="client-selector"
        value={this.props.client ? this.props.client.id : null}
        options={this.state.clientOptions}
        onChange={this.handleChange}
      />
    </label>
  }
})
