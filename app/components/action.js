var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')
var _ = require('underscore');

var Select = require('react-select');

var OrganizationAuthForm = require('./organization_auth/organization_auth_form');
var Json = require('react-json');
var ServiceAuthSelector = require('../components/service_auth/service_auth_selector');
var ServiceSelector = require('../components/service/service_selector');
var ParameterList = require('../components/action/parameter_list');
var OutputParameterList = require('../components/action/output_parameter_list');
var KeyValueList = require('../components/inputs/key_value_list');
var TextInputField = require('../components/inputs/text_input_field');
import {Tabs, Tab, TabList, TabPanel} from "@blueprintjs/core"
var InputBodyEditor = require('../components/action/input_body_editor');
var OutputBodyEditor = require('./action/output_body_editor');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      action: {
        headers: [],
        query: [],
        input: [],
        output: [],
        input_body: {},
        output_body: {}
      },
      organizationAuths: {},
      service: {},
      serviceAuths: [],
      selectedServiceAuths: [],
      testInput: {},
      testOutput: {},
      readOnly: false
    }
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
      })
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
    var serviceAuthIDs = _.pluck(this.state.selectedServiceAuths, 'id');
    var organization = actions.getState('org');
    actions.getOrganizationAuths(organization.id, serviceAuthIDs)
    .then((result) => {
      self.setState({organizationAuths: result.organizationAuths});
    });
  },
  handleSave: function() {
    return actions.upsertAction(this.state.action, this.state.service, this.state.selectedServiceAuths)
  },
  handleTest: function() {
    var self = this;
    var organization = actions.getState('org');
    this.handleSave()
    .then((result) => {
      return actions.testAction(this.state.action.id, organization.id, this.state.testInput)
      .then((result) => {
        self.setState({testOutput: result});
      });
    });
  },
  handleChange: function(field, e) {
    var action = this.state.action;
    if (e.target) { // normal input handler
      this.handleChangeValue(field, e.target.value);
    } else if (e.value) { // dropdown handler
      this.handleChangeValue(field, e.value);
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
    var schemes = [
      {value: 'http', label: 'HTTP'},
      {value: 'https', label: 'HTTPS'},
    ];
    return <div>
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
              <ServiceSelector service={ this.state.service } onChange={this.handleServiceChange.bind(this)} />
            </div>
            <div className="row">
              <TextInputField label="Function" value={this.state.action.function_name} onChange={this.handleChange.bind(this, 'function_name')} />
            </div>
            <div className="row">
              <TextInputField label="Description" value={this.state.action.description} onChange={this.handleChange.bind(this, 'description')} />
            </div>
            <div className="row">
              <TextInputField label="Host" value={this.state.action.host} onChange={this.handleChange.bind(this, 'host')} />
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
            <div className="row">
              <label className="pt-label pt-inline col-xs">
                Scheme
                <Select options={schemes} value={ this.state.action.schemes } onChange={this.handleChange.bind(this, 'schemes')} />
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
            <ParameterList parameters={this.state.action.input} onChange={this.handleChangeValue.bind(this, 'input')} />
            <h4>Input Body</h4>
            <InputBodyEditor value={this.state.action.input_body} onChange={this.handleChange.bind(this, 'input_body')} />
          </TabPanel>
          <TabPanel>
            <h4>Parameters</h4>
            <OutputParameterList parameters={this.state.action.output} onChange={this.handleChangeValue.bind(this, 'output')} />
            <h4>Output Body</h4>
            <OutputBodyEditor value={this.state.action.output_body} onChange={this.handleChange.bind(this, 'output_body')} />
          </TabPanel>
          <TabPanel>
            <h4>Authentication</h4>
            <OrganizationAuthForm
              organization={actions.getState('org')}
              services={[this.state.service]}
              serviceAuths={this.state.selectedServiceAuths}
              onChange={this.handleChangeOrganizationAuths.bind(this)} />
            <h4>Inputs</h4>
            <Json value={this.state.testInput} onChange={this.handleChangeTestInput.bind(this)} />
            <h4>Output</h4>
            <Json value={this.state.testOutput} />
            <hr />
            <button className="pt-button" onClick={this.handleTest.bind(this)}>Test</button>
          </TabPanel>
      </Tabs>
      <hr />
      <button className="pt-button pt-icon-add" onClick={this.handleSave}>Save</button>
    </div>
  }
})

