var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      serviceAuths: [],
      services: [],
      selectedIDs: []
    }
  },
  render() {
    var self = this;
    var servicesByID = _.indexBy(this.props.services, 'id');
    var authList = lodash.map(this.props.serviceAuths,function(serviceAuth){
      var isSelected = (self.props.selectedIDs.indexOf(serviceAuth.id) !== -1)
      return <div className="row">
        <div className="col-xs">
          { isSelected && <span className="pt-icon-confirm" /> }
        </div>
        <div className="col-xs-3">
          service: { servicesByID[serviceAuth.service_id].name }
        </div>
        <div className="col-xs-3">
          name: { serviceAuth.name }
        </div>
        <div className="col-xs-3">
          type: { serviceAuth.type }
        </div>
        <div className="col-xs-3">
          details: { JSON.stringify(serviceAuth.details) }
        </div>
      </div>
    })
    return <div>
      { authList }
    </div>
  }
})
