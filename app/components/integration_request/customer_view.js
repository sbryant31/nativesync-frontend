var React = require('react');
var actions = require('../../modules/actions');
var _ = require('underscore');
var Select = require('react-select');
var TextInputField = require('../inputs/text_input_field');
import StripeCheckout from 'react-stripe-checkout';
var Json = require('react-json');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      formComplete: false,
      organization: {}
    }
  },
  componentDidMount: function() {
    var self = this;
    var org = actions.getState('org');
    return actions.getOrganizationById(org.id)
    .then((result) => {
      self.setState({organization: result.organization});
    })
  },
  onToken: function(token) {
    var self = this;
    console.log('got token', token);
    var organization = this.state.organization;
    organization.stripeToken = token;
    return actions.updateOrganization(organization)
    .then((organization) => {
      self.setState({organization: organization, formComplete: true});
    })
  },
  handleOrganizationChange: function(field, e) {
    var organization = this.state.organization;
    if (e.value) {
      organization[field] = e.value;
    } else if (e.target) {
      organization[field] = e.target.value;
    } else {
      organization[field] = e;
    }
    this.setState({organization: organization});
  },
  getDefaultProps: function() {
    return {
      integrationRequest: {}
    }
  },
  render() {
    var integrationRequest = this.props.integrationRequest;
    var serviceNames = _.map(integrationRequest.services, (service) => {
      return service.name
    }).concat(integrationRequest.newServices);

    if (this.state.formComplete) {
      return <div>
        Thanks! Our integration specialist will be in touch momentarily.
        <a onClick={actions.goto.bind(this, '/marketplace')}>Back to the Marketplace</a>
      </div>
    }

    return <div>
      <h2>Integration request for {serviceNames.join(',')}</h2>
      <p>Fill out the form below and an integration specialist will be in touch momentarily.</p>
      <TextInputField label="name" value={this.state.organization.contact_name} onChange={this.handleOrganizationChange.bind(this, 'contact_name')} />
      <TextInputField label="phone" value={this.state.organization.contact_phone} onChange={this.handleOrganizationChange.bind(this, 'contact_phone')} />
      <TextInputField label="email" value={this.state.organization.contact_email} onChange={this.handleOrganizationChange.bind(this, 'contact_email')} />

      <StripeCheckout
        name="NativeSync"
        description={`API Integration`}
        ComponentClass="div"
        panelLabel="Purchase an Integration"
        currency="USD"
        stripeKey="pk_test_9fnhogndlxQNhCrpBNzlzjzF"
        email={this.state.organization.contact_email}
        alipay
        bitcoin
        allowRememberMe
        token={this.onToken.bind(this)}
        >
        <button className="pt-button pt-button-primary">
          Checkout
        </button>
      </StripeCheckout>
      * We won't charge your card until the integration is configured and live.
    </div>
  }
})
