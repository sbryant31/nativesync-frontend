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

var BrowseMenu = React.createClass({
  render(){
    var items = [
      {
        name:'Integrations',
        link:'/integrations/browse',
      },
      {
        name:'Actions',
        link:'/actions/browse',
      },
      {
        name:'Partner Profiles',
        link:'/partners/browse',
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

var BuildMenu = React.createClass({
  render(){
    var items = [
      {
        name:'Dashboard',
        link:'/dashboard',
      },
      {
        name:'My Integrations',
        link:'/integrations/me',
      },
      {
        name:'My Actions',
        link:'/actions/me',
      },
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
        <Popover content={<BrowseMenu/>} position={Position.BOTTOM_RIGHT}>
          <button className='pt-button pt-minimal'>Browse</button>
        </Popover>
        <Popover content={<BuildMenu/>} position={Position.BOTTOM_RIGHT}>
          <button className='pt-button pt-minimal'>Build</button>
        </Popover>
        <Popover content={<UserMenu/>} position={Position.BOTTOM_RIGHT}>
          <button className='pt-button pt-minimal'>{this.props.me.email}</button>
        </Popover>
      </Navbar>
      {child}
    </div>
  }
})

