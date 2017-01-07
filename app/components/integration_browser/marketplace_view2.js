var React = require('react');
var actions = require('../../modules/actions');

const circle_arrow = require("../../img/circle_arrow.svg");

module.exports = ({integrations = []}) => {
  return (
    <div className="row MarketplaceView">{
      integrations.map(integration => (
        <div
          key={integration.id}
          className="integration pt-card pt-elevation-0 pt-interactive col-md-3"
        >
          <div className="services-icons">{
            integration.Services.map((service, idx) => (
              <span className="service" key={service.id}>
                {idx > 0 ? <img className="circle_arrow" src={circle_arrow} /> : null}
                <img src={service.logo_url} />
              </span>
            ))
          }</div>
          <h4 className="title">{integration.title}</h4>
          <p className="description">{
            integration.description ||
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
          }</p>
        </div>
      ))
    }</div>
  );
};

// module.exports = React.createClass({
//   getInitialState: function() {
//     return { };
//   },
//   getDefaultProps: function() {
//     return {
//       integrations: [],
//     };
//   },
//   render() {
//     console.log("integrations: ", this.props.integrations);
//     return (
//       <div>
//     );
//     return this.props.integrations.map((integration) => {
//       return <span key={integration.id}>abc</span>;
//       // var services = integration.Services.map((service) => {
//       //   return (<div>
//       //       {service.name} <img src={service.logo_url} style={{height: 50, width: 50}} />
//       //     </div>
//       //   );
//       // });
//       // return (
//       //   <tr key={integration.id}>
//       //     <td>{integration.organization.name}</td>
//       //     <td>
//       //       <a onClick={() => { actions.goto('/integration/' + integration.id); }}>
//       //         {integration.title}
//       //       </a>
//       //     </td>
//       //     <td>{integration.description}</td>
//       //     <td>{integration.version}</td>
//       //     <td>{services}</td>
//       //     <td>{JSON.stringify(integration.pricing)}</td>
//       //   </tr>
//       // );
//     });
//     // return <div>
//     //   <span>Dont see what you need?{" "}
//     //     <a onClick={() => { actions.goto('/marketplace/request'); }}>
//     //       Request a custom integration!
//     //     </a>
//     //   </span>
//     //   <hr/>
//     //   <table className="pt-table pt-striped">
//     //     <thead>
//     //     <tr>
//     //        <th>Built By</th>
//     //        <th>Title</th>
//     //        <th>Description</th>
//     //        <th>Version</th>
//     //        <th>Services</th>
//     //        <th>Cost*</th>
//     //     </tr>
//     //     </thead>
//     //     <tbody>
//     //       {integrationsList}
//     //     </tbody>
//     //   </table>
//     //   <span>*Costs do not include platform fees which may incur from usage</span>
//     // </div>;
//   }
// });
