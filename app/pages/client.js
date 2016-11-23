var React = require('react')
var Navbar = require('../components/navbar')
var PartnerSidebar = require('../components/partner_sidebar')
var Layout = require('../components/layout')
var IntegrationFilter = require('../components/integration_filter')

module.exports = React.createClass({
  render:function(){
    return <div>
      <Layout>
        <IntegrationFilter/>
        Layout page
      </Layout>
    </div>
    }
})
