var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')
var Select = require('react-select');
var ServiceAuthList = require('../components/service_auth/service_auth_list');
var TextInputField = require('../components/inputs/text_input_field');
import {Tabs, Tab, TabList, TabPanel} from "@blueprintjs/core"

module.exports = React.createClass({
  getInitialState: function() {
    return {
      service: { },
      serviceAuths: []
    }
  },
  handleSave: function() {
    var self = this;
    actions.upsertService(this.state.service, this.state.serviceAuths)
    .then(function(result) {
      self.setState({service: result.service, serviceAuths: result.serviceAuths});
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
  getDefaultProps: function() {
    return {
      id: null
    }
  },
  componentDidMount: function() {
    var self = this;
    if (self.props.id && !isNaN(self.props.id)) {
      actions.getServiceById(self.props.id, true)
      .then(function(result) {
        self.setState({service: result.service, serviceAuths: result.serviceAuths});
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
        </TabList>
        <TabPanel>
          <h2>General</h2>
          <TextInputField label="Name" value={this.state.service.name} onChange={this.handleChange.bind(this, 'name')} />
          <TextInputField label="Domain" value={this.state.service.domain} onChange={this.handleChange.bind(this, 'domain')} />
          <TextInputField label="Logo URL (less than 50x50px please)" value={this.state.service.logo_url} onChange={this.handleChange.bind(this, 'logo_url')} />
          { this.state.service.logo_url &&
            <img src={this.state.service.logo_url} style={{height: '50px', width: '50px'}} />
          }
        </TabPanel>
        <TabPanel>
          <h2>Authentication</h2>
          <ServiceAuthList services={[this.state.service]} serviceAuths={this.state.serviceAuths} onChange={this.handleServiceAuthChange.bind(this)} readOnly={false} />
        </TabPanel>
      </Tabs>
      <hr />
      <button className="pt-button pt-icon-add" onClick={this.handleSave}>Save</button>
    </div>
  }
})

