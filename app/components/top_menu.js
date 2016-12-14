var React = require('react')
var lodash = require('lodash')
import { browserHistory } from 'react-router'

var Menu = React.createClass({
  getDefaultProps:function(){
    return { items: [] }
  },
  goto:function(url){
    browserHistory.push(url)
  },
  render:function(){
    var menuItems = lodash.map(this.props.items,function(menuItem){
      return <button
        key={menuItem.name}
        onClick={this.goto.bind(this,menuItem.url)}
        className={'pt-button pt-minimal ' + menuItem.icon}>{menuItem.name}</button>
    }.bind(this))
    return <div>
        <ul className='pt-menu'>
          { menuItems }
        </ul>
    </div>
  }
})

module.exports = React.createClass({
  getDefaultProps:function(){
    return { }
  },
  goto:function(url){
    browserHistory.push(url)
  },
  render:function(){
    var browse_items = [
      {name: 'Actions', url: '/actions/browse'}
    ]
    var partner_items = [
      {name: 'Dashboard', url: '/partner/dashboard'},
      {name: 'Integrations', url: '/partner/integrations'},
      {name: 'Actions', url: '/partner/actions'}
    ];
    return <div>
      <Menu items={browse_items} />
      <Menu items={partner_items} />
    </div>
  }
})

