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
      partner: {
      }
    }
  },
  handleSave: function() {
    actions.upsertPartner(this.state.partner)
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
    var partner = this.state.partner;
    partner[field] = value;
    this.setState({partner: partner});
  },
  getDefaultProps: function() {
    return {
      id: null
    }
  },
  componentDidMount: function() {
    var self = this;
    if (self.props.id && !isNaN(self.props.id)) {
      actions.getPartnerById(self.props.id)
      .then(function(result) {
        self.setState({partner: result.partner});
      })
    }
  },
  render() {
    return <div>
      <h2>Create/Edit Team {this.state.partner.name}</h2>
      <TextInputField label="Name" value={this.state.partner.name} onChange={this.handleChange.bind(this, 'name')} />
      <hr />
      <button className="pt-button pt-icon-add" onClick={this.handleSave}>Save</button>
    </div>
  }
})

