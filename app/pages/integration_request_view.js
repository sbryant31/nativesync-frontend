var React = require('react');
var actions = require('../modules/actions');
// var Navbar = require('../components/navbar');
var DeveloperView = require('../components/integration_request/developer_view');
var CustomerView = require('../components/integration_request/customer_view');
var lodash = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      integrationRequest: {}
    }
  },
  componentDidMount: function() {
    var self = this;
    return actions.getIntegrationRequestById(this.props.params.id)
    .then((result) => {
      console.log('got result', result);
      self.setState({integrationRequest: result.integrationRequest})
    });
  },
  render() {
    var org = actions.getState('org');
    if (!this.state.integrationRequest.id) {
      return <div>
        Loading...
      </div>
    }
    if (org.id == this.state.integrationRequest.organization_id) {
      return <CustomerView integrationRequest={this.state.integrationRequest} />
    }
    return <DeveloperView integrationRequest={this.state.integrationRequest} />
  }
})
