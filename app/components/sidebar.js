var React = require('react');
var lodash = require('lodash');
import { browserHistory } from 'react-router';

module.exports = React.createClass({
  getDefaultProps:function(){
    return {
      items:{}
    }
  },
  goto:function(url){
    browserHistory.push(url)
  },
  render:function(){
    var items = lodash.map(this.props.items,function(item){
      return <li key={item.name}>
        <button
          type='button'
          onClick={this.goto.bind(this,item.url)}
          className='pt-menu-item'>{item.name}</button>
      </li>
    }.bind(this))
    return <div>
      <ul className='pt-menu'>
        {items}
      </ul>
    </div>
  }
})
