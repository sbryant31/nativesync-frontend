var React = require('react')
var state = require('../modules/state')
var store = require('store')
var lodash = require('lodash')
var actions = require('../modules/actions')
var md5 = require('md5');
var Navbar = require('../components/navbar')
import {Position,Popover, Menu, MenuItem, MenuDivider} from "@blueprintjs/core"

var OrganizationMenu = React.createClass({
  getInitialState: function() {
    return {
      clients: [],
      partners: []
    }
  },
  getDefaultProps: function() {
    return {
      onChangeOrg: function(type, org) {console.log('changed org', type, org);}
    }
  },
  handleChangeView: function(type, org) {
    actions.setViewToOrg(type, org);
    this.props.onChangeOrg(type, org);
  },
  componentDidMount: function() {
    var self = this;
    actions.myAssociations()
    .then(function(result) {
      self.setState({clients: result.clients, partners: result.partners});
    })
  },
  render(){
    var self = this;
    var partners = lodash.map(this.state.partners,function(partner){
      return <MenuItem key={partner.name}
        text={partner.name}
        onClick={self.handleChangeView.bind(self, 'partner', partner)}
      />
    })
    var clients = lodash.map(this.state.clients,function(client){
      return <MenuItem key={client.name}
        text={client.name}
        onClick={self.handleChangeView.bind(self, 'client', client)}
      />
    })
    return <Menu>
      <li className="pt-menu-header"><h6>Teams</h6></li>
      {partners}
      <MenuItem key="newPartner" text="Create a New Team" className="pt-icon-add" onClick={actions.goto.bind(null, '/partner/new')} />
      <li className="pt-menu-header"><h6>Clients</h6></li>
      {clients}
      <MenuItem key="newClient" text="Create a New Client" className="pt-icon-add" onClick={actions.goto.bind(null, '/client/new')} />
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
  getInitialState: function() {
    return {
      org: actions.getState('org'),
      mode: actions.getState('mode'),
    }
  },
  handleChangeOrg: function(type, org) {
    this.setState({org: org, mode: type})
  },
  render(){
    var child = null
    if(this.props.children){
      child = React.cloneElement(this.props.children,this.props)
    }
    var links = [ ]
    var emailHash = md5(this.props.me.email.trim().toLowerCase());
    var avatarUrl = this.props.me.avatar_url ? this.props.me.avatar_url : "http://gravatar.com/avatar/" + emailHash + "?s=40";
    var avatarMenu =
      <Popover content={<UserMenu/>} position={Position.BOTTOM_RIGHT}>
          <img src={avatarUrl} />
      </Popover>
    // figure out what to name teh view menu (gross.)
    // "view" should be a bug - user should always be logged into an org view
    var orgName;
    if (this.state.org) {
      if (this.state.mode == 'partner') {
        orgName = "Team: " + this.state.org.name
      } else {
        orgName = "Client: " + this.state.org.name
      }
    } else {
      orgName = 'View';
    }

    return <div style={{paddingTop:50}}>
      <Navbar links={links} avatarMenu={avatarMenu}>
        <Popover content={<OrganizationMenu onChangeOrg={this.handleChangeOrg.bind(this)} />} position={Position.BOTTOM_RIGHT}  >
          <li className='pt-menu-item'>{orgName}</li>
        </Popover>
        <Popover content={<BrowseMenu/>} position={Position.BOTTOM_RIGHT}>
          <li className='pt-menu-item'>Browse</li>
        </Popover>
        { actions.getState('mode') == 'partner' &&
          <Popover content={<BuildMenu/>} position={Position.BOTTOM_RIGHT}>
            <li className='pt-menu-item'>Build</li>
          </Popover>
        }
      </Navbar>
      <div className="pt-content" style={{padding: 20}}>
        {child}
      </div>
    </div>
  }
})

