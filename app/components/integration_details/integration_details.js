import React from 'react';
const state = require('../../modules/state');
const actions = require('../../modules/actions');
import { Button, Tabs, TabList, Tab, TabPanel } from '@blueprintjs/core';
import { browserHistory } from 'react-router';
// const _ = require('underscore');
import MarkdownRenderer from 'react-markdown';

import { filler_text_par1, filler_text_par2, filler_text_par3, filler_text_long, filler_text_short } from './filler_text';

// CSS
require('./integration_details.scss');

export default class IntegrationDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      integration: null,
      loaded: false,
      tab: 'overview'
    };
  }

  handleBuy() {
    state.set('integration_request_services', [...this.state.integration.Services]);
    browserHistory.push({
      pathname: '/integration_request',
    });
  }

  componentDidMount() {
    // fetch the integration details here
    actions.getMarketplaceIntegrationById(this.props.integration_id).then(integration => {
      console.log('integration: ', integration);
      this.setState({ integration: integration.integration , loaded: true });
    });
  }

  _overview() {
    return (
      <div className="content">
        <div className="overview">
          <h3 className="with-hr">Overview</h3>
          <MarkdownRenderer source={this.state.loaded && this.state.integration.description && this.state.integration.description.length > 0 ?
              this.state.integration.description :
              this.state.integration.organization.overview_copy} />
        </div>
      </div>
    );
  }

  _documentation() {
    return (
      <div className="content">
        <div className="documentation">
          <h3 className="with-hr">Documentation</h3>
          <MarkdownRenderer source={this.state.integration.documentation} />
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
                      {idx > 0 ? <span className="connector" /> : null}
                      <div className="service-icon-container">
                        <img src={service.logo_url} />
                      </div>
                    </span>
                  ))
                }</div>
                {this._tabs()}
              </div>
            </div>
            <div className="col-md-3">
              <div className="details-col-2">
                <Button className="pt-intent-primary pt-large" onClick={this.handleBuy.bind(this)} text="Get this Integration" />
                {/* <h4 className="pricing">{
                  `$${this.state.integration.pricing.monthly}/month`
                }</h4> */}
                {/* {this._likes()} */}
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
