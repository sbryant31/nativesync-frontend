var React = require('react');
var actions = require('../../modules/actions');
var state = require('../../modules/state');
// var Navbar = require('../../components/navbar');
var DeveloperView = require('../../components/integration_request/developer_view');
var CustomerView = require('../../components/integration_request/customer_view');
var lodash = require('lodash');

// CSS
import './integration_request.scss';

module.exports = React.createClass({
  getInitialState() {
    return {
      apps: actions.getState('integration_request_services')
    };
  },

  componentDidMount() {
    if (this.props.params.id) {
      actions.getIntegrationRequestById(this.props.params.id)
      .then(result => {
        // console.log("RESULT: ", result);
        this.setState(result.integrationRequest);
      });
    }
    else {
      // delete the below property in the store if it exists. It will only be there if the user
      // got here by clicking on "Get this integration" in the integration details page.
      state.delete('integration_request_services');
    }
  },

  handleAppSelectorChange(apps) {
    console.log("handleAppSelectorChange()", apps);
    this.setState({ apps });
  },

  inputOnChange(e) {
    switch (e.target.id) {
      case "name":
      case "email":
      case "phone":
      case "details":
        this.setState({ [e.target.id]: e.target.value });
        break;
      default: return;
    }
  },

  render() {
    var org = actions.getState('org');
    return <div className="IntegrationRequest">{
      this.props.params.id ?
        // SHOW
        <CustomerView
          mode="show"
          {...this.state}
        /> :
        // NQ: DECIDE LATER WHETHER OR NOT WE WANT TO HAVE A SEPARATE DEVELOPER VIEW
        // (org.id === this.state.organization_id ?
        //   <CustomerView
        //     {...this.state}
        //     handleAppSelectorChange={this.handleAppSelectorChange}
        //     inputOnChange={this.inputOnChange}
        //   /> :
        //   <DeveloperView {...this.state} />
        // ) :
        // NEW
        <CustomerView
          {...this.state}
          handleAppSelectorChange={this.handleAppSelectorChange}
          inputOnChange={this.inputOnChange}
        />
    }</div>;
  }
});
