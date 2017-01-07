var React = require('react');
var IntegrationBrowser = require('../components/integration_browser');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filter: { }
    };
  },
  render() {
    return <IntegrationBrowser initialFilter={this.state.filter} view={'marketplace'} />;
  }
});
