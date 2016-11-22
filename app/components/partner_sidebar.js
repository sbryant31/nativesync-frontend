var React = require('react')
var lodash = require('lodash')
import { browserHistory } from 'react-router'
var Sidebar = require('./sidebar');

module.exports = React.createClass({
  getDefaultProps: function(){
    return {
      items: [
        {name:'Dashboard',url:'/partner/dashboard'},
        {name:'Browse Gigs',url:'/gigs'},
        {name:'My Gigs',url:'/partner/gigs'},
        {name:'Browse Integrations',url:'/integrations'},
        {name:'New Integration',url:'/partner/integrations/new'},
        {name:'My Integrations',url:'/partner/integrations'},
        {name:'Browse Actions',url:'/actions'},
        {name:'New Action',url:'/partner/actions/new'},
        {name:'My Actions',url:'/partner/actions'},
        {name:'My Clients',url:'/partner/clients'},
        {name:'New Client',url:'/partner/clients/new'},
        {name:'Partner Profile',url:'/partner/profile'},
        {name:'User Profile',url:'/profile'}
      ]
    }
  },
  render: function() {
    return <Sidebar items={this.props.items}/>
  }
})

