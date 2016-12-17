var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      integration: {},
      services: [],
      serviceAuths: [],
      integrationCode: {},
    }
  },
  getDefaultProps: function() {
    return {
      id: null
    }
  },
  componentDidMount: function() {
    var self = this;
    if (self.props.id && !isNaN(self.props.id)) {
      actions.getIntegrationById(self.props.id)
      .then(function(result) {
        self.setState({integration: result.integration, services: result.services, serviceAuths: result.serviceAuths, integrationCode: result.integrationCode});
      })
    }
  },
  render() {
    var authList = lodash.map(this.state.serviceAuths,function(serviceAuth){
      return <div>
        name: { serviceAuth.name }
        type: { serviceAuth.type }
        details: { serviceAuth.details }
      </div>
    })
    var serviceList = lodash.map(this.state.services,function(service){
      return <div>
        <label classNameName="pt-label">
          Name
          <input className="pt-input" value={ service.name } />
        </label>
      </div>
    })
    var codeSection = '';
    if (this.state.integrationCode) {
      codeSection = <div>
        <h2>Code</h2>
        <textarea class="pt-input pt-fill" value={ this.state.integrationCode.code ? this.state.integrationCode.code : ''} />
      </div>;
    }
    return <div>
      <h2>{this.state.integration.title}</h2>
      <label className="pt-label">
        Scheduling Info
        <input className="pt-input" value={ JSON.stringify(this.state.integration.scheduling_info)} />
      </label>
      <br/>
      <label className="pt-label">
        Type
        <input className="pt-input" value={ this.state.integration.type } />
      </label>
      <br/>
      <label className="pt-label">
        Title
        <input className="pt-input" value={ this.state.integration.title } />
      </label>
      <br/>
      <label className="pt-label">
        Description
        <input className="pt-input" value={ this.state.integration.description } />
      </label>
      <br/>
      <label className="pt-label">
        Version
        <input className="pt-input" value={ this.state.integration.version } />
      </label>
      <br/>
      <label className="pt-label">
        Documentation
        <input className="pt-input" value={ this.state.integration.documentation } />
      </label>
      <br/>
      <hr />
      <h2>Services</h2>
      { serviceList }
      <hr />
      <h2>Authentication</h2>
      { authList }
      <hr />
      { codeSection }

    </div>
  }
})

