var React = require('react')
var ClientPage = require('../components/client_page')

module.exports = React.createClass({
  render:function(){
    return <div>
      <ClientPage>
        client dashboard
      </ClientPage>
    </div>
  }
})
