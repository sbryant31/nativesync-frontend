var React = require('react')
var lodash = require('lodash')
var actions = require('../modules/actions')
import { browserHistory } from 'react-router'
module.exports = React.createClass({
  getDefaultProps:function(){
    return {
      links:[]
    }
  },
  render: function() {
    var links = lodash.map(this.props.links,function(link){
      return <button 
        key={link.name}
        onClick={actions.goto.bind(null,link.url)}
        className={'pt-button pt-minimal ' + link.icon}>{link.name}</button>
    }.bind(this))

    return <nav className='pt-navbar pt-fixed-top'>
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading">Nativesync Navbar</div>
      </div>
      <div className="pt-navbar-group pt-align-right">
        {links}
        {this.props.children}
      </div>
    </nav>
  }
})
