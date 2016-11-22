var React = require('react')
var Navbar = require('../components/navbar')
var PartnerSidebar = require('../components/partner_sidebar')

module.exports = React.createClass({
  render:function(){
    var sidebarItems = [{
      name:'Home',url:'/'
    }]
    return <div style={{paddingTop:50}}>
      <Navbar/>
      <div className='container'>
        <div className='row'>
          <div className='pt-card col-xs-3'>
            <PartnerSidebar/>
          </div>
          <div className='pt-card col-xs-9'>
            Main Body
          </div>
        </div>
      </div>
    </div>
  }
})
