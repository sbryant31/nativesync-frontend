var React = require('react')
var lodash = require('lodash')
import { browserHistory } from 'react-router'
var TopMenu = require('./top_menu');

module.exports = React.createClass({
  goto:function(url){
    browserHistory.push(url)
  },
  getDefaultProps:function(){
    return {
      links:[]
    }
  },
  render: function() {
    var links = lodash.map(this.props.links,function(link){
      return <button
        key={link.name}
        onClick={this.goto.bind(this,link.url)}
        className={'pt-button pt-minimal ' + link.icon}>{link.name}</button>
    }.bind(this))

    return <nav className='pt-navbar pt-fixed-top'>
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading">Nativesync</div>
      </div>
      <div className="pt-navbar-group pt-align-right">
        <TopMenu />
        <div>
          {this.state && this.state.me ? this.state.me.email : ''}
        </div>
        {links}
      </div>
    </nav>
  }
})
