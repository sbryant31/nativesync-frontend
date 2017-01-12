var React = require('react');
var actions = require('../../modules/actions');
import EllipsisText  from 'react-ellipsis-text';
import { browserHistory } from 'react-router';

// CSS
import './integration_browser.scss';

const circle_arrow = require("../../img/circle_arrow.svg");

module.exports = ({integrations = []}) => {
  return (
    <div className="row MarketplaceView">{
      integrations.map(integration => (
        <div key={integration.id} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div
            className="integration pt-card pt-elevation-0 pt-interactive"
            onClick={() => { browserHistory.push(`/marketplace/${integration.id}`); }}
          >
            <div className="services-icons">{
              integration.Services.map((service, idx) => (
                <span className="service" key={service.id}>
                  {idx > 0 ? <img className="circle_arrow" src={circle_arrow} /> : null}
                  <img src={service.logo_url} />
                </span>
              ))
            }</div>
            {/* <div>{
              integration.Services.map(service => (
                <p>{service.name}</p>
              ))
            }</div> */}
            <h4 className="title">{integration.title}</h4>
            <EllipsisText
              text={
                integration.description ||
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
              }
              length={140}
            />
            <div className="author">{`By ${integration.organization.name}`}</div>
            {
              Object.getOwnPropertyNames(integration.pricing).length > 0 ?
                <div className="pricing">{`$${integration.pricing.upfront} + $${integration.pricing.monthly}/mo`}</div> :
                ""
            }
          </div>
        </div>
      ))
    }</div>
  );
};
