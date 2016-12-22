var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')
var ServiceAuthList = require('../components/service_auth/service_auth_list');
var ServiceMultiSelect = require('../components/service/service_multi_select');
var TriggerInfo = require('../components/integration/trigger_info');
var TextInputField = require('../components/inputs/text_input_field');
var CodeEditor = require('../components/inputs/code_editor');
var ActionMultiSelect = require('../components/action/action_multi_select');
var MarkdownEditor = require('../components/inputs/markdown_editor');
import {Tabs, Tab, TabList, TabPanel} from "@blueprintjs/core"

module.exports = React.createClass({
  getInitialState: function() {
    return {
      integration: {
        scheduling_info: {}
      },
      services: [],
      actions: [],
      integrationCode: { },
    }
  },
  handleChange: function(field, e) {
    var integration = this.state.integration;
    if (e.target) { // normal input handler
      this.handleChangeValue(field, e.target.value);
    } else if (e.value) { // dropdown handler
      this.handleChangeValue(field, e.value);
    }
  },
  handleChangeValue: function(field, value) {
    var integration = this.state.integration;
    integration[field] = value;
    this.setState({integration: integration});
  },
  handleServiceChange: function(services) {
    this.setState({services: []});
  },
  handleActionChange: function(actions) {
    this.setState({actions: actions});
  },
  handleCodeChange: function(e) {
		var integrationCode = this.state.integrationCode;
		integrationCode.code = e.target.value;
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
      actions.getIntegrationById(self.props.id)
      .then(function(result) {
        self.setState({integration: result.integration, services: result.services, serviceAuths: result.serviceAuths, integrationCode: result.integrationCode});
      })
    }
  },
  render() {
    return <div>
      <h2>Build an Integration {this.state.integration.title}</h2>
			<Tabs>
				<TabList>
						<Tab>General</Tab>
						<Tab>Services</Tab>
						<Tab>Actions</Tab>
						<Tab>Code</Tab>
						<Tab>Documentation</Tab>
						<Tab>Publish</Tab>
				</TabList>
				<TabPanel>
					<h2>General</h2>
					<TextInputField label="Title" value={this.state.integration.title} onChange={this.handleChange.bind(this, 'title')} />
					<TextInputField label="Version" value={this.state.integration.version} onChange={this.handleChange.bind(this, 'version')} />
					<TextInputField label="Type" value={this.state.integration.type} onChange={this.handleChange.bind(this, 'type')} />
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
				</TabPanel>
				<TabPanel>
					<h2>Code</h2>
					<CodeEditor value={this.state.integration.code} onChange={this.handleCodeChange.bind(this)} />
				</TabPanel>
				<TabPanel>
					<h2>Documentation</h2>
					<MarkdownEditor value={this.state.integration.documentation} onChange={this.handleChange.bind(this, 'documentation')} />
				</TabPanel>
				<TabPanel>
					<h2>Publish</h2>
				</TabPanel>
			</Tabs>
    </div>
  }
})

