var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')
var Select = require('react-select');
var ServiceAuthList = require('../components/service_auth/service_auth_list');
var ConfigurationInputView = require('../components/integration/configuration_input_view');
var ReferralCodesList = require('../components/integration/referral_codes_list');
var PricingInfo = require('../components/integration/pricing_info');
var ServiceMultiSelect = require('../components/service/service_multi_select');
var TriggerInfo = require('../components/integration/trigger_info');
var TextInputField = require('../components/inputs/text_input_field');
var CodeEditor = require('../components/inputs/code_editor');
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
    }
  },
  handleSave: function() {
    actions.upsertIntegration(this.state.integration, this.state.services, this.state.actions, this.state.integrationCode)
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
  },
  handleCodeChange: function(value) {
    var integrationCode = this.state.integrationCode;
    integrationCode.code = value;
    this.setState({integrationCode: integrationCode});
  },
  getDefaultProps: function() {
    return {
      id: null
    }
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
          integrationCode: result.integrationCode
        });
      })
    }
  },
  render() {
    var self = this;
    var integrationTypes = [
      {value: 'hosted_mvp', label: 'NativeSync CloudCode 1.0'},
      {value: 'external', label: 'External/Custom'},
      {value: 'simple', label: 'Simple Drag-and-drop'},
    ];
    return <div>
      <h2>Build an Integration {this.state.integration.title}</h2>
      <Tabs>
        <TabList>
            <Tab>General</Tab>
            <Tab>Services</Tab>
            <Tab>Actions</Tab>
            <Tab>Configuration</Tab>
            <Tab>Code</Tab>
            <Tab>Documentation</Tab>
            <Tab>Publish</Tab>
        </TabList>
        <TabPanel>
          <h2>General</h2>
          <TextInputField label="Title" value={this.state.integration.title} onChange={this.handleChange.bind(this, 'title')} />
          <TextInputField label="Version" value={this.state.integration.version} onChange={this.handleChange.bind(this, 'version')} />
          <label className="pt-label pt-inline col-xs">
            Type
            <Select options={integrationTypes}
                    value={this.state.integration.type}
                    onChange={this.handleChange.bind(this, 'type')}
            />
          </label>
          <TextInputField label="Description" value={this.state.integration.description} onChange={this.handleChange.bind(this, 'description')} />
          <TriggerInfo value={this.state.integration.scheduling_info} onChange={this.handleChange.bind(this, 'scheduling_info')} />
        </TabPanel>
        <TabPanel>
          <h2>Services</h2>
          <ServiceMultiSelect value={this.state.services} onChange={this.handleServiceChange.bind(this)} />
        </TabPanel>
        <TabPanel>
          <h2>Actions</h2>
          <ActionMultiSelect value={this.state.actions} onChange={this.handleActionChange.bind(this)} />
          <h3>Documentation</h3>
          <ActionDocumentationList actions={this.state.actions} />
        </TabPanel>
        <TabPanel>
          <h2>Configuration</h2>
          <IntegrationConfigurationBuilder
            configuration={this.state.integration.configuration}
            onChange={this.handleChange.bind(this, 'configuration')}
          />
        </TabPanel>
        <TabPanel>
          <h2>Code</h2>
          <div className="row">
            <div className="col-xs">
              <CodeEditor code={self.state.integrationCode.code} onChange={this.handleCodeChange.bind(this)} />
            </div>
            <div className="col-xs">
              <h4>Configuration Inputs</h4>
              <ConfigurationInputView configuration={this.state.integration.configuration} />
              <h4>Actions</h4>
              <ActionDocumentationList actions={this.state.actions} />
            </div>
          </div>
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
    </div>
  }
})

