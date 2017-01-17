var React = require('react');

// CSS
import './signup.scss';

var Signup = require('../../components/signup');
var actions = require('../../modules/actions');

module.exports = React.createClass({
  getInitialState: function() {
    return {
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

  handleSignupSubmit: function() {
    actions.signup(this.state.user).then(user => {
      console.log(user);
      actions.goto(this.state.nextPath);
    }).catch(actions.toastError);
  },

  render() {
    return <div>
      <div className='LoginContainer row center-xs'>
        <div className='col-xs-5'>
          <Signup onSubmit={this.handleSignupSubmit}
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
        </div>
      </div>
    </div>;
  }
});
