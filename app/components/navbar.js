var React = require('react')
var lodash = require('lodash')
var actions = require('../modules/actions')
import { browserHistory } from 'react-router'
import { Colors } from '@blueprintjs/core'

module.exports = React.createClass({
  getDefaultProps:function(){
    return {
      links:[],
      avatarMenu: ''
    }
  },
  render: function() {
    var links = lodash.map(this.props.links,function(link){
      return <li
        key={link.name}
        onClick={actions.goto.bind(null,link.url)}
        className={'pt-menu-item ' + link.icon}
        >{link.name}</li>
    }.bind(this))

    return <nav className='pt-navbar pt-fixed-top' style={{backgroundColor: '#16253d'}}>
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading"><img src={'/img/cloud.png'} style={{height: 45, width: 79}} /><img src={'/img/logo_text.png'} style={{height: 35, width: 210}}/></div>
      </div>
      <div className="pt-navbar-group pt-align-right" >
        <ul className='pt-menu' style={{backgroundColor: '#16253d', color: '#FFF'}}>
          {links}
          <span class="pt-navbar-divider"></span>
          {this.props.children}
        </ul>
        {this.props.avatarMenu}
      </div>
    </nav>
  }
})
