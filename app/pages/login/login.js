var React = require('react');
import { browserHistory } from 'react-router';

// CSS
import './login.scss';

var Login = require('../../components/login');
var Signup = require('../../components/signup');
var actions = require('../../modules/actions');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      signup: false,
      user: {
        first_name: '',
        last_name: '',
        accountType: '',
        companyName: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      nextPath: '/'
    };
  },

  handleUserChange: function(prop, val) {
    var user = {...this.state.user};
    user[prop] = val;
    // console.log("USER: ", user);
    this.setState({user});
  },

  handleLoginSubmit: function() {
    var self = this;
    actions.login(this.state.user.email, this.state.user.password).then(function(user) {
      console.log("USER: ", user);
      actions.goto(self.state.nextPath);
    }).catch(actions.toastError);
  },

  handleSignupSubmit: function() {
    actions.signup(this.state.user).then(user => {
      console.log(user);
      actions.goto(this.state.nextPath);
    }).catch(actions.toastError);
  },

  switchToLogin: function() {
    this.setState({ signup: false });
  },

  switchToSignup: function() {
    this.setState({ signup: true });
  },

  render() {
    var show = null;
    if (this.state.signup) {
      show = <Signup onSubmit={this.handleSignupSubmit}
                     onSwitch={this.switchToLogin}
                     onChange={this.handleUserChange}
                     first_name={this.state.user.first_name}
                     last_name={this.state.user.last_name}
                     email={this.state.user.email}
                     companyName={this.state.user.companyName}
                     accountType={this.state.user.accountType}
                     password={this.state.user.password}
                     password_confirmation={this.state.user.password_confirmation}
             />;
    } else {
      show = <Login onSubmit={this.handleLoginSubmit}
                    onSwitch={this.switchToSignup}
                    onChange={this.handleUserChange}
                    email={this.state.user.email}
                    password={this.state.user.password}/>;
    }
    return <div>
      <div className='LoginContainer row center-xs'>
        <div className='col-xs-5'>
          {show}
        </div>
      </div>
    </div>;
  }
});
