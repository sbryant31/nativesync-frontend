var React = require('react');
var actions = require('../modules/actions');
// var Navbar = require('../components/navbar');
var lodash = require('lodash');
var Select = require('react-select');
var ServiceAuthList = require('../components/service_auth/service_auth_list');
var ServiceDefinitionList = require('./service_definition/service_definition_list');
var TextInputField = require('../components/inputs/text_input_field');
var InputList = require('../components/inputs/input_list');
var ActionBrowser = require('../components/action_browser');
import {Tabs, Tab, TabList, TabPanel} from "@blueprintjs/core"

module.exports = React.createClass({
  getInitialState: function() {
    return {
      service: {api_base_urls: [] },
      serviceAuths: [],
      serviceDefinitions: [],
    }
  },
  handleSave: function() {
    var self = this;
    return actions.upsertService(this.state.service, this.state.serviceAuths, this.state.serviceDefinitions)
    .then(function(result) {
      self.setState({
        service: result.service,
        serviceAuths: result.serviceAuths,
        serviceDefinitions: result.serviceDefinitions
      });
    })
  },
  handleChange: function(field, e) {
    var service = this.state.service;
    if (e.target) { // normal input handler
      this.handleChangeValue(field, e.target.value);
    } else if (e.value) { // dropdown handler
      this.handleChangeValue(field, e.value);
    } else {
      this.handleChangeValue(field, e);
    }
  },
  handleChangeValue: function(field, value) {
    var service = this.state.service;
    service[field] = value;
    this.setState({service: service});
  },
  handleServiceAuthChange: function(serviceAuths) {
    this.setState({serviceAuths: serviceAuths});
  },
  handleServiceDefinitionChange: function(serviceDefinitions) {
    this.setState({serviceDefinitions: serviceDefinitions});
  },
  getDefaultProps: function() {
    return {
      id: null
    }
  },
  componentDidMount: function() {
    var self = this;
    if (self.props.id && !isNaN(self.props.id)) {
      console.log('getting service');
      return actions.getServiceById(self.props.id, true)
      .then(function(result) {
        console.log('got service', result.service);
        self.setState({
          service: result.service,
          serviceAuths: result.serviceAuths,
          serviceDefinitions: result.serviceDefinitions
        });
      })
    }
  },
  render() {
    return <div>
      <h2>Implement a Service {this.state.service.name}</h2>
      <Tabs>
        <TabList>
          <Tab>General</Tab>
          <Tab>Authentication</Tab>
          <Tab>Definitions</Tab>
          <Tab>Actions</Tab>
        </TabList>
        <TabPanel>
          <h2>General</h2>
          <TextInputField label="Name" value={this.state.service.name} onChange={this.handleChange.bind(this, 'name')} />
          <TextInputField label="Domain" value={this.state.service.domain} onChange={this.handleChange.bind(this, 'domain')} />
          <label className="pt-label">
            API Base URLs
            <InputList
              defaultObject={''}
              object={TextInputField}
              list={this.state.service.api_base_urls}
              onChange={this.handleChange.bind(this, 'api_base_urls')}
           />
          </label>
          <TextInputField label="Logo URL (less than 50x50px please)" value={this.state.service.logo_url} onChange={this.handleChange.bind(this, 'logo_url')} />
          { this.state.service.logo_url &&
            <img src={this.state.service.logo_url} style={{height: '50px', width: '50px'}} />
          }
        </TabPanel>
        <TabPanel>
          <h2>Authentication</h2>
          <ServiceAuthList services={[this.state.service]} serviceAuths={this.state.serviceAuths} onChange={this.handleServiceAuthChange.bind(this)} readOnly={false} />
        </TabPanel>
        <TabPanel>
          <h2>Definitions</h2>
          <ServiceDefinitionList
            service={this.state.service}
            serviceDefinitions={this.state.serviceDefinitions}
            onChange={this.handleServiceDefinitionChange.bind(this)}
          />
        </TabPanel>
        <TabPanel>
          <ActionBrowser initialFilter={{service_id: this.state.service.id}} />
        </TabPanel>
      </Tabs>
      <hr />
      <button className="pt-button pt-icon-add" onClick={this.handleSave}>Save</button>
    </div>
  }
})
