var React = require('react')
var Navbar = require('../components/navbar')
import { browserHistory } from 'react-router'

module.exports = React.createClass({
  getInitialState(){
    return {}
  },
  componentWillMount(){
  },
  render: function() {
    var style = {
      height:600,
    }
    var links = [
     {
       name:'Login',
       icon:'pt-icon-log-in',
       url:'/login'
     }
    ]
    
    return <div>
      <Navbar links={links}/>
      <div style={{paddingTop:50}}>
        <div style={style} className='pt-card'>
          Jumbotron
        </div>
        <div style={style} className='pt-card'>
          Features
        </div>
        <div style={style} className='pt-card'>
          Pricing
        </div>
        <div style={style} className='pt-card'>
          Team
        </div>
        <div style={style} className='pt-card'>
          Contact
        </div>
        <div style={{height:50}} className='pt-card'>
          Footer
        </div>
      </div>
    </div>
  }
})
