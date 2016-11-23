var React = require('react')
var Navbar = require('../components/navbar')
var PartnerSidebar = require('../components/partner_sidebar')
var Layout = require('../components/layout')
var IntegrationFilter = require('../components/integration_filter')
var IntegrationList = require('../components/integration_list')

module.exports = React.createClass({
  render:function(){
    return <div>
      <Layout>
        <IntegrationFilter/>
        <IntegrationList/>
          <div> Not Here?
            <input type="submit" value="Request an Integration"/>
          </div>
      </Layout>
    </div>
    }
})
