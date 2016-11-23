var React = require('react')
var PartnerSidebar = require('./partner_sidebar')
var Navbar = require('./navbar')

module.exports = React.createClass({
  render:function(){
    return <div style={{paddingTop:50}}>
      <Navbar/>
      <div className='container'>
        <div className='row'>
          <div className='pt-card col-xs-3'>
            <PartnerSidebar/>
          </div>
          <div className='pt-card col-xs-9'>
            { this.props.children }
          </div>
        </div>
      </div>
    </div>
  }
})
