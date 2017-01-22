var React = require('react');
var actions = require('../../modules/actions');
// var _ = require('underscore');
// var Select = require('react-select');
// var TextInputField = require('../inputs/text_input_field');
// import StripeCheckout from 'react-stripe-checkout';
const ServiceMultiSelect = require('../service/service_multi_select');
// var Json = require('react-json');

module.exports = React.createClass({
  getDefaultProps() {
    return {
    };
  },

  getInitialState() {
    return {
      // organization: {}
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

  onSubmit(e) {
    e.preventDefault();
    // todo: switch on integration type
    actions.createIntegrationRequest({
      ...this.props,
      integration_id: this.props.id,
      type: this.props.onboarding ? this.props.onboarding : 'implement',
      jobStatus: 'assigned',
      discount: 0,
      discountCode: 0,
    }).then(result => {
      return actions.goto('/integration_request/' + result.integrationRequest.id);
    });
  },

  _new() {
    return <div className="IntegrationRequest-New">
      <h1>Get your app connected!</h1>
      <h2>Fill the form out below and an integration specialist will be in touch momentarily.</h2>
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="pt-control-group pt-vertical">
              <label className="pt-label">
                Name
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
                Email
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
              <label className="pt-label">
                Apps you need to connect
                <ServiceMultiSelect
                  value={this.props.apps ? this.props.apps : []}
                  onChange={this.props.handleAppSelectorChange}
                />
              </label>
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
            </div>
          </div>
        </div>
      </form>

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

  _show() {
    return <div className="IntegrationRequest-Show">
      <p>{JSON.stringify(this.props.id)}</p>
    </div>;
  },

  render() {
    console.log("PROPS: ", this.props);
    return this.props.id ?
      // if there's an ID then just show the request
      this._show() :
      // otherwise show the form for creatin a new integration request
      this._new();
  }
});
