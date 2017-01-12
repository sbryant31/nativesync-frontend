import React from 'react';
const actions = require('../../modules/actions');
import { Button, Tabs, TabList, Tab, TabPanel } from '@blueprintjs/core';

const circle_arrow = require("../../img/circle_arrow.svg");
import { filler_text_par1, filler_text_par2, filler_text_par3, filler_text_long, filler_text_short } from './filler_text';

// CSS
import './integration_details.scss';

export default class IntegrationDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      integration: null,
      tab: 'overview'
    };
  }

  componentDidMount() {
    // fetch the integration details here
    actions.getMarketplaceIntegrationById(this.props.integration_id).then(integration => {
      console.log('integration: ', integration);
      this.setState({ integration: integration.integration });
    });
  }

  _overview() {
    return (
      <div className="content">
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
    );
  }

  _documentation() {
    return (
      <div className="content">
        <div className="documentation">
          <h3 className="with-hr">Documentation</h3>
          <p>{filler_text_par1}</p>
          <p>{filler_text_par2}</p>
          <p>{filler_text_par3}</p>
        </div>
      </div>
    );
  }

  _tabs() {
    return (
      <Tabs>
        <TabList className="pt-large">
          <Tab className="noselect">Overview</Tab>
          <Tab>Documentation</Tab>
        </TabList>
        <TabPanel>{this._overview()}</TabPanel>
        <TabPanel>{this._documentation()}</TabPanel>
      </Tabs>
    );
  }

  _likes() {
    return (
      <div className="likes">
        <i className="fa fa-heart-o" aria-hidden="true"></i>
        <a href="#">Like</a>
        <strong className="total_likes_indicator"><span className="howmany">{"63"}</span> Likes</strong>
      </div>
    );
  }

  _developer_info() {
    return (
      <div className="developer_info">

      </div>
    );
  }

  render() {
    return (
      <div className="IntegrationDetails">
        {!this.state.integration ?
          // if the integration data is being retrieved, show a spinner or its equivalent
          "Please wait, retrieving info..." :

          // once it's finished retrieving, show the data
          <div className="row">
            <div className="col-md-12 heading">
              <h2 className="title">{this.state.integration.title}</h2>
              <p className="subtitle">
                By
                <a href="#" className="developer"> {this.state.integration.organization.name}</a>
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
                {this._tabs()}
              </div>
            </div>
            <div className="col-md-3">
              <div className="details-col-2">
                <Button className="pt-intent-primary pt-large" text="Buy Now" />
                <h4 className="pricing">{
                  `$${this.state.integration.pricing.upfront} + ` +
                  `$${this.state.integration.pricing.monthly}/month`
                }</h4>
                {this._likes()}
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
