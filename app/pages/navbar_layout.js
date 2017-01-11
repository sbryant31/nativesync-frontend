var React = require('react');
var state = require('../modules/state');
var store = require('store');
var lodash = require('lodash');
var _ = require('underscore');
var actions = require('../modules/actions');
var md5 = require('md5');
var Navbar = require('../components/navbar');
import {Position,Popover, Menu, MenuItem, MenuDivider} from "@blueprintjs/core";

var OrganizationMenu = React.createClass({
  getInitialState: function() {
    return {
      organizations: [],
    };
  },
  getDefaultProps: function() {
    return {
      onChangeOrg: function(org) {console.log('changed org', org);}
    };
  },
  handleChangeView: function(org) {
    actions.setViewToOrg(org);
    this.props.onChangeOrg(org);
  },
  componentDidMount: function() {
    var self = this;
    var user = actions.getState('me');
    actions.myAssociations()
    .then(function(result) {
      self.setState({organizations: result.organizations});
      var org = _.findWhere(result.organizations, {id: user.default_organization_id});
      if (!org) { org = result.organizations[0]; }
      self.handleChangeView(org);
    });
  },
  render() {
    var organizations = lodash.map(this.state.organizations,function(organization){
      return <MenuItem key={organization.name}
        text={organization.name}
        onClick={() => { this.handleChangeView(organization); }}
      />;
    });
    return <Menu>
      <li className="pt-menu-header"><h6>Organizations</h6></li>
      {organizations}
      <MenuItem
        key="newOrganization"
        text="Create a New Organization"
        className="pt-icon-add"
        onClick={() => { actions.goto('/organization/new'); }}
      />
    </Menu>;
  }
});

var UserMenu = React.createClass({
  render(){
    var items = [
      {
        name:'Edit Profile',
        link:'/profile',
      },
      {
        name:'Logout',
        link:'/logout',
        icon: 'log-out'
      }
    ];
    items = lodash.map(items,function(item){
      return <MenuItem key={item.name}
        text={item.name}
        iconName={item.iconName}
        onClick={() => { actions.goto(item.link); }}
      />;
    });
    return <Menu>
      {items}
    </Menu>;
  }
});

var MarketMenu = React.createClass({
  render(){
    var items = [
      {
        name:'Buy Integrations',
        link:'/marketplace',
        icon: 'shop',
      },
      {
        name:'Request Custom Integration',
        link:'/marketplace/request',
        icon: 'projects',
      },
    ];
    items = lodash.map(items,function(item){
      return <MenuItem key={item.name}
        text={item.name}
        iconName={item.icon}
        onClick={() => { actions.goto(item.link); }}
      />;
    });
    return <Menu>
      {items}
    </Menu>;
  }
});

var ManageMenu = React.createClass({
  render(){
    var items = [
      {
        name:'My Integrations',
        link:'/integration_instances',
        icon:'search-around',
      },
      {
        name:'My Organization',
        link:'/organization/' + actions.getState('org').id,
        icon: 'office'
      },
    ];
    items = lodash.map(items,function(item){
      return <MenuItem key={item.name}
        text={item.name}
        iconName={item.icon}
        onClick={() => { actions.goto(item.link); }}
      />;
    });
    return <Menu>
      {items}
    </Menu>;
  }
});

var BuildMenu = React.createClass({
  render(){
    var items = [
      {
        name:'Services',
        link:'/services/browse',
        icon: 'cloud'
      },
      {
        name:'Actions',
        link:'/actions/me',
        icon: 'git-pull'
      },
      {
        name:'Integrations',
        link:'/integrations/me',
        icon: 'code'
      },
    ];
    items = lodash.map(items,function(item){
      return <MenuItem key={item.name}
        text={item.name}
        iconName={item.icon}
        onClick={() => { actions.goto(item.link); }}
      />;
    });
    return <Menu>
      {items}
    </Menu>;
  }
});

module.exports = React.createClass({
  getInitialState: function() {
    return {
      org: actions.getState('org'),
      mode: actions.getState('mode'),
    };
  },
  componentDidMount: function() {
    // NQ: if not logged in, no need to worry about any of this
    if (actions.getState('token')) {
      // if no org exists for the user logged in set the default org
      var org = actions.getState('org');
      if (!org) {
        var user = actions.getState('me');
        actions.myAssociations()
        .then((result) => {
          var org = _.findWhere(result.organizations, {id: user.default_organization_id});
          if (!org) { org = result.organizations[0]; }
          actions.setViewToOrg(org);
          this.handleChangeOrg(org);
        });
      }
    }
  },
  handleChangeOrg: function(org) {
    this.setState({org: org});
  },
  render(){
    var child = null;
    if(this.props.children){
      child = React.cloneElement(this.props.children,this.props);
    }
    var links = [ ];

    var avatarMenu = null;
    if (actions.getState('token')) {    // logged in?
      var emailHash = md5(this.props.me.email.trim().toLowerCase());
      var avatarUrl = this.props.me.avatar_url ? this.props.me.avatar_url : "http://gravatar.com/avatar/" + emailHash + "?s=40";
      avatarMenu =
        <Popover content={<UserMenu/>} position={Position.BOTTOM_RIGHT}>
            <img src={avatarUrl} />
        </Popover>;
      // figure out what to name teh view menu (gross.)
      // "view" should be a bug - user should always be logged into an org view
      var orgName;
      if (this.state.org) {
        orgName = this.state.org.name;
      } else {
        orgName = 'Choose an Organization';
      }
    }

    return <div style={{paddingTop:50}}>
      <Navbar links={links} avatarMenu={avatarMenu}>
        { actions.getState('token') &&    // NQ: only show this menu if logged in
          <Popover
            content={<OrganizationMenu
              onChangeOrg={this.handleChangeOrg}
            />}
            position={Position.BOTTOM_RIGHT}
          >
            <li className='pt-menu-item pt-icon-people'>{orgName}</li>
          </Popover>
        }
        <span className="pt-navbar-divider"></span>
        <Popover content={<MarketMenu/>} position={Position.BOTTOM_RIGHT}>
          <li className='pt-menu-item pt-icon-shopping-cart'>Marketplace</li>
        </Popover>
        <Popover content={<ManageMenu/>} position={Position.BOTTOM_RIGHT}>
          <li className='pt-menu-item pt-icon-office'>Manage</li>
        </Popover>
        <Popover content={<BuildMenu/>} position={Position.BOTTOM_RIGHT}>
          <li className='pt-menu-item pt-icon-wrench'>Build</li>
        </Popover>
      </Navbar>
      <div className="pt-content" style={{padding: 20}}>
        {child}
      </div>
    </div>;
  }
});
