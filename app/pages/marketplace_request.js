var React = require('react');
// var actions = require('../modules/actions');
// var Navbar = require('../components/navbar');
// var IntegrationBrowser = require('../components/integration_browser');
// var lodash = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      services: '',
      overview: '',
      budget: '',
      notes: '',
    }
  },
  handleChange: function(field, e) {
    if (e.target) {
      this.setState({field: e.target.value});
    } else if (e.value) {
      this.setState({field: e.value});
    } else {
      this.setState({field: e});
    }
  },
  handleSubmit: function() {
    alert('not yet implemented');
  },
  render() {
    return <div>
      <h1>Request an Integration</h1>
      <div>
        If you need an integration that is not yet build, NativeSync is the most affordable place to get it done! Just tell us what you need and we will match you with the perfect integrator, for a fraction of the cost.
      </div>
      <h2>Services</h2>
      <label className="pt-label">
        Tell us which services you need to connect. Examples: Quickbooks, Salesforce, Mailchimp.
        <textarea className="pt-input pt-fill" value={this.state.services} onChange={this.handleChange.bind(this, 'services')} />
      </label>
      <h2>Integration Overview</h2>
      <label className="pt-label">
        Use the following questions as a guideline in formatting your post
        <ul>
          <li>Will the integration run at a regular interval or will it be triggered by an event? Example: "the integration will run every day" or "the integration will run when a new lead is created in hubspot"</li>
          <li>What actions will the integration need? Example: "it will push the lead data into Mailchimp" or "it will create a new order in Quickbooks"</li>
          <li>Elaborate on which specific data fields will need to be mapped between the systems</li>
          <li>Do you need a "one way" or "two way" data sync? Do you need updates to be handled between the systems? This drastically affects the complexity of the job. One-way integrations are much simpler.</li>
        </ul>
        <textarea className="pt-input pt-fill" value={this.state.overview} onChange={this.handleChange.bind(this, 'overview')} />
      </label>
      <h2>Pricing</h2>
      <label className="pt-label">
        How much are you willing to pay upfront for this integration to be built? This will determine which consultants we match you with. Price ranges work fine.
        <textarea className="pt-input pt-fill" value={this.state.budget} onChange={this.handleChange.bind(this, 'budget')} />
      </label>
      <h2>Additional Notes</h2>
      <label className="pt-label">
        Timeframe of the job, anything else you would like to add.
        <textarea className="pt-input pt-fill" value={this.state.notes} onChange={this.handleChange.bind(this, 'notes')} />
      </label>
      <hr />
      <button className="pt-button" onClick={this.handleSubmit}>Submit Request</button>
    </div>
  }
})
