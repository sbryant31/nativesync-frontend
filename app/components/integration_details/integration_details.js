import React from 'react';
const actions = require('../../modules/actions');
import { Button } from '@blueprintjs/core';

// CSS
import './integration_details.scss';

export default class IntegrationDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      integration: null
    };
  }

  componentDidMount() {
    // fetch the integration details here
    actions.getIntegrationById(this.props.integration_id).then(integration => {
      console.log('integration: ', integration);
      this.setState({ integration: integration.integration });
    });
  }

  render() {
    return (
      <div className="IntegrationDetails">
        <h1>Integration Details</h1>
        {!this.state.integration ?
          // if the integration data is being retrieved, show a spinner or its equivalent
          "Please wait, retrieving info..." :

          // once it's finished retrieving, show the data
          <div className="row">
            <div className="col-md-9">
              <div className="details-col-1">
                <h2>{this.state.integration.title}</h2>
                <p>By {this.state.integration.organization.name}</p>
                <h3>Version</h3>
                <p>{this.state.integration.version}</p>
                <p>{this.state.integration.description}</p>
                <h3>How It Works</h3>
                <p>{this.state.integration.how_it_works}</p>
                <h3>What You Need</h3>
                <p>{this.state.integration.requirements}</p>
                <a href="#">Documentation</a>
                {/* <h3>Configuration</h3>
                <p>{JSON.stringify(this.state.integration.configuration)}</p> */}
                {/* <h3>Raw JSON</h3>
                <p>{JSON.stringify(this.state.integration)}</p> */}
              </div>
            </div>
            <div className="col-md-3">
              <div className="details-col-2">
                <Button className="pt-intent-primary pt-large" text="Buy Now" />
                <div className="pricing">{JSON.stringify(this.state.integration.pricing)}</div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
