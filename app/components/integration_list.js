var React = require('react')
var lodash = require('lodash')
var IntegrationSummary = require('./integration_summary')


module.exports = React.createClass({
  getDefaultProps:function(){
    return {
      integration_list:[{id:0, title: "hi", description: "test description"},{id: 1, title: "salesforce", description: "this salesforce integration does everything"}, {id: 2, title: "mailchimp", description: "this integration turns you into a monkey"}]
    }
  },
  render:function(){
    var integration_details = lodash.map(this.props.integration_list,function(integration){
      return (
        <IntegrationSummary integration={integration}/>
        )
    }.bind(this))
    console.log(integration_details)
    return <div>
      {integration_details}
    </div>
  }
})

