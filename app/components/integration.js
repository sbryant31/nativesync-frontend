var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')
var Select = require('react-select');
var Json = require('react-json');
var OrganizationAuthForm = require('./organization_auth/organization_auth_form');
var ServiceAuthList = require('../components/service_auth/service_auth_list');
var ConfigurationInputView = require('../components/integration/configuration_input_view');
var ReferralCodesList = require('../components/integration/referral_codes_list');
var PricingInfo = require('../components/integration/pricing_info');
var ServiceMultiSelect = require('../components/service/service_multi_select');
var TriggerInfo = require('../components/integration/trigger_info');
var TextInputField = require('../components/inputs/text_input_field');
var CodeEditor = require('../components/inputs/code_editor');
var DragAndDropEditor = require('./integration/drag_and_drop_editor');
var ActionMultiSelect = require('../components/action/action_multi_select');
var IntegrationConfigurationBuilder = require('../components/integration/integration_configuration_builder');
var ActionDocumentationList = require('../components/action/action_documentation_list');
var MarkdownEditor = require('react-markdown-editor').MarkdownEditor;
import {Tabs, Tab, TabList, TabPanel} from "@blueprintjs/core"

module.exports = React.createClass({
  getInitialState: function() {
    return {
      integration: {
        scheduling_info: {},
        pricing: {},
        configuration: [],
        referrals: [],
      },
      services: [],
      actions: [],
      integrationCode: { },
      // test stuff
      organizationAuths: {},
      testInput: {},
      testOutput: {},
      serviceAuths: []
    }
  },
  getDefaultProps: function() {
    return {
      id: null
    }
  },
  handleSave: function() {
    return actions.upsertIntegration(this.state.integration, this.state.services, this.state.actions, this.state.integrationCode)
  },
  handleTest: function() {
    var self = this;
    var organization = actions.getState('org');
    this.handleSave()
    .then((result) => {
      return actions.testIntegration(this.state.integration.id, organization.id, this.state.testInput)
      .then((result) => {
        console.log('test result', result);
        self.setState({testOutput: result});
      });
    });
  },
  handleChange: function(field, e) {
    var integration = this.state.integration;
    if (e.target) { // normal input handler
      this.handleChangeValue(field, e.target.value);
    } else if (e.value) { // dropdown handler
      this.handleChangeValue(field, e.value);
    } else {
      this.handleChangeValue(field, e);
    }
  },
  handleChangeValue: function(field, value) {
    var integration = this.state.integration;
    integration[field] = value;
    this.setState({integration: integration});
  },
  handleServiceChange: function(services) {
    this.setState({services: services});
  },
  handleActionChange: function(actions) {
    this.setState({actions: actions});
    var serviceAuths = [];
    _.each(actions, (action) => {
      serviceAuths = serviceAuths.concat(action.ServiceAuths);
    })
    this.setState({serviceAuths: serviceAuths});
    return this.loadOrganizationAuths();
  },
  handleCodeChange: function(value) {
    var integrationCode = this.state.integrationCode;
    integrationCode.code = value;
    this.setState({integrationCode: integrationCode});
  },
  handleChangeTestInput: function(testInput) {
    this.setState({testInput: testInput});
  },
  handleChangeOrganizationAuths: function(organizationAuths) {
    this.setState({organizationAuths: organizationAuths});
  },
  // whenever service auths change, load the corresponding organization auths
  loadOrganizationAuths: function() {
    var self = this;
    var serviceAuthIDs = _.pluck(this.state.serviceAuths, 'id');
    var organization = actions.getState('org');
    actions.getOrganizationAuths(organization.id, serviceAuthIDs)
    .then((result) => {
      self.setState({organizationAuths: result.organizationAuths});
    });
  },
  componentDidMount: function() {
    var self = this;
    if (self.props.id && !isNaN(self.props.id)) {
      actions.getIntegrationById(self.props.id, true)
      .then(function(result) {
        if (!result.integration.pricing) { result.integration.pricing = {} };
        if (!result.integration.configuration) { result.integration.configuration = [] };
        if (!result.integration.referrals) { result.integration.referrals = [] };

        self.setState({
          integration: result.integration,
          services: result.services,
          actions: result.actions,
          integrationCode: result.integrationCode,
          serviceAuths: result.serviceAuths
        });
      })
    }
  },
  render() {
    var self = this;
    var integrationTypes = [
      {value: 'hosted_mvp', label: 'Cloud Code'},
      {value: 'external', label: 'External/Custom'},
      {value: 'dragAndDrop', label: 'Drag-and-drop'},
    ];
    return <div>
      <h2>Build an Integration {this.state.integration.title}</h2>
      <Tabs>
        <TabList>
            <Tab>General</Tab>
            <Tab>Configuration</Tab>
            <Tab>Code</Tab>
            <Tab>Test</Tab>
            <Tab>Documentation</Tab>
            <Tab>Publish</Tab>
        </TabList>
        <TabPanel>
          <h2>General</h2>
          <TextInputField label="Title" value={this.state.integration.title} onChange={this.handleChange.bind(this, 'title')} />
          <TextInputField label="Version" value={this.state.integration.version} onChange={this.handleChange.bind(this, 'version')} />
          <div className="row">
            <VisibilitySelector value={ this.state.action.visibility } onChange={this.handleChange.bind(this, 'visibility')} />
          </div>
          <label className="pt-label">
            Description
            <textarea className="pt-input pt-fill" value={this.state.integration.description} onChange={this.handleChange.bind(this, 'description')} />
          </label>
          <TriggerInfo value={this.state.integration.scheduling_info} onChange={this.handleChange.bind(this, 'scheduling_info')} />
        </TabPanel>
        <TabPanel>
          <h2>Configuration</h2>
          <IntegrationConfigurationBuilder
            configuration={this.state.integration.configuration}
            onChange={this.handleChange.bind(this, 'configuration')}
          />
        </TabPanel>
        <TabPanel>
          <div className="row">
            <ServiceMultiSelect value={this.state.services} onChange={this.handleServiceChange.bind(this)} />
          </div>
          <div className="row">
            <ActionMultiSelect value={this.state.actions} services={this.state.services} onChange={this.handleActionChange.bind(this)} />
          </div>
          <h2>Code</h2>
          <label className="pt-label pt-inline col-xs">
            Type
            <Select options={integrationTypes}
                    value={this.state.integration.type}
                    onChange={this.handleChange.bind(this, 'type')}
            />
          </label>
          <div className="row">
            <div className="col-xs-9">
              {this.state.integration.type == 'hosted_mvp' &&
                <CodeEditor code={self.state.integrationCode.code} onChange={this.handleCodeChange.bind(this)} />
              }
              {this.state.integration.type == 'dragAndDrop' &&
                <DragAndDropEditor code={self.state.integrationCode.code} onChange={this.handleCodeChange.bind(this)} />
              }
            </div>
            <div className="col-xs">
              <h4>Configuration Inputs</h4>
              <ConfigurationInputView configuration={this.state.integration.configuration} />
              <hr />
              <h4>Actions</h4>
              <ActionDocumentationList actions={this.state.actions} />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <h4>Authentication</h4>
          <OrganizationAuthForm
            organization={actions.getState('org')}
            services={this.state.services}
            serviceAuths={this.state.serviceAuths}
            onChange={this.handleChangeOrganizationAuths.bind(this)} />
          <hr />
          <h4>Inputs</h4>
          <Json value={this.state.testInput} onChange={this.handleChangeTestInput.bind(this)} />
          <hr />
          <h4>Logs</h4>
          <textarea value={this.state.testOutput.logs ? this.state.testOutput.logs.join('\n') : ''} className="pt-input pt-fill" />
          <hr />
          <h4>Return Value</h4>
          <textarea value={JSON.stringify(this.state.testOutput.output)} className="pt-input pt-fill" />
        </TabPanel>
        <TabPanel>
          <h2>Documentation</h2>
          <MarkdownEditor initialContent={this.state.integration.documentation} onContentChange={this.handleChangeValue.bind(this, 'documentation')} iconsSet="font-awesome" />
        </TabPanel>
        <TabPanel>
          <h2>Publish</h2>
          <h4>Pricing</h4>
          <PricingInfo value={this.state.integration.pricing} onChange={this.handleChangeValue.bind(this, 'pricing')} />
          <h4>Referral Codes</h4>
          <ReferralCodesList referrals={this.state.integration.referrals} onChange={this.handleChangeValue.bind(this, 'referrals')} />
        </TabPanel>
      </Tabs>
      <hr />
      <button className="pt-button pt-icon-add" onClick={this.handleSave}>Save</button>
      <button className="pt-button" onClick={this.handleTest.bind(this)}>Test</button>
    </div>
  }
})

