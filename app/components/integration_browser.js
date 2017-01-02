var React = require('react');
var Navbar = require('../components/navbar');
var actions = require('../modules/actions');
var lodash = require('lodash');
var ListView = require('./integration_browser/list_view');
var MarketplaceView = require('./integration_browser/marketplace_view');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filter: {},
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
    var self = this;
    self.setState({filter: this.props.initialFilter});
    var filter = this.state.filter;
    if (this.props.org) {
      filter.organization_id = this.props.org.id;
    }
    actions.getIntegrations(filter)
    .then(function(result) {
      self.setState({
        integrations: result.integrations
      });
    });
  },
  render() {
    var self = this;
    return (
      <div>
        { this.props.view == 'marketplace' &&
          <MarketplaceView integrations={self.state.integrations} />
        }
        { this.props.view == 'list' &&
          <ListView integrations={self.state.integrations} />
        }
      </div>
    );
  }
});

