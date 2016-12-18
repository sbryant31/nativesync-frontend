var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')

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
      console.log('getting action id', this.props.params.id);
      actions.getActionById(this.props.params.id)
      .then(function(result) {
        self.setState({action: result.action, service: result.service, serviceAuths: result.serviceAuths});
      })
    }
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
            <label class="pt-label">
              Service
              <input class="pt-input" value={ this.state.service.name } />
            </label>
            <br/>
            <label class="pt-label">
              Function
              <input class="pt-input" value={ this.state.action.function_name } />
            </label>
            <br/>
            <label class="pt-label">
              Description
              <input class="pt-input" value={ this.state.action.description } />
            </label>
            <br/>
            <label class="pt-label">
              Action Type
              <input class="pt-input" value={ this.state.action.type } />
            </label>
            <br/>
            <label class="pt-label">
              Host
              <input class="pt-input" value={ this.state.action.host } />
            </label>
            <br/>
            <label class="pt-label">
              Path
              <input class="pt-input" value={ this.state.action.path } />
            </label>
            <br/>
            <label class="pt-label">
              Method
              <input class="pt-input" value={ this.state.action.method } />
            </label>
            <br/>
            <label class="pt-label">
              Scheme
              <input class="pt-input" value={ this.state.action.schemes } />
            </label>
            <hr />
            <h4>Headers</h4>
            { headerList }
            <hr />
            <h4>Query params</h4>
            { queryList }
          </TabPanel>
          <TabPanel>
            { authList }
          </TabPanel>
          <TabPanel>
            <label class="pt-label">
              Content Type
              <input class="pt-input" value={ this.state.action.input_content_type } />
            </label>
            <h4>Parameters</h4>
            { inputList }
            <h4>Example</h4>
            { JSON.stringify(this.state.action.input_example) }
          </TabPanel>
          <TabPanel>
            <label class="pt-label">
              Content Type
              <input class="pt-input" value={ this.state.action.output_content_type } />
            </label>
            <h4>Parameters</h4>
            { outputList }
            <h4>Example</h4>
            { JSON.stringify(this.state.action.output_example) }
          </TabPanel>
      </Tabs>
    </div>
  }
})

