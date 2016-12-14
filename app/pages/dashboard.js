var React = require('react')
var Navbar = require('../components/navbar')
module.exports = React.createClass({
  render(){
    var links = [
     {
       name:'Logout',
       icon:'pt-icon-log-in',
       url:'/logout'
     }
    ]
    return <div style={{paddingTop:50}}>
      <Navbar links={links}/>
      Dashboard 
    </div>
  }
})

