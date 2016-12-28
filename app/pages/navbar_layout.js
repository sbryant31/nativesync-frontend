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
      organizations: [],
    }
  },
  getDefaultProps: function() {
    return {
      onChangeOrg: function(org) {console.log('changed org', org);}
    }
  },
  handleChangeView: function(org) {
    actions.setViewToOrg(org);
    this.props.onChangeOrg(org);
  },
  componentDidMount: function() {
    var self = this;
    actions.myAssociations()
    .then(function(result) {
      self.setState({organizations: result.organizations});
    })
  },
  render(){
    var self = this;
    var organizations = lodash.map(this.state.organizations,function(organization){
      return <MenuItem key={organization.name}
        text={organization.name}
        onClick={self.handleChangeView.bind(self, organization)}
      />
    })
    return <Menu>
      <li className="pt-menu-header"><h6>Organizations</h6></li>
      {organizations}
      <MenuItem key="newOrganization" text="Create a New Organization" className="pt-icon-add" onClick={actions.goto.bind(null, '/organization/new')} />
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
      {
        name:'Services',
        link:'/services/browse',
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
  handleChangeOrg: function(org) {
    this.setState({org: org})
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
      orgName = "Organization: " + this.state.org.name
    } else {
      orgName = 'Choose an Organization';
    }

    return <div style={{paddingTop:50}}>
      <Navbar links={links} avatarMenu={avatarMenu}>
        <Popover content={<OrganizationMenu onChangeOrg={this.handleChangeOrg.bind(this)} />} position={Position.BOTTOM_RIGHT}  >
          <li className='pt-menu-item'>{orgName}</li>
        </Popover>
        <Popover content={<BrowseMenu/>} position={Position.BOTTOM_RIGHT}>
          <li className='pt-menu-item'>Browse</li>
        </Popover>
        <Popover content={<BuildMenu/>} position={Position.BOTTOM_RIGHT}>
          <li className='pt-menu-item'>Build</li>
        </Popover>
      </Navbar>
      <div className="pt-content" style={{padding: 20}}>
        {child}
      </div>
    </div>
  }
})

