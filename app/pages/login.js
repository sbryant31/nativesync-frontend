var React = require('react')
import { browserHistory } from 'react-router'

var Login = require('../components/login')
var Signup = require('../components/signup')
var actions = require('../modules/actions')

module.exports = React.createClass({
  getInitialState:function(){
    return {
      signup:false,
      user:{
        email:'',password:''
      },
      nextPath:'/'
    }
  },
  handleUserChange:function(prop,val){
    var user = this.state.user
    user[prop] = val
    this.setState(user)
  },
  handleLoginSubmit:function(){
    var self = this
    actions.login(this.state.user.email,this.state.user.password).then(function(user){
      console.log(user)
      actions.goto(self.state.nextPath)
    }).catch(actions.toastError)

  },
  handleSignupSubmit:function(){
    var self = this
    actions.signup(this.state.user.email,this.state.user.password, this.state.accountType, this.state.companyName).then(function(user){
      console.log(user)
      actions.goto(self.state.nextPath)
    }).catch(actions.toastError)
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
      show = <Signup onSubmit={this.handleSignupSubmit}
                     onSwitch={this.switchToLogin}
                     onChange={this.handleUserChange}
                     email={this.state.email}
                     companyName={this.state.companyName}
                     accountType={this.state.accountType}
                     password={this.state.password}/>
    }else{
      show = <Login onSubmit={this.handleLoginSubmit}
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
