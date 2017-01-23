var React = require('react');
// var actions = require('../../modules/actions');
// import EllipsisText  from 'react-ellipsis-text';
import { browserHistory, Link } from 'react-router';
import Avatar from 'react-avatar';

module.exports = ({integrations = [], selected_apps=[], requestIntegrationCardOnClick}) => {
  return (
    <div className="row MarketplaceView">{
      integrations.map(integration => (
        <div key={integration.id} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div
            className={`integration pt-card pt-elevation-0 pt-interactive qty-${integration.Services.length}`}
            onClick={() => { browserHistory.push(`/marketplace/${integration.id}`); }}
          >
            <h4 className="title">{integration.title}</h4>
            <div className={`services-icons ${integration.Services.length === 1 ? "ghost-center" : ""}`}>{
              integration.Services.map((service, idx) => (
                <div className="service-container">
                  {/* <div className="connector"></div> */}
                  {integration.Services.length <= 2 && <div className="connector"></div>}
                  <span className="service" key={service.id}>
                    { service.logo_url ?
                      <img src={service.logo_url} />
                      : <Avatar name={service.name} />
                    }
                  </span>
                </div>
              ))
            }</div>
            {/* <div>{
              integration.Services.map(service => (
                <p>{service.name}</p>
              ))
            }</div> */}
            {/* <EllipsisText
              text={
                integration.description || integration.title ||
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
              }
              length={140}
            /> */}
            <div className="author">{`By ${integration.organization.name}`}</div>
            {/* {
              Object.getOwnPropertyNames(integration.pricing).length > 0 ?
                <div className="pricing">{`$${integration.pricing.monthly}/mo`}</div> :
                ""
            } */}
          </div>
        </div>
      ))}
      {selected_apps.length > 0 &&
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div
            className={`integration pt-card pt-elevation-0 pt-interactive qty-${selected_apps.length}`}
            onClick={requestIntegrationCardOnClick}
          >
            <h4 className="title">Connect {
              selected_apps.map((service, idx) => (
                service.name + (selected_apps.length > 1 ?
                  // if filtering by more than one app, get the punctuation and grammar right
                  (idx < selected_apps.length - 2 ?
                    ", " :
                    (idx < selected_apps.length - 1 ? " and " : "" )
                  ) :
                  // if there is only one selected app then no need to worry about any of that stuff
                  ""
              )))
            }</h4>
            <div className={`services-icons ${selected_apps.length === 1 ? "ghost-center" : ""}`}>{
              selected_apps.map((service, idx) => (
                <div className="service-container">
                  {selected_apps.length <= 2 && <div className="connector"></div>}
                  <span className="service" key={service.id}>
                    { service.logo_url ?
                      <img src={service.logo_url} />
                      : <Avatar size={50} name={service.name} />
                    }
                  </span>
                </div>
              ))
            }</div>
          </div>
        </div>
      }
    </div>
  );
};
