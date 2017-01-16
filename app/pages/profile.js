var React = require('react');
var Navbar = require('../components/navbar/navbar');
var Sidebar = require('../components/sidebar');

module.exports = React.createClass({
  componentWillUpdate: function(nextProps, nextState) {
    if (!nextProps.token) {
      actions.goto('/');
    }
  },
  render:function(){
    var sidebarItems = [
      {name:'Dashboard',url:'/organization/dashboard'},
      {name:'My Gigs',url:'/organization/gigs'},
      {name:'Post a Gig',url:'/organization/gigs/new'},
      {name:'Browse Integrations',url:'/integrations'},
      {name:'Profile',url:'/profile'}
    ];

    return <div style={{paddingTop:50}}>
      <Navbar />
      <div className='container'>
        <div className='row'>
          <div className='pt-card col-xs-3'>
            <Sidebar items={sidebarItems}/>
          </div>
          <div className='pt-card col-xs-9'>
            Main Body
          </div>
        </div>
      </div>
    </div>
  }
})
