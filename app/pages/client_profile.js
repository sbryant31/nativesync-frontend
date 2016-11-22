var React = require('react')
var Navbar = require('../components/navbar')
var ClientSidebar = require('../components/client_sidebar');

module.exports = React.createClass({
  render:function(){
    return <div style={{paddingTop:50}}>
      <Navbar/>
      <div className='container'>
        <div className='row'>
          <div className='pt-card col-xs-3'>
            <ClientSidebar/>
          </div>
          <div className='pt-card col-xs-9'>
            Main Body
          </div>
        </div>
      </div>
    </div>
  }
})
