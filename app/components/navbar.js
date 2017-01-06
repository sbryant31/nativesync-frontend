var React = require('react');
var actions = require('../modules/actions');
// import { Colors } from '@blueprintjs/core';

import { AppBar } from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/link';

function logo() {
  var cloud = require('../img/cloud.png');
  var logo_text = require('../img/logo_text.png');
  return (
    <div>
      <img src={cloud} />
    </div>
  );
}

module.exports = React.createClass({
  getDefaultProps:function(){
    return {
      links:[],
      avatarMenu: ''
    };
  },
  render: function() {
    var links = this.props.links.map(l => (
      <Link
        key={l.name}
        onClick={(e) => actions.goto(l.url, e)}
        label={l.name}
        href={l.url}
        className={'pt-menu-item ' + l.icon}
      />
    ));

    return <AppBar title='nativeSync' leftIcon={logo()}>
      <Navigation type='horizontal'>
        {links}
      </Navigation>
    </AppBar>;
    // return <nav className='pt-navbar pt-fixed-top' style={{backgroundColor: '#16253d'}}>
    //   <div className="pt-navbar-group pt-align-left">
    //     <div className="pt-navbar-heading"><img src={cloud} style={{height: 45, width: 79}} /><img src={logo_text} style={{height: 35, width: 210}}/></div>
    //   </div>
    //   <div className="pt-navbar-group pt-align-right" >
    //     <ul className='pt-menu' style={{backgroundColor: '#16253d', color: '#FFF'}}>
    //       {links}
    //       <span className="pt-navbar-divider"></span>
    //       {this.props.children}
    //     </ul>
    //     {this.props.avatarMenu}
    //   </div>
    // </nav>
  }
});
