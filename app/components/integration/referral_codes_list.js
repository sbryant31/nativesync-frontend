var React = require('react');
// var _ = require('underscore');
var lodash = require('lodash');
// var Select = require('react-select');
// var actions = require('../../modules/actions');
var TextInputField = require('../inputs/text_input_field');
var OrganizationSelect = require('../organization/organization_select');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      referrals: [],
      onChange: function(referrals) {console.log('service auths change', referrals); },
      readOnly: false,
    };
  },
  handleChange: function(index, field, e) {
    var self = this;
    var referrals = this.props.referrals;
    if (e.target) {
      referrals[index][field] = e.target.value;
    } else if (e.value) {
      referrals[index][field] = e.value;
    } else {
      referrals[index][field] = e;
    }
    self.props.onChange(referrals);
  },
  handleAdd: function() {
    var self = this;
    var referrals = self.props.referrals;
    referrals.push({
      revsharePercentage: '',
      referralCode: '',
      discountPercentage: '',
      organization_id: null
    });
    self.props.onChange(referrals);
  },
  handleRemove: function(index) {
    var self = this;
    var referrals = self.props.referrals;
    referrals.splice(index, 1);
    self.props.onChange(referrals);
  },
  render() {
    var self = this;
    var referralsList = lodash.map(self.props.referrals, function(referral, index){
      return (
          <div>
            <TextInputField label="Revshare (%)" value={referral.revsharePercentage} onChange={self.handleChange.bind(self, index, 'revsharePercentage')} />
            <TextInputField label="Discount (%)" value={referral.discountPercentage} onChange={self.handleChange.bind(self, index, 'discountPercentage')} />
            <TextInputField label="Referral Code" value={referral.referralCode} onChange={self.handleChange.bind(self, index, 'referralCode')} />
            <OrganizationSelect
              organization={referral.organization_id}
              idOnly={true}
              onChange={self.handleChange.bind(self, index, 'organization_id')}
            />
            {!self.props.readOnly &&
              <div className="col-xs">
                <button className="pt-button" onClick={self.handleRemove.bind(self, index)}>Remove</button>
              </div>
            }
          </div>
      );
    });
    return (
        <div>
            <div>
                { referralsList }
            </div>
            <div className="row">
                { !self.props.readOnly &&
                    <button className="pt-button" onClick={self.handleAdd.bind(self)}>Add</button>
                }
            </div>
        </div>
    );
  }
});
