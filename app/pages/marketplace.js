import React from 'react';
const IntegrationBrowser = require('../components/integration_browser/integration_browser.js');
import IntegrationDetails from '../components/integration_details/integration_details.js';

// CSS
import '../components/integration_browser/integration_browser.scss';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filter: {}
    };
  },

  render: function() {
    return (
      <div className="Marketplace">
        <h1 className="page-title">Ready to use Integrations</h1>
        <div className="pt-content">{
          this.props.params.id ?
            // if an integration id was given, then show details for the integration
            <IntegrationDetails integration_id={this.props.params.id} /> :

            // otherwise show the integration browser
            <IntegrationBrowser
              initialFilter={this.state.filter}
              view={'marketplace'}
            />
        }</div>
      </div>
    );
  }
});
