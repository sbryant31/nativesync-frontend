var React = require('react');
var actions = require('../modules/actions');
var Navbar = require('../components/navbar');
var lodash = require('lodash');
var _ = require('underscore');

var Select = require('react-select');
import NumericInput from 'react-numeric-input';

var EnvironmentSelector = require('./inputs/environment_selector');
var OrganizationAuthForm = require('./organization_auth/organization_auth_form');
var Json = require('react-json');
var ServiceAuthSelector = require('../components/service_auth/service_auth_selector');
var VisibilitySelector = require('./inputs/visibility_selector');
var ServiceSelector = require('../components/service/service_selector');
var ParameterList = require('../components/action/parameter_list');
var OutputParameterList = require('../components/action/output_parameter_list');
var KeyValueList = require('../components/inputs/key_value_list');
var TextInputField = require('../components/inputs/text_input_field');
import {Tabs, Tab, TabList, TabPanel} from "@blueprintjs/core";
var InputBodyEditor = require('../components/action/input_body_editor');
var OutputBodyEditor = require('./action/output_body_editor');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      action: {
        environment: 'production',
        visibility: 'private',
        function_name: 'some_function_name',
        description: 'describe what the function does',
        host: 'api.something.io',
        path: '/some/api/path',
        method: 'POST',
        scheme: 'https',
        headers: [],
        query: [],
        input: [],
        output: [],
        input_body: {content_type: 'json', body_code_type: 'direct'},
        output_body: {content_type: 'json', body_code_type: 'direct'}
      },
      organizationAuths: {},
      service: {},
      serviceAuths: [],
      selectedServiceAuths: [],
      testInput: {},
      testOutput: {},
      readOnly: false
    };
  },
  componentDidMount: function() {
    var self = this;
    console.log('loading action', self.props.id);
    if (!isNaN(self.props.id)) {
      actions.getActionById(self.props.id)
      .then(function(result) {
        console.log('got action', result);
        self.setState({
          action: result.action,
          service: result.service,
          selectedServiceAuths: result.serviceAuths
        });
        return self.loadServiceAuths(result.service);
      });
    }
  },
  loadServiceAuths: function(service) {
    var self = this;
    console.log('loading service auths', service);
    self.setState({serviceAuths: []});
    actions.getServiceAuths(service.id)
    .then((result) => {
      console.log('got service auths', result);
      self.setState({serviceAuths: result.serviceAuths});
      var newSelected = _.where(self.state.selectedServiceAuths, {service_id: service.id});
      self.setState({selectedServiceAuths: newSelected});
      return self.loadOrganizationAuths();
    });
  },
  // whenever service auths change, load the corresponding organization auths
  loadOrganizationAuths: function() {
    var self = this;
    console.log('underscore', _.pluck);
    var serviceAuthIDs = _.pluck(this.state.selectedServiceAuths, 'id');
    var organization = actions.getState('org');
    actions.getOrganizationAuths(organization.id, serviceAuthIDs)
    .then((result) => {
      self.setState({organizationAuths: result.organizationAuths});
    });
  },
  handleSave: function() {
    return actions.upsertAction(this.state.action, this.state.service, this.state.selectedServiceAuths);
  },
  handleTest: function() {
    var self = this;
    var organization = actions.getState('org');
    this.handleSave()
    .then((result) => {
      return actions.testAction(this.state.action.id, organization.id, this.state.testInput)
      .then((result) => {
        console.log('test result', result);
        self.setState({testOutput: result});
        self.forceUpdate();
      });
    });
  },
  handleChange: function(field, e) {
    var action = this.state.action;
    if (e === null) { this.handleChangeValue(field, null); }
    if (e.target) { // normal input handler
      this.handleChangeValue(field, e.target.value);
    } else if (e.value) { // dropdown handler
      this.handleChangeValue(field, e.value);
    } else {
      this.handleChangeValue(field, e);
    }
  },
  handleChangeValue: function(field, value) {
    var action = this.state.action;
    action[field] = value;
    this.setState({action: action});
  },
  handleServiceChange: function(service) {
    this.setState({service: service});
    this.handleChangeValue('service_name', service.name);
    this.loadServiceAuths(service);
  },
  handleChangeTestInput: function(testInput) {
    this.setState({testInput: testInput});
  },
  handleChangeOrganizationAuths: function(organizationAuths) {
    this.setState({organizationAuths: organizationAuths});
  },
  handleAuthSchemeChange: function(serviceAuths) {
    this.setState({selectedServiceAuths: serviceAuths});
  },
  render() {
    var testOutput = JSON.stringify(this.state.testOutput);
    console.log('test output', testOutput);
    var actionTypes = [
      {value: 'rest', label: 'REST Action 1.0'},
      {value: 'code', label: 'Code Action 1.0'}
    ];
    var httpMethods = [
      {value: 'GET', label: 'GET'},
      {value: 'POST', label: 'POST'},
      {value: 'PUT', label: 'PUT'},
      {value: 'PATCH', label: 'PATCH'},
      {value: 'DELETE', label: 'DELETE'},
    ];
    var baseUrlOptions = _.map(this.state.service.api_base_urls, (baseUrl) => {
      return {value: baseUrl, label: baseUrl};
    });
    baseUrlOptions.push({value: this.state.action.host, label: this.state.action.host});

    return (<div>
      <h2>Build an Action</h2>
      <Tabs>
          <TabList>
              <Tab>General</Tab>
              <Tab>Authentication</Tab>
              <Tab>Input</Tab>
              <Tab>Output</Tab>
              <Tab>Test</Tab>
          </TabList>
          <TabPanel>
            <h4>Basics</h4>
            <div className="row">
              <TextInputField label="Title" value={this.state.action.title} onChange={this.handleChange.bind(this, 'title')} />
            </div>
            <div className="row">
              <ServiceSelector service={ this.state.service } onChange={this.handleServiceChange.bind(this)} />
            </div>
            <div className="row">
              <label className="pt-label pt-inline col-xs">
                Version
                <NumericInput value={ this.state.action.version } onChange={this.handleChange.bind(this, 'version')} />
              </label>
            </div>
            <EnvironmentSelector value={this.state.action.environment} onChange={this.handleChange.bind(this, 'environment')} />
            <div className="row">
              <VisibilitySelector value={ this.state.action.visibility } onChange={this.handleChange.bind(this, 'visibility')} />
            </div>
            <div className="row">
              <TextInputField label="Function" value={this.state.action.function_name} onChange={this.handleChange.bind(this, 'function_name')} />
            </div>
            <div className="row">
              <TextInputField label="Description" value={this.state.action.description} onChange={this.handleChange.bind(this, 'description')} />
            </div>
            <div className="row">
              <label className="pt-label col-xs pt-inline">
                Base Url
                <Select.Creatable
                  options={baseUrlOptions}
                  value={this.state.action.host}
                  onChange={this.handleChange.bind(this, 'host')}
                />
              </label>
            </div>
            <div className="row">
              <TextInputField label="Path" value={this.state.action.path} onChange={this.handleChange.bind(this, 'path')} />
            </div>
            <div className="row">
              <label className="pt-label pt-inline col-xs">
                Method
                <Select options={httpMethods} value={ this.state.action.method } onChange={this.handleChange.bind(this, 'method')} />
              </label>
            </div>
            <hr />
            <h4>Headers</h4>
              <KeyValueList list={this.state.action.headers} onChange={this.handleChangeValue.bind(this, 'headers')} />
            <hr />
            <h4>Query params</h4>
              <KeyValueList list={this.state.action.query} onChange={this.handleChangeValue.bind(this, 'query')} />
          </TabPanel>
          <TabPanel>
            <ServiceAuthSelector
              service={ this.state.service }
              onSelectChange={this.handleAuthSchemeChange}
              selected={this.state.selectedServiceAuths}
              serviceAuths={this.state.serviceAuths}
            />
          </TabPanel>
          <TabPanel>
            <h4>Parameters</h4>
            <ParameterList service={this.state.service} parameters={this.state.action.input} onChange={this.handleChangeValue.bind(this, 'input')} />
            <h4>Input Body</h4>
            <InputBodyEditor value={this.state.action.input_body} onChange={this.handleChange.bind(this, 'input_body')} />
          </TabPanel>
          <TabPanel>
            <h4>Parameters</h4>
            <OutputParameterList service={this.state.service} parameters={this.state.action.output} onChange={this.handleChangeValue.bind(this, 'output')} />
            <h4>Output Body</h4>
            <OutputBodyEditor value={this.state.action.output_body} onChange={this.handleChange.bind(this, 'output_body')} />
          </TabPanel>
          <TabPanel>
            <h4>Authentication</h4>
            <OrganizationAuthForm
              organization={actions.getState('org')}
              services={[this.state.service]}
              organizationAuths={this.state.organizationAuths}
              serviceAuths={this.state.selectedServiceAuths}
              onChange={this.handleChangeOrganizationAuths.bind(this)} />
            <h4>Inputs</h4>
            <Json value={this.state.testInput} onChange={this.handleChangeTestInput.bind(this)} />
            <h4>Output</h4>
            <textarea value={testOutput} />
            <hr />
            <button className="pt-button" onClick={this.handleTest.bind(this)}>Test</button>
          </TabPanel>
      </Tabs>
      <hr />
      <button className="pt-button pt-icon-add" onClick={this.handleSave}>Save</button>
    </div>
    );
  }
});

