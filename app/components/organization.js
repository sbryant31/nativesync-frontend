var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')
var Select = require('react-select');
var TextInputField = require('../components/inputs/text_input_field');
import {Tabs, Tab, TabList, TabPanel} from "@blueprintjs/core"

module.exports = React.createClass({
  getInitialState: function() {
    return {
      organization: {
      }
    }
  },
  handleSave: function() {
    actions.upsertOrganization(this.state.organization)
  },
  handleChange: function(field, e) {
    if (e.target) { // normal input handler
      this.handleChangeValue(field, e.target.value);
    } else if (e.value) { // dropdown handler
      this.handleChangeValue(field, e.value);
    } else {
      this.handleChangeValue(field, e);
    }
  },
  handleChangeValue: function(field, value) {
    var organization = this.state.organization;
    organization[field] = value;
    this.setState({organization: organization});
  },
  getDefaultProps: function() {
    return {
      id: null
    }
  },
  componentDidMount: function() {
    var self = this;
    if (self.props.id && !isNaN(self.props.id)) {
      actions.getOrganizationById(self.props.id)
      .then(function(result) {
        self.setState({organization: result.organization});
      })
    }
  },
  render() {
    return <div>
      <h2>Create/Edit Organization {this.state.organization.name}</h2>
      <TextInputField label="Name" value={this.state.organization.name} onChange={this.handleChange.bind(this, 'name')} />
      <hr />
      <button className="pt-button pt-icon-add" onClick={this.handleSave}>Save</button>
    </div>
  }
})

