import React from 'react';
import IntegrationDetails from '../components/integration_details/integration_details.js';
// CSS
import '../components/integration_browser/integration_browser.scss';

export default class Marketplace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {visibility: 'published'}
    }
  }
  render() {
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
};
