var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')
var _ = require('underscore');

var Select = require('react-select');

var ServiceAuthSelector = require('../components/service_auth/service_auth_selector');
var ServiceSelector = require('../components/service/service_selector');
var ParameterList = require('../components/action/parameter_list');
var KeyValueList = require('../components/inputs/key_value_list');
var TextInputField = require('../components/inputs/text_input_field');
import {Tabs, Tab, TabList, TabPanel} from "@blueprintjs/core"

module.exports = React.createClass({
  getInitialState: function() {
    return {
      action: {
        headers: [],
        query: [],
        input: [],
        output: []
      },
      service: {},
      serviceAuths: [],
      selectedServiceAuths: [],
      readOnly: false
    }
  },
  componentDidMount: function() {
    var self = this;
    console.log('loading action', self.props.params.id);
    if (!isNaN(self.props.params.id)) {
      actions.getActionById(self.props.params.id)
      .then(function(result) {
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
    self.setState({serviceAuths: []});
    actions.getServiceAuths(service.id)
    .then((result) => {
      console.log('got service auths', result);
      self.setState({serviceAuths: result.serviceAuths});
      var newSelected = _.where(self.state.selectedServiceAuths, {service_id: service.id});
      self.setState({selectedServiceAuths: newSelected});
    });
  },
  handleSave: function() {
    actions.upsertAction(this.state.action, this.state.service, this.state.selectedServiceAuths)
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
  handleAuthSchemeChange: function(serviceAuths) {
    this.setState({selectedServiceAuths: serviceAuths});
  },
  render() {
    var actionTypes = [
      {value: 'rest', label: 'NativeSync REST Action 1.0'},
      {value: 'code', label: 'NativeSync Code Action 1.0'}
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
    var bodyTypes = [
      {value: 'formData', label: 'Form'},
      {value: 'json', label: 'JSON'},
      {value: 'xml', label: 'XML'}
    ];
    return <div>
      <h2>Build an Action</h2>
      <Tabs>
          <TabList>
              <Tab>General</Tab>
              <Tab>Authentication</Tab>
              <Tab>Input</Tab>
              <Tab>Output</Tab>
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
              <label className="pt-label pt-inline col-xs">
                Action Type
                <Select options={actionTypes} value={ this.state.action.type } onChange={this.handleChange.bind(this, 'type')} />
              </label>
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
            <label className="pt-label">
              Body Type
              <Select value={ this.state.action.input_content_type } options={bodyTypes} onChange={this.handleChange.bind(this, 'input_content_type')} />
            </label>
            <h4>Parameters</h4>
            <ParameterList parameters={this.state.action.input} onChange={this.handleChangeValue.bind(this, 'input')} />
            <h4>Example</h4>
            <textarea className="pt-input" onChange={this.handleChange.bind(this, 'input_example')} value={this.state.action.input_example} />
          </TabPanel>
          <TabPanel>
            <label className="pt-label">
              Body Type
              <Select value={ this.state.action.output_content_type } options={bodyTypes} onChange={this.handleChange.bind(this, 'output_content_type')} />
            </label>
            <h4>Parameters</h4>
            <ParameterList parameters={this.state.action.output} onChange={this.handleChangeValue.bind(this, 'output')} />
            <h4>Example</h4>
            <textarea className="pt-input" onChange={this.handleChange.bind(this, 'output_example')} value={this.state.action.output_example} />
          </TabPanel>
      </Tabs>
      <hr />
      <button className="pt-button pt-icon-add" onClick={this.handleSave}>Save</button>
    </div>
  }
})

