var _ = require('underscore');
var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')
var Select = require('react-select');
var TriggerInfo = require('../components/integration/trigger_info');
var TextInputField = require('../components/inputs/text_input_field');
var ClientSelect = require('../components/client/client_select');
var KeyValueList = require('../components/inputs/key_value_list');
var ClientAuthForm = require('../components/client_auth/client_auth_form');
var ServiceAuthList = require('../components/service_auth/service_auth_list');
import {Tabs, Tab, TabList, TabPanel} from "@blueprintjs/core"

module.exports = React.createClass({
  getInitialState: function() {
    return {
      clientAuths: [],
      client: {},
      integration: {
        scheduling_info: {}
      },
      integrationInstance: {
        scheduling_info: {},
        inputs: []
      }
    }
  },
  handleSave: function() {
    actions.upsertIntegrationInstance(this.state.integrationInstance, this.state.integration, this.state.client)
  },
  handleChange: function(field, e) {
    var integrationInstance = this.state.integrationInstance;
    if (e.target) { // normal input handler
      this.handleChangeValue(field, e.target.value);
    } else if (e.value) { // dropdown handler
      this.handleChangeValue(field, e.value);
    } else {
      this.handleChangeValue(field, e);
    }
  },
  handleChangeValue: function(field, value) {
    var integrationInstance = this.state.integrationInstance;
    integrationInstance[field] = value;
    this.setState({integrationInstance: integrationInstance});
  },
  handleClientChange: function(client) {
    this.setState({client: client});
    self.getClientAuths();
  },
  getClientAuths: function() {
    var self = this;
    var serviceAuthIDs = _.pluck(this.state.serviceAuths, 'id');
    var client = this.state.client;
    actions.getClientAuths(this.state.client.id, serviceAuthIDs)
    .then((result) => {
      var clientAuths = result.clientAuths;
      for (let serviceAuthId of serviceAuthIDs) {
        if (!_.findWhere(clientAuths, {service_auth_id: serviceAuthId})) {
          clientAuths.push({
            service_auth_id: serviceAuthId,
            client_id: client.id,
          })
        }
      }
      self.setState({clientAuths: clientAuths});
    });
  },
  getDefaultProps: function() {
    return {
      id: null,
      integrationId: null
    }
  },
  componentDidMount: function() {
    var self = this;
    console.log('rendering props', self.props);
    if (self.props.integrationId && (!self.props.id || isNaN(self.props.id))) {
      // case when the integration instance is new
      // look up the integration, set its scheduling info to the integration instance
      actions.getIntegrationById(self.props.integrationId, false)
      .then(function(result) {
        var integrationInstance = self.state.integrationInstance;
        integrationInstance.scheduling_info = result.integration.scheduling_info;
        self.setState({
          integrationInstance: integrationInstance,
          integration: result.integration,
          actions: result.actions,
          services: result.services,
          serviceAuths: result.serviceAuths
        });
        self.getClientAuths();
      })
    } else {
      actions.getIntegrationInstanceById(self.props.id)
      .then(function(result) {
        console.log('getting instance', result);
        self.setState({
          integrationInstance: result.integrationInstance,
          integration: result.integration,
          client: result.client,
          actions: result.actions,
          services: result.services,
          serviceAuths: result.serviceAuths
        });
        self.getClientAuths();
      })
    }
  },
  render() {
    var self = this;
    return <div>
      <h2>Implement the Integration {this.state.integrationInstance.title}</h2>
      <Tabs>
        <TabList>
            <Tab>General</Tab>
            <Tab>Authentication</Tab>
            <Tab>Configure</Tab>
        </TabList>
        <TabPanel>
          <h2>General</h2>
          <TextInputField label="Title" value={this.state.integrationInstance.title} onChange={self.handleChange.bind(self, 'title')} />
          <ClientSelect client={self.state.client} onChange={this.handleClientChange.bind(this)} />
          <TriggerInfo value={this.state.integrationInstance.scheduling_info} onChange={this.handleChange.bind(this, 'scheduling_info')} />
        </TabPanel>
        <TabPanel>
          <h2>Authentication</h2>
          <ClientAuthForm clientAuths={this.state.clientAuths} client={this.state.client} services={this.state.services} serviceAuths={this.state.serviceAuths} />
        </TabPanel>
        <TabPanel>
          <h2>Configure</h2>
          <KeyValueList list={self.state.integrationInstance.inputs} onChange={this.handleChange.bind(this, 'inputs')} />
        </TabPanel>
      </Tabs>
      <hr />
      <button className="pt-button pt-icon-add" onClick={this.handleSave}>Save</button>
    </div>
  }
})
