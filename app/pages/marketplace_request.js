var React = require('react');
var actions = require('../modules/actions');
// var Navbar = require('../components/navbar');
var IntegrationBrowser = require('../components/integration_browser/integration_browser');
var lodash = require('lodash');
var Select = require('react-select');
var ServiceMultiSelect = require('../components/service/service_multi_select');
var InputList = require('../components/inputs/input_list');
var TextInputField = require('../components/inputs/text_input_field');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      integrationRequest: {
        type: 'custom',
        services: [],
        consultantLevel: 'silver',
        discount: 0.00,
        steps: [],
        newServices: [],
        notes: '',
        discountCode: ''
      }
    };
  },
  checkDiscountCode: function() {
    var self = this;
    actions.verifyDiscountCode(self.state.integrationRequest.discountCode)
    .then((result) => {
      if (result.discount) {
        self.handleChange('discount', result.discount);
      }
    })
  },
  handleChange: function(field, e) {
    var self = this;
    var integrationRequest = this.state.integrationRequest;
    if (e.target) {
      integrationRequest[field] = e.target.value;
    } else if (e.value) {
      integrationRequest[field] = e.value;
    } else {
      integrationRequest[field] = e;
    }
    console.log('change', integrationRequest);

    this.setState({integrationRequest: integrationRequest});
  },
  handleSubmit: function() {
    return actions.createIntegrationRequest(this.state.integrationRequest)
    .then((result) => {
      return actions.goto(`/integration_request/${result.integrationRequest.id}`);
    })
  },
  render() {
    var consultantLevelOptions = [
      {label: 'Bronze Tier - $25/hour', value: 'bronze'},
      {label: 'Silver Tier - $50/hour', value: 'silver'},
      {label: 'Gold Tier - $75/hour', value: 'gold'},
      {label: 'Platinum Tier - $100/hour', value: 'platinum'},
      {label: 'Diamond Tier - $125/hour', value: 'diamond'},
    ];
    var consultantRates = {
      bronze: 25, silver: 50, gold: 75, platinum: 100, diamond: 125
    }
    var consultingRate = consultantRates[this.state.integrationRequest.consultantLevel];
    var numSteps = this.state.integrationRequest.steps.length
    var hoursPerStep = 5.0;
    var stepsCost = numSteps * hoursPerStep;
    var numExistingServices = this.state.integrationRequest.services.length;
    var hoursPerExistingService = 5.0;
    var existingServicesCost = numExistingServices * hoursPerExistingService;
    var hoursPerNewService = 10.0;
    var numNewServices = this.state.integrationRequest.newServices.length
    var newServicesCost = numNewServices * hoursPerNewService;
    var testingHoursPerStep = 2.0;
    var testingHours = numSteps * testingHoursPerStep;
    var redeemedDiscount = this.state.integrationRequest.discount;
    var subtotal = consultingRate * (stepsCost + existingServicesCost + newServicesCost + testingHours)
    var totalCost = subtotal * (1 - redeemedDiscount);

    return <div>
      <h1>Get an Instant Integration Quote</h1>
      <div>
        If you need an integration that is not yet build, NativeSync is the most affordable place to get it done! Just tell us what you need and we will match you with the perfect integrator, for a fraction of the cost.
      </div>
      <h2>Which apps do you need integrated?</h2>
      <ServiceMultiSelect
        value={this.state.integrationRequest.services}
        onChange={this.handleChange.bind(this, 'services')}
        creatable={true} />
        <p className="pt-label">List any apps we need to connect that aren't already on NativeSync.
          <InputList
            list={this.state.integrationRequest.newServices}
            defaultObject={''}
            object={TextInputField}
            onChange={this.handleChange.bind(this, 'newServices')}
          />
        </p>
      <h2>Let us know how the integration should work, step-by-step.</h2>
        <InputList
          list={this.state.integrationRequest.steps}
          defaultObject={''}
          object={TextInputField}
          onChange={this.handleChange.bind(this, 'steps')}
        />
      <h2>Choose a consultant level that fits your budget</h2>
      <Select
        options={consultantLevelOptions}
        value={this.state.integrationRequest.consultantLevel}
        onChange={this.handleChange.bind(this, 'consultantLevel')}
      />
      { this.state.integrationRequest.consultantLevel == 'bronze' &&
        <ul>
        <li>At least 1 year of professional developer experience.</li>
        <li>Supervised by a NativeSync consulting manager</li>
        <li>Passed the introductory NativeSync training program</li>
        </ul>
      }
      { this.state.integrationRequest.consultantLevel == 'silver' &&
        <ul>
        <li>At least 2 years of professional developer experience.</li>
        <li>Passed the Intermediate Nativesync Consulting program</li>
        <li>Has built at least 5 NativeSync Integrations</li>
        <li>Has contributed at least 10 NativeSync actions</li>
        </ul>
      }
      { this.state.integrationRequest.consultantLevel == 'gold' &&
        <ul>
        <li>At least 3 years of professional developer experience.</li>
        <li>Passed the Intermediate Nativesync Consulting program</li>
        <li>Has built at least 20 NativeSync Integrations</li>
        <li>Has contributed at least 40 NativeSync actions</li>
        </ul>
      }
      { this.state.integrationRequest.consultantLevel == 'platinum' &&
        <ul>
        <li>At least 5 years of professional developer experience.</li>
        <li>Solid API Integration track record</li>
        <li>Passed the Advanced Nativesync Consulting & Management program</li>
        </ul>
      }
      { this.state.integrationRequest.consultantLevel == 'diamond' &&
        <ul>
        <li>At least 7 years of professional developer experience.</li>
        <li>Passed the Advanced Nativesync Consulting & Management program</li>
        <li>Pristine API Integration track record</li>
        <li>Enterprise Data integration experience</li>
        <li>Able to travel</li>
        </ul>
      }
      <label className="pt-label pt-inline">
        Discount Code
        <input type="text" value={this.state.integrationRequest.discountCode} onChange={this.handleChange.bind(this, 'discountCode')} />
        { !this.state.integrationRequest.discount &&
          <button className="pt-button pt-intent-primary" onClick={this.checkDiscountCode}>Redeem Code</button>
        }
        { this.state.integrationRequest.discount &&
          <span className="pt-button pt-intent-success">
            { this.state.integrationRequest.discount * 100 }% Discount Redeemed
          </span>
        }
      </label>
      <h2>Instant Quote</h2>
      <table className="pt-table pt-striped pt-interactive">
        <thead>
          <th>Num Items</th>
          <th>Cost per Item</th>
          <th>Total</th>
        </thead>
        <tbody>
          <tr>
            <td>{numSteps} Steps</td>
            <td>{hoursPerStep} hours per step</td>
            <td>{stepsCost}</td>
          </tr>
          <tr>
            <td>
              {numExistingServices} Existing Apps
            </td>
            <td>{hoursPerExistingService} hours per app</td>
            <td>{existingServicesCost}</td>
          </tr>
          <tr>
            <td>
              {numNewServices} New Apps
            </td>
            <td>{hoursPerNewService} hours per app</td>
            <td>{newServicesCost}</td>
          </tr>
          <tr>
            <td>
              Testing and configuration
            </td>
            <td>{testingHoursPerStep} hours per step</td>
            <td>{testingHours}</td>
          </tr>
          <tr>
            <td>Consulting Rate</td>
            <td></td>
            <td>${consultingRate}/hr</td>
          </tr>
          <tr>
            <td>Subtotal</td>
            <td></td>
            <td>${subtotal}</td>
          </tr>
          <tr>
            <td>
              Discount code
            </td>
            <td>{this.state.integrationRequest.discountCode}</td>
            <td>-{redeemedDiscount * 100}%</td>
          </tr>
          <tr>
            <td>
              Total
            </td>
            <td></td>
            <td className="pt-bold">${totalCost}</td>
          </tr>
        </tbody>
      </table>
      <h2>Additional Notes</h2>
      <label className="pt-label">
        <textarea className="pt-input pt-fill" value={this.state.integrationRequest.notes} onChange={this.handleChange.bind(this, 'notes')} />
      </label>
      <hr />
      <button className="pt-button" onClick={this.handleSubmit}>Submit Request</button>
    </div>;
  }
});
