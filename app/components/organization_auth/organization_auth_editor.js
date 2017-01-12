var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');

var OrganizationAuthBasic = require('../organization_auth/organization_auth_basic');
var OrganizationAuthConfiguration = require('../organization_auth/organization_auth_configuration');
var OrganizationAuthOauth1 = require('../organization_auth/organization_auth_oauth1');
var OrganizationAuthApikey = require('../organization_auth/organization_auth_apikey');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      serviceAuth: {},
      service: {},
      organization: {},
      organizationAuth: {},
      onChange: function(auth) { console.log('org auth changed', auth) }
    };
  },
  handleSave: function() {
    var organizationAuth = this.props.organizationAuth;
    console.log(organizationAuth);
    actions.saveOrganizationAuth(organizationAuth)
    .then((result) => {
      this.props.onChange(result.organizationAuth);
    })
  },
  handleDetailsChange: function(value) {
    var organizationAuth = this.props.organizationAuth;
    organizationAuth.organization_id = this.props.organization.id;
    organizationAuth.service_id = this.props.service.id;
    organizationAuth.service_auth_id = this.props.serviceAuth.id;
    organizationAuth.value = value;
    this.props.onChange(organizationAuth);
  },
  render() {
    var self = this;
    return <div>
      <div className="row">{this.props.service.name} Auth { this.props.serviceAuth.name } type { this.props.serviceAuth.type } </div>
      <div className="row">
        { this.props.serviceAuth.type == 'basic' &&
          <div>
          <OrganizationAuthBasic
            details={this.props.serviceAuth.details}
            value={this.props.organizationAuth.value}
            onChange={this.handleDetailsChange} />
          <button className="pt-button" onClick={this.handleSave.bind(this)}>Save</button>
          </div>
        }
        { this.props.serviceAuth.type == 'configuration' &&
          <div>
          <OrganizationAuthConfiguration
            details={this.props.serviceAuth.details}
            value={this.props.organizationAuth.value}
            onChange={this.handleDetailsChange} />
          <button className="pt-button" onClick={this.handleSave.bind(this)}>Save</button>
          </div>
        }
        { this.props.serviceAuth.type == 'apiKey' &&
          <div>
          <OrganizationAuthApikey
            details={this.props.serviceAuth.details}
            value={this.props.organizationAuth.value}
            onChange={this.handleDetailsChange} />
          <button className="pt-button" onClick={this.handleSave.bind(this)}>Save</button>
          </div>
        }
        { this.props.serviceAuth.type == 'oauth1' &&
          <OrganizationAuthOauth1
            details={this.props.serviceAuth.details}
            value={this.props.organizationAuth.value}
            onChange={this.handleDetailsChange}
            serviceAuth={this.props.serviceAuth}
            organization={this.props.organization} />
        }
        { this.props.serviceAuth.type == 'oauth2' &&
          <div>Coming soon: Oauth2 based Auth.</div>
        }
      </div>
    </div>;
  }
});
