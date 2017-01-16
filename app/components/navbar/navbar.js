var React = require('react');
var lodash = require('lodash');
var actions = require('../../modules/actions');
import { browserHistory } from 'react-router';
import { Colors } from '@blueprintjs/core';

import LogoSVG from '../logo_svg';
// var cloud = require('../img/cloud.png');
// var logo_text = require('../img/logo_text.png');

// CSS
import './navbar.scss';

module.exports = React.createClass({
  getDefaultProps:function(){
    return {
      links:[],
      avatarMenu: ''
    };
  },
  render: function() {
    var links = lodash.map(this.props.links,function(link){
      return <li
        key={link.name}
        onClick={actions.goto.bind(null,link.url)}
        className={'pt-menu-item ' + link.icon}
        >{link.name}</li>;
    }.bind(this));

    return <nav className='Navbar pt-navbar pt-fixed-top'>
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading">
          <LogoSVG />
          <span className="ns_text">NativeSync</span>
        </div>
      </div>
      <div className="pt-navbar-group pt-align-right" >
        <ul className='pt-menu'>
          {this.props.children}
          {links}
        </ul>
        {this.props.avatarMenu}
      </div>
    </nav>;
  }
});
