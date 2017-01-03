var _ = require('underscore');
var React = require('react');
var actions = require('../modules/actions');
// var Navbar = require('../components/navbar');
// var lodash = require('lodash');
// var Select = require('react-select');
var TriggerInfo = require('../components/integration/trigger_info');
var IntegrationInstanceInputEditor = require('../components/integration_instance/integration_instance_input_editor');
var TextInputField = require('../components/inputs/text_input_field');
var OrganizationSelect = require('../components/organization/organization_select');
// var KeyValueList = require('../components/inputs/key_value_list');
var OrganizationAuthForm = require('../components/organization_auth/organization_auth_form');
// var ServiceAuthList = require('../components/service_auth/service_auth_list');
import {Tabs, Tab, TabList, TabPanel} from "@blueprintjs/core"

module.exports = React.createClass({
  getInitialState: function() {
    return {
      organizationAuths: [],
      organization: {},
      integration: { },
      integrationInstance: {
        scheduling_info: {},
        inputs: {}
      }
    }
  },
  handleSave: function() {
    actions.upsertIntegrationInstance(this.state.integrationInstance, this.state.integration, this.state.organization)
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
  handleOrganizationChange: function(organization) {
    this.setState({organization: organization});
    this.getOrganizationAuths();
  },
  getOrganizationAuths: function() {
    var self = this;
    var serviceAuthIDs = _.pluck(this.state.serviceAuths, 'id');
    var organization = this.state.organization;
    actions.getOrganizationAuths(this.state.organization.id, serviceAuthIDs)
    .then((result) => {
      var organizationAuths = result.organizationAuths;
      for (let serviceAuthId of serviceAuthIDs) {
        if (!_.findWhere(organizationAuths, {service_auth_id: serviceAuthId})) {
          organizationAuths.push({
            service_auth_id: serviceAuthId,
            organization_id: organization.id,
          })
        }
      }
      self.setState({organizationAuths: organizationAuths});
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
        console.log('checking org', actions.getState('org'));
        self.setState({
          integrationInstance: integrationInstance,
          integration: result.integration,
          actions: result.actions,
          services: result.services,
          serviceAuths: result.serviceAuths,
          organization: actions.getState('org')
        });
        self.getOrganizationAuths();
      })
    } else {
      actions.getIntegrationInstanceById(self.props.id)
      .then(function(result) {
        console.log('getting instance', result);
        self.setState({
          integrationInstance: result.integrationInstance,
          integration: result.integration,
          organization: result.organization,
          actions: result.actions,
          services: result.services,
          serviceAuths: result.serviceAuths
        });
        self.getOrganizationAuths();
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
          <OrganizationSelect organization={self.state.organization} onChange={this.handleOrganizationChange.bind(this)} />
          <TriggerInfo value={this.state.integrationInstance.scheduling_info} onChange={this.handleChange.bind(this, 'scheduling_info')} />
        </TabPanel>
        <TabPanel>
          <h2>Authentication</h2>
          <OrganizationAuthForm organizationAuths={this.state.organizationAuths} organization={this.state.organization} services={this.state.services} serviceAuths={this.state.serviceAuths} />
        </TabPanel>
        <TabPanel>
          <h2>Configure</h2>
          <IntegrationInstanceInputEditor
            value={self.state.integrationInstance.inputs}
            configuration={self.state.integration.configuration}
            onChange={this.handleChange.bind(this, 'inputs')}
          />
        </TabPanel>
      </Tabs>
      <hr />
      <button className="pt-button pt-icon-add" onClick={this.handleSave}>Save</button>
    </div>
  }
})
