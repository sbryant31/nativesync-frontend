import React, {PropTypes as T} from 'react';
const IntegrationBrowser = require('../components/integration_browser/integration_browser');
import IntegrationDetails from '../components/integration_details/integration_details';

export default class Marketplace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {}
    };
  }

  render() {
    return (this.props.params.id ?
      // if an integration id was given, then show details for the integration
      <IntegrationDetails integration_id={this.props.params.id} /> :

      // otherwise show the integration browser
      <IntegrationBrowser
        initialFilter={this.state.filter}
        view={'marketplace'}
      />
    );
  }
}

Marketplace.propTypes = {
  params: T.object,
};
