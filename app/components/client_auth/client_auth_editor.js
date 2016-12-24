var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');

var ClientAuthBasic = require('../client_auth/client_auth_basic');
var ClientAuthConfiguration = require('../client_auth/client_auth_configuration');
var ClientAuthApikey = require('../client_auth/client_auth_apikey');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      serviceAuth: {},
      service: {},
      client: {},
      clientAuth: {}
    }
  },
  render() {
    var self = this;
    return <div>
      <div className="row">Auth { this.props.serviceAuth.name } type { this.props.serviceAuth.type } </div>
      <div className="row">
        { this.props.serviceAuth.type == 'basic' &&
          <ClientAuthBasic details={this.props.serviceAuth.details} value={this.props.clientAuth.value} onChange={this.handleValueChange} />
        }
        { this.props.serviceAuth.type == 'configuration' &&
          <ClientAuthConfiguration details={this.props.serviceAuth.details} value={this.props.clientAuth.value} onChange={this.handleValueChange} />
        }

        { this.props.serviceAuth.type == 'apiKey' &&
          <ClientAuthApikey details={this.props.serviceAuth.details} value={this.props.clientAuth.value} onChange={this.handleValueChange} />
        }
        { this.props.serviceAuth.type == 'oauth2' &&
          <div>Coming soon: Oauth2 based Auth.</div>
        }
      </div>
    </div>
  }
})
