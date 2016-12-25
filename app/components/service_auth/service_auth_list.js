var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var ServiceAuthView = require('../service_auth/service_auth_view');

// todo: create a service select only in the case when services.length > 1

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      serviceAuths: [],
      services: [],
      selected: [],
      onChange: function(serviceAuths) {console.log('service auths change', serviceAuths)},
      onSelectChange: function(serviceAuths) {console.log('service auths select changed', serviceAuths)},
      readOnly: false,
    }
  },
  handleChange: function(name, serviceAuth) {
    var self = this;
    // build the array of service auths and pass it back modified.
    // theres no guarantee that id will exist, so we use name to look through
    // this is prone to bugs and well need a better solution later.
    // switch this to a solution using temporary ids
    var serviceAuths = _.each(self.props.serviceAuths, (existingAuth, index, list) => {
      if (existingAuth.name == name) {
        list[index] = serviceAuth;
      }
    })
    self.props.onChange(serviceAuths);
  },
  handleAdd: function() {
    var self = this;
    var serviceAuths = self.props.serviceAuths;
    serviceAuths.push({service_id: self.props.services[0].id, name: 'New Service Auth', details: {}});
    self.props.onChange(serviceAuths);
  },
  handleRemove: function(index) {
    var self = this;
    var serviceAuths = self.props.serviceAuths;
    serviceAuths.splice(index, 1);
    self.props.onChange(serviceAuths);
  },
  handleSelect: function(name) {
    var selected = this.props.selected;
    console.log('select', name, selected);
    selected.push(_.findWhere(this.props.serviceAuths, {name: name}));
    this.props.onSelectChange(selected);
  },
  handleDeselect: function(name) {
    var selected = _.reject(this.props.selected, (serviceAuth) => {
      return serviceAuth.name == name;
    });
    console.log('deselect', name, selected);
    this.props.onSelectChange(selected);
  },
  render() {
    var self = this;
    var servicesByID = _.indexBy(self.props.services, 'id');
    var authList = lodash.map(self.props.serviceAuths,function(serviceAuth, index){
      var isSelected = _.findWhere(self.props.selected, {id: serviceAuth.id});
      var service = servicesByID[serviceAuth.service_id]
      return (
          <div className="ServiceAuthListItem">
            <ServiceAuthView
              isSelected={isSelected}
              service={service}
              serviceAuth={serviceAuth}
              onChange={self.handleChange.bind(self, serviceAuth.name)}
              onSelect={self.handleSelect.bind(self, serviceAuth.name)}
              onDeselect={self.handleDeselect.bind(self, serviceAuth.name)}
            >
              {!self.props.readOnly &&
                <div className="col-xs">
                  <button className="pt-button" onClick={self.handleRemove.bind(self, index)}>Remove</button>
                </div>
              }
            </ServiceAuthView>
          </div>
      );
    })
    return (
        <div className="ServiceAuthList">
            <div className="ServiceAuthListItems">
                { authList }
            </div>
            <div className="row parent button-container bg">
                { !self.props.readOnly &&
                    <button className="pt-button" onClick={self.handleAdd.bind(self)}>Add</button>
                }
            </div>
        </div>
    );
  }
})
