var React = require('react')
var PartnerSidebar = require('./partner_sidebar')
var Navbar = require('./navbar')
var ClientSidebar = require('./client_sidebar')

module.exports = React.createClass({
  getDefaultProps: function() {
    return { mode: "partner"};
  },
  render:function(){
    let sidebar = null;
    if (this.props.mode == "partner") {
      sidebar = <PartnerSidebar/>
    } else {
      sidebar = <ClientSidebar/>
    }
    return <div style={{paddingTop:50}}>
      <Navbar/>
      <div className='container'>
        <div className='row'>
          <div className='pt-card col-xs-3'>
            {sidebar}
          </div>
          <div className='pt-card col-xs-9'>
            { this.props.children }
          </div>
        </div>
      </div>
    </div>
  }
})
