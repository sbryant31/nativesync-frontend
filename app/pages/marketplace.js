import React from 'react';
import IntegrationDetails from '../components/integration_details/integration_details.js';
import IntegrationBrowser from '../components/integration_browser/integration_browser.js';
// CSS
import '../components/integration_browser/integration_browser.scss';

class Marketplace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {visibility: 'published'}
    };
  }
  render() {
    return (
      <div className="Marketplace">
        <span className="page-title">Ready to use Integrations</span>
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
}

module.exports = Marketplace;
