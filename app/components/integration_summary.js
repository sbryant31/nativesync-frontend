var React = require('react')
var lodash = require('lodash')


module.exports = React.createClass({
  getDefaultProps:function(){
    return {
      integration: {
        id: 3,
        partner_id: 1,
        creator_user_id: 1,
        title: 'A test script',
        description: 'test description'
      }
    }
  },
  render:function(){
    var integration = this.props.integration
    return (
      <div key={integration.id}>
        {integration.title} <br/>
        {integration.description}
        <input type="submit" value="Details"/>
      </div>
    )
  }
})

