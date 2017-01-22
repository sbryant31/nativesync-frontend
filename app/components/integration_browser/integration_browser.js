var React = require('react');
var actions = require('../../modules/actions');
var state = require('../../modules/state');
var _ = require('underscore');
const ListView = require('./list_view');
// const MarketplaceView = require('./integration_browser/marketplace_view');
const MarketplaceView2 = require('./marketplace_view2');
const ServiceMultiSelect = require('../service/service_multi_select');
import Link from 'react-router/lib/Link';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filter: {visibility: 'published'},
      filteredIntegrations: [],
      integrations: [],
      integration_ids: [],
      page: 1
    };
  },

  getDefaultProps: function() {
    return {
      initialFilter: {},
      org: null,
      view: 'list',
    };
  },

  componentDidMount: function() {
    // this.setState({filter: this.props.initialFilter});
    var filter = this.state.filter;
    if (this.props.org) {
      filter.organization_id = this.props.org.id;
    }
    actions.getMarketplaceIntegrations(filter)
    .then((result) => {
      this.setState({
        integrations: result.integrations,
        integration_ids: _.pluck(result.integrations, 'id'),
        filteredIntegrations: result.integrations,
      });
    });
  },

  handleFilterChange: function(field, e) {
    var filter = this.state.filter;
    let value;
    if (e.target) {
      value = e.target.value;
    } else if (e.value) {
      value = e.value;
    } else {
      value = e;
    }
    if (value) {
      filter[field] = value;
    } else {
      delete filter[field];
    }

    this.setState({filter: filter});
    var filteredIntegrations = _.filter(this.state.integrations, (integration) => {
      var match = true;
      _.each(filter, (value, key) => {
        console.log('filtering key', key, value);
        if (key == 'serviceIDs') {
          // get the IDs that are required
          var requiredIDs = _.pluck(value, 'id');
          var serviceIDs = _.pluck(integration.Services, 'id');
          _.each(requiredIDs, function(id) {
            if (serviceIDs.indexOf(id) === -1) {
              match = false;
            }
          });
        } else if (integration[key].toLowerCase().indexOf(value.toLowerCase()) === -1) {
          match = false;
        }
      });
      return match;
    });
    this.setState({filteredIntegrations: filteredIntegrations});
  },

  requestIntegrationCardOnClick() {
    state.set('integration_request_services', [...this.state.filter.serviceIDs]);
    actions.goto('/integration_request');
  },

  render() {
    return (
      <div>
        {/* { this.props.view === 'marketplace' &&
          <h1 className="page-title">Ready to use Integrations</h1>
        }
        { this.props.view === 'list' &&
          <h1 className="page-title">Browse Integrations</h1>
        } */}
        <div className="integration-request">
          Don't see the integration you need? <Link to="/integration_request">We can build it!</Link>
        </div>
        <ServiceMultiSelect
          value={this.state.filter.serviceIDs}
          onChange={(e) => { this.handleFilterChange('serviceIDs', e); }}
        />
        <hr/>
        { this.props.view == 'marketplace' &&
          <div>
            <MarketplaceView2
              integrations={this.state.filteredIntegrations}
              selected_apps={this.state.filter.serviceIDs && [...this.state.filter.serviceIDs]}
              requestIntegrationCardOnClick={this.requestIntegrationCardOnClick}
            />
            {/* <MarketplaceView integrations={this.state.filteredIntegrations} /> */}
          </div>
        }
        { this.props.view == 'list' &&
          <ListView integrations={this.state.filteredIntegrations} />
        }
      </div>
    );
  }
});
