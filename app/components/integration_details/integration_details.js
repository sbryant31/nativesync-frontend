import React from 'react';
const actions = require('../../modules/actions');
import { Button } from '@blueprintjs/core';

const circle_arrow = require("../../img/circle_arrow.svg");
const filler_text_long = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const filler_text_short = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

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
    actions.getMarketplaceIntegrationById(this.props.integration_id).then(integration => {
      console.log('integration: ', integration);
      this.setState({ integration: integration.integration });
    });
  }

  render() {
    return (
      <div className="IntegrationDetails">
        {!this.state.integration ?
          // if the integration data is being retrieved, show a spinner or its equivalent
          "Please wait, retrieving info..." :

          // once it's finished retrieving, show the data
          <div className="row">
            <div className="heading col-md-12">
              <h2 className="title">{this.state.integration.title}</h2>
              <p className="subtitle">By {this.state.integration.organization.name}
                <span> (version {this.state.integration.version})</span>
              </p>
            </div>
            <div className="col-md-9">
              <div className="details-col-1">
                <div className="services-icons">{
                  this.state.integration.Services.map((service, idx) => (
                    <span className="service" key={service.id}>
                      {idx > 0 ? <img className="circle_arrow" src={circle_arrow} /> : null}
                      <img src={service.logo_url} />
                    </span>
                  ))
                }</div>
                <div className="overview">
                  <h3 className="with-hr">Overview</h3>
                  <p>{this.state.integration.description || filler_text_short}</p>
                </div>
                <div className="how-it-works">
                  <h3 className="with-hr">How It Works</h3>
                  <p>{this.state.integration.how_it_works || filler_text_long}</p>
                </div>
                <div className="what-you-need">
                  <h3 className="with-hr">What You Need</h3>
                  <p>{this.state.integration.requirements || filler_text_long}</p>
                </div>
                {/* <h3>Configuration</h3>
                <p>{JSON.stringify(this.state.integration.configuration)}</p> */}
                {/* <h3>Raw JSON</h3>
                <p>{JSON.stringify(this.state.integration)}</p> */}
              </div>
            </div>
            <div className="col-md-3">
              <div className="details-col-2">
                <Button className="pt-intent-primary pt-large" text="Buy Now" />
                <div className="pricing">{
                  `$${this.state.integration.pricing.upfront} + ` +
                  `$${this.state.integration.pricing.monthly}/month`
                }</div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
