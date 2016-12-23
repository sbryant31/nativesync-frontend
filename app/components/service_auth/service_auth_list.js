var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var ServiceAuthView = require('../service_auth/service_auth_view');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      serviceAuths: [],
      services: [],
      selectedIDs: [],
      readOnly: false
    }
  },
  render() {
    var self = this;
    var servicesByID = _.indexBy(this.props.services, 'id');
    var authList = lodash.map(this.props.serviceAuths,function(serviceAuth){
      var isSelected = (self.props.selectedIDs.indexOf(serviceAuth.id) !== -1)
      var service = servicesByID[serviceAuth.service_id]
      return <ServiceAuthView isSelected={isSelected} service={service} serviceAuth={serviceAuth}  />
    })
    return <div>
      { authList }
    </div>
  }
})
