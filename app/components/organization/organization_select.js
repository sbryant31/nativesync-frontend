var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var actions = require('../../modules/actions');
var Select = require('react-select');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      organizations: {},
    }
  },
  getDefaultProps: function() {
    return {
      organization: {},
      onChange: (organization) => { console.log('change organization', organization) }
    }
  },
  handleChange: function(selection) {
    this.props.onChange(this.state.organizations[selection.value]);
  },
  componentDidMount: function() {
    console.log('loading options for organization');
    var self = this;
    return actions.getOrganizations()
    .then(function(result) {
      var organizations = result.organizations;
      self.setState({organizations: _.indexBy(organizations, 'id')})
      var organizationOptions = _.map(organizations, (organization) => {
        return {value: organization.id, label: organization.name}
      })
      self.setState({organizationOptions: organizationOptions})
      console.log(self.state);
    })
  },
  render() {
    var self = this;
    return <label className="pt-label pt-inline col-xs">
      Organization
      <Select
        name="organization-selector"
        value={this.props.organization ? this.props.organization.id : null}
        options={this.state.organizationOptions}
        onChange={this.handleChange}
      />
    </label>
  }
})
