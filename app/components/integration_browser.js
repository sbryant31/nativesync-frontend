var React = require('react');
var actions = require('../modules/actions');
var _ = require('underscore');
var ListView = require('./integration_browser/list_view');
// var MarketplaceView = require('./integration_browser/marketplace_view');
var MarketplaceView2 = require('./integration_browser/marketplace_view2');
const ServiceMultiSelect = require('./service/service_multi_select');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filter: {},
      filteredIntegrations: [],
      integrations: [],
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
    this.setState({filter: this.props.initialFilter});
    var filter = this.state.filter;
    if (this.props.org) {
      filter.organization_id = this.props.org.id;
    }
    actions.getIntegrations(filter)
    .then((result) => {
      this.setState({
        integrations: result.integrations,
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
  render() {
    return (
      <div>
        { this.props.view == 'marketplace' &&
					<h1>Integration MarketPlace</h1>
				}
        { this.props.view == 'list' &&
					<h1>Browse Integrations</h1>
				}
				<hr/>
				<ServiceMultiSelect
					value={this.state.filter.serviceIDs}
					onChange={this.handleFilterChange.bind(this, 'serviceIDs')}
        />
				<hr/>
        { this.props.view == 'marketplace' &&
          <div>
            <MarketplaceView2 integrations={this.state.filteredIntegrations} />
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
