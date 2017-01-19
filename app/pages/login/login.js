var React = require('react');

// CSS
import './login.scss';

var Login = require('../../components/login');
var actions = require('../../modules/actions');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: {
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

  handleLoginSubmit: function() {
    var self = this;
    actions.login(this.state.user.email, this.state.user.password).then(function(user) {
      console.log("USER: ", user);
      actions.goto(self.state.nextPath);
    }).catch(actions.toastError);
  },

  render() {
    return <div>
      <div className='LoginContainer row center-xs'>
        <div className='col-xs-3'>
          <Login onSubmit={this.handleLoginSubmit}
                 onChange={this.handleUserChange}
                 email={this.state.user.email}
                 password={this.state.user.password}
          />;
        </div>
      </div>
    </div>;
  }
});
