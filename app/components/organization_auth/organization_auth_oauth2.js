var React = require('react');
var _ = require('underscore');
var lodash = require('lodash');
var Select = require('react-select');
var actions = require('../../modules/actions');
var TextInputField = require('../inputs/text_input_field');
import {Position,Popover} from "@blueprintjs/core"
var Iframe = require('react-iframe');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      details: {},
      serviceAuth: null,
      organization: null,
      value: {},
      onChange: function(values) { console.log('values changed', values); },
      readOnly: false
    };
  },
  handleChange: function(field, e) {
    var value = this.props.value;
    if (e.target) {
      value[field] = e.target.value;
    } else if (e.value) {
      value[field] = e.value;
    } else {
      value[field] = e;
    }
    this.props.onChange(value);
  },
  render() {
    var self = this;
    var value = this.props.value;
    var authURL = `https://api.nativesync.io/oauth/2.0/authenticate/${this.props.serviceAuth.id}/org/${this.props.organization.id}`;
    if (value.oauthAccessToken) {
      var content = (
        <div>
          Connected!
          <a className="pt-button" href={authURL} target="new" >Reconnect</a>
        </div>
      );
    } else {
      var content = (
        <a className="pt-button" href={authURL} target="new" >Connect</a>
      );
    }
    return <div>
      <label className="pt-label pt-inline">
        <div>
          { content }
        </div>
      </label>
    </div>;
  }
});
