import React, {PropTypes as T} from 'react';
import IntegrationBrowser from '../components/integration_browser';
import IntegrationDetails from '../components/integration_browser/integration_details';

export default class Marketplace extends React.createClass{
  constructor() {
    super();
    this.state = {
      filter: {}
    };
  }

  render() {
    return (this.props.params.id ?
      // if an integration id was given, then show details for the integration
      <IntegrationDetails id={this.props.params.id} /> :

      // otherwise show the integration browser
      <IntegrationBrowser
        initialFilter={this.state.filter}
        view={'marketplace'}
      />
    );
  }
}

Marketplace.propTypes = {
  params: T.object.isRequired,
};
