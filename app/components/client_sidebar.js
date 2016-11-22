var React = require('react')
var lodash = require('lodash')
import { browserHistory } from 'react-router'
var Sidebar = require('./sidebar');

module.exports = React.createClass({
  getDefaultProps: function(){
    return {
      items: [
        {name:'Dashboard',url:'/client/dashboard'},
        {name:'My Gigs',url:'/client/gigs'},
        {name:'Post a Gig',url:'/client/gigs/new'},
        {name:'Find Developers',url:'/partners'},
        {name:'Browse Integrations',url:'/integrations'},
        {name:'Client Profile',url:'/client/profile'},
        {name:'User Profile',url:'/profile'}
      ]
    }
  },
  render: function() {
    return <Sidebar items={this.props.items}/>
  }
})

