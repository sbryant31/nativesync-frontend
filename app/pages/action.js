var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')

import {Tabs, Tab, TabList, TabPanel} from "@blueprintjs/core"

var ServiceSelector = React.createClass({
  getInitialState: function() {
    return {
      services: [],
    }
  },
  getDefaultProps: function() {
    return {
      service: {}
    }
  },
  componentDidMount: function() {
    var self = this;
    actions.getServices()
    .then(function(services) {
      self.setState({services: services})
    })
  },
  render() {
    var self = this;
    var services = lodash.map(this.state.services, function(service) {
      return <option value={service.id} key={service.id}>
               {service.name}
      </option>
    });
    return <label className="pt-label pt-inline col-xs">
      Service
      <select value={this.props.service.id}>
        {services}
      </select>
    </label>
  }
})

var ServiceAuthSelector = React.createClass({
  getInitialState: function() {
    return {
      serviceAuths: [],
    }
  },
  getDefaultProps: function() {
    return {
      service: {},
    }
  },
  componentDidMount: function() {
    var self = this;
    actions.getServiceAuths(this.props.service.id)
    .then(function(serviceAuths) {
      self.setState({serviceAuths: serviceAuths})
    })
  },
  render() {
    var self = this;
    var serviceAuths = lodash.map(this.state.serviceAuths, function(serviceAuth) {
      return <option value={serviceAuth.id} key={serviceAuth.id}>
               {serviceAuth.name}
      </option>
    });
    return <label className="pt-label pt-inline col-xs">
      Authentication Schemes for {this.props.service.name}
      <select>
        {serviceAuths}
      </select>
    </label>
  }
})

module.exports = React.createClass({
  getInitialState: function() {
    return {
      action: {},
      service: {},
      serviceAuths: [],
      readOnly: false
    }
  },
  componentDidMount: function() {
    var self = this;
    if (!isNaN(this.props.params.id)) {
      console.log('getting action id', this.props.params.id);
      actions.getActionById(this.props.params.id)
      .then(function(result) {
        self.setState({action: result.action, service: result.service, serviceAuths: result.serviceAuths});
      })
    }
  },
  handleSave: function() {
    actions.upsertAction(this.state.action, this.state.service, this.state.serviceAuths)
  },
  render() {
    var authList = lodash.map(this.state.serviceAuths,function(serviceAuth){
      return <div className="row">
        <div className="col-xs-3">
          name: { serviceAuth.name }
        </div>
        <div className="col-xs-3">
          type: { serviceAuth.type }
        </div>
        <div className="col-xs-3">
          details: { JSON.stringify(serviceAuth.details) }
        </div>
      </div>
    })
    var headerList = lodash.map(this.state.action.headers,function(value, key){
      return <div className="row">
        <label className="pt-label col-xs-3">
          Name
          <input className="pt-input" value={ key } />
        </label>
        <label className="pt-label col-xs-3">
          Value
          <input className="pt-input" value={ value } />
        </label>
      </div>
    })
    var queryList = lodash.map(this.state.action.query,function(value, key){
      return <div className="row">
        <label className="pt-label col-xs-3">
          Name
          <input className="pt-input" value={ key } />
        </label>
        <label className="pt-label col-xs-3">
          Value
          <input className="pt-input" value={ value } />
        </label>
      </div>
    })
    var inputList = lodash.map(this.state.action.input,function(parameter){
      return <div className="row">
        <label className="pt-label pt-inline col-xs-2">
          Name <input className="pt-input" value={ parameter.name } />
        </label>
        <label className="pt-label pt-inline col-xs-2">
          In <input className="pt-input" value={ parameter.in } />
        </label>
        <label className="pt-label pt-inline col-xs-3">
          Description <input className="pt-input" value={ parameter.description } />
        </label>
        <label className="pt-label pt-inline col-xs-2">
          Type <input className="pt-input" value={ parameter.type } />
        </label>
      </div>
    })
    var outputList = []; // todo: refactor input list and output list into a component
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
              <ServiceSelector service={ this.state.service } />
            </div>
            <div className="row">
              <label className="pt-label pt-inline col-xs">
                Function
                <input className="pt-input" value={ this.state.action.function_name } />
              </label>
            </div>
            <div className="row">
              <label className="pt-label pt-inline col-xs">
                Description
                <input className="pt-input" value={ this.state.action.description } />
              </label>
            </div>
            <div className="row">
              <label className="pt-label pt-inline col-xs">
                Action Type
                <input className="pt-input" value={ this.state.action.type } />
              </label>
            </div>
            <div className="row">
              <label className="pt-label pt-inline col-xs">
                Host
                <input className="pt-input" value={ this.state.action.host } />
              </label>
            </div>
            <div className="row">
              <label className="pt-label pt-inline col-xs">
                Path
                <input className="pt-input" value={ this.state.action.path } />
              </label>
            </div>
            <div className="row">
              <label className="pt-label pt-inline col-xs">
                Method
                <input className="pt-input" value={ this.state.action.method } />
              </label>
            </div>
            <div className="row">
              <label className="pt-label pt-inline col-xs">
                Scheme
                <input className="pt-input" value={ this.state.action.schemes } />
              </label>
            </div>
            <hr />
            <h4>Headers</h4>
            { headerList }
            <hr />
            <h4>Query params</h4>
            { queryList }
          </TabPanel>
          <TabPanel>
            { authList }
            <ServiceAuthSelector service={ this.state.service } />
          </TabPanel>
          <TabPanel>
            <label className="pt-label">
              Content Type
              <input className="pt-input" value={ this.state.action.input_content_type } />
            </label>
            <h4>Parameters</h4>
            { inputList }
            <h4>Example</h4>
            { JSON.stringify(this.state.action.input_example) }
          </TabPanel>
          <TabPanel>
            <label className="pt-label">
              Content Type
              <input className="pt-input" value={ this.state.action.output_content_type } />
            </label>
            <h4>Parameters</h4>
            { outputList }
            <h4>Example</h4>
            { JSON.stringify(this.state.action.output_example) }
          </TabPanel>
      </Tabs>
      <hr />
      <button className="pt-button pt-icon-add" onClick={this.handleSave}>Save</button>
    </div>
  }
})

