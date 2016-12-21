var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')
var _ = require('underscore');

var ServiceAuthSelector = require('../components/service_auth/service_auth_selector');
var ServiceSelector = require('../components/service/service_selector');
var ParameterList = require('../components/action/parameter_list');
var KeyValueList = require('../components/action/key_value_list');

import {Tabs, Tab, TabList, TabPanel} from "@blueprintjs/core"

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
      actions.getActionById(this.props.params.id)
      .then(function(result) {
        self.setState({action: result.action, service: result.service, serviceAuths: result.serviceAuths});
      })
    }
  },
  handleSave: function() {
    actions.upsertAction(this.state.action, this.state.service, this.state.serviceAuths)
  },
  handleChange: function(field, e) {
    var action = this.state.action;
    this.handleChangeValue(field, e.target.value);
  },
  handleChangeValue: function(field, value) {
    var action = this.state.action;
    action[field] = value;
    this.setState({action: action});
  },
  handleParameterAdd: function(type) {
    // get input or output params
    var action = this.state.action;
    action[type].push({name: '', in: '', description: '', type: ''});
    this.setState({action: action});
  },
  handleParameterRemove: function(type, index) {
    console.log('remove index', index);
    var action = this.state.action;
    action[type].splice(index, 1);
    this.setState({action: action});
  },
  handleAuthSchemeChange: function(serviceAuths) {
    console.log(serviceAuths);
    this.setState({serviceAuths: serviceAuths});
  },
  render() {
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
                <input className="pt-input" value={ this.state.action.function_name } onChange={this.handleChange.bind(this, 'function_name')} />
              </label>
            </div>
            <div className="row">
              <label className="pt-label pt-inline col-xs">
                Description
                <input className="pt-input" value={ this.state.action.description } onChange={this.handleChange.bind(this, 'description')}/>
              </label>
            </div>
            <div className="row">
              <label className="pt-label pt-inline col-xs">
                Action Type
                <input className="pt-input" value={ this.state.action.type } onChange={this.handleChange.bind(this, 'type')} />
              </label>
            </div>
            <div className="row">
              <label className="pt-label pt-inline col-xs">
                Host
                <input className="pt-input" value={ this.state.action.host } onChange={this.handleChange.bind(this, 'host')} />
              </label>
            </div>
            <div className="row">
              <label className="pt-label pt-inline col-xs">
                Path
                <input className="pt-input" value={ this.state.action.path } onChange={this.handleChange.bind(this, 'path')} />
              </label>
            </div>
            <div className="row">
              <label className="pt-label pt-inline col-xs">
                Method
                <input className="pt-input" value={ this.state.action.method } onChange={this.handleChange.bind(this, 'method')} />
              </label>
            </div>
            <div className="row">
              <label className="pt-label pt-inline col-xs">
                Scheme
                <input className="pt-input" value={ this.state.action.schemes } onChange={this.handleChange.bind(this, 'schemes')} />
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
            <ServiceAuthSelector service={ this.state.service } onChange={this.handleAuthSchemeChange} value={this.state.serviceAuths} />
          </TabPanel>
          <TabPanel>
            <label className="pt-label">
              Content Type
              <input className="pt-input" value={ this.state.action.input_content_type } />
            </label>
            <h4>Parameters</h4>
            <ParameterList parameters={this.state.action.input} onAdd={this.handleParameterAdd.bind(this, 'input')} onRemove={this.handleParameterRemove.bind(this, 'input')} />
            <h4>Example</h4>
            { JSON.stringify(this.state.action.input_example) }
          </TabPanel>
          <TabPanel>
            <label className="pt-label">
              Content Type
              <input className="pt-input" value={ this.state.action.output_content_type } />
            </label>
            <h4>Parameters</h4>
            <ParameterList parameters={this.state.action.output} onAdd={this.handleParameterAdd.bind(this, 'output')} onRemove={this.handleParameterRemove.bind(this, 'output')} />
            <h4>Example</h4>
            { JSON.stringify(this.state.action.output_example) }
          </TabPanel>
      </Tabs>
      <hr />
      <button className="pt-button pt-icon-add" onClick={this.handleSave}>Save</button>
    </div>
  }
})

