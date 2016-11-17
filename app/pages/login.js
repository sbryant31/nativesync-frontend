var React = require('react')
import { browserHistory } from 'react-router'

var Login = require('../components/login')
var Signup = require('../components/signup')

module.exports = React.createClass({
  getInitialState:function(){
    return {
      signup:false,
      user:{
        email:'',password:''
      },
      nextPath:'/develop'
    }
  },
  handleUserChange:function(prop,val){
    var user = this.state.user
    user[prop] = val
    this.setState(user)
  },
  handleSubmit:function(){
    browserHistory.push(this.state.nextPath)
  },
  switchToLogin:function(){
    this.setState({signup:false})
  },
  switchToSignup:function(){
    this.setState({signup:true})
  },
  render(){
    var show = null
    if(this.state.signup){
      show = <Signup onSubmit={this.handleSubmit} 
                     onSwitch={this.switchToLogin} 
                     onChange={this.handleUserChange} 
                     email={this.state.email} 
                     password={this.state.password}/>
    }else{
      show = <Login onSubmit={this.handleSubmit} 
                    onSwitch={this.switchToSignup} 
                    onChange={this.handleUserChange} 
                    email={this.state.email} 
                    password={this.state.password}/>
    }
    return <div>
      <div className='row center-xs'>
        <div style={{paddingTop:200, paddingBottom:200}}  className='col-xs-4'>
        {show}
        </div>
      </div>
    </div>
  }
})

