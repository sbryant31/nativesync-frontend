var React = require('react');

// CSS
import './signup.scss';

var Signup = require('../../components/signup');
var actions = require('../../modules/actions');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: {
        name: '',
        companyName: '',
        email: '',
        password: '',
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

  handleSignupSubmit: function(e) {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      actions.toastError('Form data not valid.');
    } else {
      actions.signup(this.state.user).then(user => {
        actions.goto(this.state.nextPath);
      }).catch(actions.toastError);
    }
  },

  render() {
    return <div>
      <div className='SignupContainer row center-xs'>
        <div className='col-xs-5'>
          <Signup onSubmit={this.handleSignupSubmit}
                  onChange={this.handleUserChange}
                  name={this.state.user.name}
                  email={this.state.user.email}
                  companyName={this.state.user.companyName}
                  password={this.state.user.password}
          />;
        </div>
      </div>
    </div>;
  }
});
