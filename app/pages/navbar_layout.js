var React = require('react')
var state = require('../modules/state')
var store = require('store')
var lodash = require('lodash')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
import {Position,Popover, Menu, MenuItem, MenuDivider} from "@blueprintjs/core"

var UserMenu = React.createClass({
  render(){
    var items = [
      {
        name:'Edit Profile',
        link:'/profile',
      },
      {
        name:'Account Settings',
        link:'/account',
      },
      {
        name:'Logout',
        link:'/logout',
      }
    ]
    items = lodash.map(items,function(item){
      return <MenuItem key={item.name}
        text={item.name}
        onClick={actions.goto.bind(null,item.link)}
      />
    })
    return <Menu>
      {items}
    </Menu>
  }
})

var IntegrationsMenu = React.createClass({
  render(){
    var items = [
      {
        name:'Dashboard',
        link:'/dashboard',
      },
      {
        name:'Manage Integrations',
        link:'/dashboard',
      },
      {
        name:'Create Integration',
        link:'/dashboard',
      },
      {
        name:'Create Action',
        link:'/dashboard',
      },
      {
        name:'Transaction History',
        link:'/dashboard',
      }
    ]
    items = lodash.map(items,function(item){
      return <MenuItem key={item.name}
        text={item.name}
        onClick={actions.goto.bind(null,item.link)}
      />
    })
    return <Menu>
      {items}
    </Menu>
  }
})              

module.exports = React.createClass({
  render(){
    var child = null
    if(this.props.children){
      child = React.cloneElement(this.props.children,this.props)
    }
    var links = [
    ]
    return <div style={{paddingTop:50}}>
      <Navbar links={links}>
        <Popover content={<IntegrationsMenu/>} position={Position.BOTTOM_RIGHT}>
          <button className='pt-button pt-minimal'>My Integrations</button>
        </Popover>
        <Popover content={<UserMenu/>} position={Position.BOTTOM_RIGHT}>
          <button className='pt-button pt-minimal'>{this.props.me.email}</button>
        </Popover>
      </Navbar>
      {child}
    </div>
  }
})

