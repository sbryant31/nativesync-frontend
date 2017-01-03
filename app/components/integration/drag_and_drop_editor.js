/**
{
  "name": "integration for pickup",
  "trigger": {"service_name": "Mixpanel", "function_name": "get_recent_events"},
  "trigger_metadata": {"inputs": {}, "condition": "true"},
  "expressions": [
    {"comment": "Find a person in mixpanel to link to the event data"},
    {"action": {"service_name": "Mixpanel", "function_name": "find_person"}, "inputs": {"$email": "{{results.Mixpanel.get_recent_events.$email}}"}},
    {"comment": "Make sure that the person exists in mixpanel (otherwise, we don't have their email.)"},
    {"condition": {"operator": "is_blank", "args": ["{{results.Mixpanel.find_person.distinct_id}}"]},
      "if_true": [
        {"error": "There is no person matching this event in mixpanel"}
      ]
    },
    {"comment": "find the user and lead in sharpspring that correspond to the Mixpanel person"},
    {"action": {"service_name": "Sharpspring", "function_name": "find_user"}, "inputs": {"emailAddress": "admin@yourdomain.com"}},
    {"alias": ["lead_email", "{{results.Mixpanel.find_person.$email}}"]},
    {"action": {"service_name": "Sharpspring", "function_name": "find_lead"}, "inputs": {"emailAddress": "{{lead_email}}"}},
    {"alias": ["lead_id", "{{results.Sharpspring.find_lead.id}}"]},
    {"comment": "If the lead doesn't exist in Sharpsring, create it."},
    {"condition": {"operator": "is_blank", "args": ["{{leadID}}"]},
      "if_true": [
        {"action": {"service_name": "Sharpspring", "function_name": "create_lead"}, "inputs": {"emailAddress": "{{lead_email}}"}},
        {"alias": ["lead_id", "{{results.Sharpspring.create_lead.id}}"]}
      ]
    },
    {"comment": "Check for an existing opportunity for the lead and a dealstage that matches the Mixpanel event"},
    {"action": {"service_name": "Sharpspring", "function_name": "find_opportunity_leads"}, "inputs": {"leadID": "{{lead_id}}"}},
    {"action": {"service_name": "Sharpspring", "function_name": "find_dealstage"}, "inputs": {"dealStageName": "{{results.Mixpanel.get_recent_events.event}}"}},
    {"alias": ["most_recent_opp", "{{results.Sharpspring.find_opportunity_leads}}"], "select": "last"},
    {"alias": ["dealstage_id", "{{results.Sharpspring.find_dealstage.id}}"]},
    {"condition": {"operator": "is_empty", "args": ["{{most_recent_opp}}"]},
      "if_true": [
        {"comment": "Create a new opportunity for the lead"},
        {"action": {"service_name": "Sharpspring", "function_name": "create_opportunity"}, "inputs": {"opportunityName": "New opp for {{lead_email}}", "dealStageID": "{{dealstage_id}}"}},
        {"alias": ["opp_id", "{{results.Sharpspring.opp.id}}"]},
        {"action": {"service_name": "Sharpspring", "function_name": "create_opportunity_lead"}, "inputs": {"opportunityID": "{{opp_id}}", "leadID": "{{lead_id}}"}}
      ],
      "if_false": [
        {"comment": "Update an existing opportunity for the lead, changing his dealstage."},
        {"action": {"service_name": "Sharpspring", "function_name": "update_opportunity"}, "inputs": {"dealStageID": "{{dealstage_id}}", "id": "{{most_recent_opp.id}}"}}
      ]
    }
  ]
}


*/


var React = require('react');
var _ = require('underscore');
// var lodash = require('lodash');
// var actions = require('../../modules/actions');
// var Select = require('react-select');

var CodeLine = React.createClass({
  getDefaultProps: function() {
    return {
      onChange: (res) => { console.log(res); },
      line: {}
    };
  },
  render() {
    // var self = this;
    return <div>
      a code line
    </div>;
  }
});
module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      onChange: (res) => { console.log(res); },
      code: ''
    };
  },
  getInitialState: function() {
    return {
      parsedCode: []
    };
  },
  componentDidMount: function() {
    let parsedCode;
    try {
      parsedCode = JSON.parse(this.props.code);
    } catch(e) {
      parsedCode = [];
    }
    this.setState({parsedCode: parsedCode});
  },
  render() {
    // var self = this;
    var codeList = _.map(this.state.parsedCode, function(line) {
      return <CodeLine value={line} />;
    });
    return <div>
      {codeList}
    </div>;
  }
});
