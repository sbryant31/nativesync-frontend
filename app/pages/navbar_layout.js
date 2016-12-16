var React = require('react')
var state = require('../modules/state')
var store = require('store')
var lodash = require('lodash')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
import {Position,Popover, Menu, MenuItem, MenuDivider} from "@blueprintjs/core"

var OrganizationMenu = React.createClass({
  getInitialState: function() {
    return {
      clients: [],
      partners: []
    }
  },
  componentDidMount: function() {
    var self = this;
    actions.myAssociations()
    .then(function(result) {
      self.setState({clients: result.clients, partners: result.partners});
    })
  },
  render(){
    var partners = lodash.map(this.state.partners,function(partner){
      return <MenuItem key={partner.name}
        text={partner.name}
        onClick={actions.loginAsPartner.bind(null,partner.id)}
      />
    })
    var clients = lodash.map(this.state.clients,function(client){
      return <MenuItem key={client.name}
        text={client.name}
        onClick={actions.loginAsClient.bind(null,client.id)}
      />
    })
    return <Menu>
      <li className="pt-menu-header"><h6>Partners</h6></li>
      {partners}
      <MenuItem key="newPartner" text="New" className="pt-icon-add" onClick={actions.goto.bind(null, '/partners/new')} />
      <li className="pt-menu-header"><h6>Clients</h6></li>
      {clients}
      <MenuItem key="newClient" text="New" className="pt-icon-add" onClick={actions.goto.bind(null, '/clients/new')} />
    </Menu>
  }
})

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
    var links = [ ]
    return <div style={{paddingTop:50}}>
      <Navbar links={links}>
        <Popover content={<OrganizationMenu/>} position={Position.BOTTOM_RIGHT}>
          <button className='pt-button pt-minimal'>Login as...</button>
        </Popover>
        <Popover content={<BrowseMenu/>} position={Position.BOTTOM_RIGHT}>
          <button className='pt-button pt-minimal'>Browse</button>
        </Popover>
        { this.props.mode == 'partner' &&
          <Popover content={<BuildMenu/>} position={Position.BOTTOM_RIGHT}>
            <button className='pt-button pt-minimal'>Build</button>
          </Popover>
        }
        <Popover content={<UserMenu/>} position={Position.BOTTOM_RIGHT}>
          <button className='pt-button pt-minimal'>{this.props.me.email}</button>
        </Popover>
      </Navbar>
      {child}
    </div>
  }
})

