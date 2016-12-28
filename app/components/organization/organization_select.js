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
      idOnly: false,
      organization: {},
      onChange: (organization) => { console.log('change organization', organization) }
    }
  },
  handleChange: function(selection) {
    if (this.props.idOnly) {
      this.props.onChange(selection.value);
    } else {
      this.props.onChange(this.state.organizations[selection.value]);
    }
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
    let value;
    if (this.props.organization) {
      if (this.props.idOnly) {
        value = this.props.organization;
      } else {
        value = this.props.organization.id;
      }
    }
    return <label className="pt-label pt-inline col-xs">
      Organization
      <Select
        name="organization-selector"
        value={value}
        options={this.state.organizationOptions}
        onChange={this.handleChange}
      />
    </label>
  }
})
