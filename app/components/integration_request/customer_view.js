var React = require('react');
var actions = require('../../modules/actions');
// var _ = require('underscore');
// var Select = require('react-select');
// var TextInputField = require('../inputs/text_input_field');
// import StripeCheckout from 'react-stripe-checkout';
const ServiceMultiSelect = require('../service/service_multi_select');
// var Json = require('react-json');
import { Link } from 'react-router';

module.exports = React.createClass({
  getDefaultProps() {
    return {
    };
  },

  getInitialState() {
    return {
      // organization: {}
      new_status: "unsubmitted"
    };
  },

  componentDidMount() {
    // var org = actions.getState('org');
    // return actions.getOrganizationById(org.id)
    // .then((result) => {
    //   this.setState({ organization: result.organization });
    // });
  },

  onToken(token) {
    var self = this;
    console.log('got token', token);
    var organization = this.state.organization;
    organization.stripeToken = token;
    return actions.updateOrganization(organization)
    .then((organization) => {
      self.setState({organization: organization, formComplete: true});
    });
  },

  handleOrganizationChange(field, e) {
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

  newIntegrationRequestOnSubmit(e) {
    e.preventDefault();
    // todo: switch on integration type
    var org = actions.getState('org');
    var request_object = {
      organization_id: org.id,
      integration_id: this.props.id,
      contact_name: this.props.name,
      contact_email: this.props.email,
      contact_phone: this.props.phone,
      services: this.props.apps,
      details: this.props.details,
      type: this.props.onboarding ? this.props.onboarding : 'implement',
      jobStatus: 'assigned',
      discount: 0,
      discountCode: 0,
    };
    console.log("About to submit the following data for an integration request: ", request_object);
    actions.createIntegrationRequest(request_object).then(result => {
      // return actions.goto('/integration_request/' + result.integrationRequest.id);
      this.setState({ new_status: "submitted" });
    });
  },

  __new_form() {
    return <div className="NewIntegrationRequestForm row">
      <div className="col-lg-5 col-md-6 col-sm-8 col-xs-12">
        <div className="content pt-card pt-elevation-3">
          <h1>Get your app connected!</h1>
          <h3>Fill the form out below and an integration specialist will be in touch momentarily.</h3>
          <form onSubmit={this.newIntegrationRequestOnSubmit}>
            <label className="pt-label">
              Name *
              <input
                autoFocus
                required
                placeholder="Your Name"
                id="name"
                className="pt-input pt-large pt-fill"
                value={this.props.id}
                onChange={this.props.inputOnChange}
              />
            </label>
            <label className="pt-label">
              Email *
              <input
                required
                placeholder="Enter email address"
                id="email"
                className="pt-input pt-large pt-fill"
                value={this.props.email}
                onChange={this.props.inputOnChange}
                pattern="^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$"
              />
            </label>
            <label className="pt-label">
              Phone
              <input
                placeholder="Enter phone number"
                id="phone"
                className="pt-input pt-large pt-fill"
                value={this.props.phone}
                onChange={this.props.inputOnChange}
              />
            </label>
            <ServiceMultiSelect
              value={this.props.apps ? this.props.apps : []}
              onChange={this.props.handleAppSelectorChange}
              label="Apps you need to connect"
            />
            <label className="pt-label">
              Details
              <textarea
                id="details"
                className="pt-input pt-large pt-fill"
                value={this.props.details}
                onChange={this.props.inputOnChange}
                placeholder="Tell us more about your business. What are your app integration needs?"
              ></textarea>
            </label>
            <button type="submit" className="pt-button pt-intent-primary pt-large">Send</button>
          </form>
          <hr />
          <h4>Or call us any time at 1-352-538-2624</h4>
        </div>
      </div>

      {/*<StripeCheckout
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
      * We won't charge your card until the integration is configured and live. */}
    </div>;
  },

  __new_success() {
    return <div className="NewIntegrationRequestSuccess row">
      <div className="col-lg-offset-2 col-lg-8">
        <div className="content pt-card pt-elevation-3">
          <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
          <h2>Thanks!</h2>
          <h4>Our integration specialist will be in touch momentarily.</h4>
          <Link to="/">Back to the Marketplace</Link>
        </div>
      </div>
    </div>;
  },

  _new() {
    switch (this.state.new_status) {
      case "unsubmitted": return this.__new_form();
      case "submitted": return this.__new_success();
    }
  },

  _show() {
    return this.props.id ?
      // if the data has finished loading
      <div className="IntegrationRequest-Show">
        <h1>This will be a screen to view an already-submitted integration request</h1>
        <p>{JSON.stringify(this.props)}</p>
      </div> :

      // not finished loading yet
      <p>Loading...</p>;
  },

  render() {
    console.log("PROPS: ", this.props);
    return this.props.mode === "show" ?
      // if there's an ID then just show the request
      this._show() :
      // otherwise show the form for creating a new integration request
      this._new();
  }
});
