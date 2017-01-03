var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');

var OrganizationAuthBasic = require('../organization_auth/organization_auth_basic');
var OrganizationAuthConfiguration = require('../organization_auth/organization_auth_configuration');
var OrganizationAuthApikey = require('../organization_auth/organization_auth_apikey');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      serviceAuth: {},
      service: {},
      organization: {},
      organizationAuth: {}
    }
  },
  render() {
    var self = this;
    return <div>
      <div className="row">{this.props.service.name} Auth { this.props.serviceAuth.name } type { this.props.serviceAuth.type } </div>
      <div className="row">
        { this.props.serviceAuth.type == 'basic' &&
          <OrganizationAuthBasic details={this.props.serviceAuth.details} value={this.props.organizationAuth.value} onChange={this.handleValueChange} />
        }
        { this.props.serviceAuth.type == 'configuration' &&
          <OrganizationAuthConfiguration details={this.props.serviceAuth.details} value={this.props.organizationAuth.value} onChange={this.handleValueChange} />
        }

        { this.props.serviceAuth.type == 'apiKey' &&
          <OrganizationAuthApikey details={this.props.serviceAuth.details} value={this.props.organizationAuth.value} onChange={this.handleValueChange} />
        }
        { this.props.serviceAuth.type == 'oauth2' &&
          <div>Coming soon: Oauth2 based Auth.</div>
        }
      </div>
    </div>
  }
})
