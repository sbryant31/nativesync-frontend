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
    var authURL = `https://api.nativesync.io/oauth/authenticate/1.0/${this.props.serviceAuth.id}/org/${this.props.organization.id}`;
		if (value.oauthAccessToken && value.oauthAccessTokenSecret) {
			var content = (
				<div>
					Connected!
					<button className="pt-button">Reconnect</button>
				</div>
			);
		} else {
			var content = (
				<button className="pt-button">Connect</button>
			);
		}
		var oauthFlow = (
			<Iframe url={authURL} width="500" height="300" />
		);
    return <div>
      <label className="pt-label pt-inline">
				<div>
					<Popover content={ oauthFlow  }
								isModal={true}
								position={Position.RIGHT_TOP}>
						{content}
					</Popover>
				</div>
      </label>
    </div>;
  }
});
