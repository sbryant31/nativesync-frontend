var React = require('react');
import { Link } from 'react-router';
import LogoSVG from './logo_svg';

module.exports = React.createClass({
  getDefaultProps(){
    return {
      onChange:function(){},
      onSwitch:function(){},
      onSubmit:function(){},
      password:'',
      email:'',
      companyName:'',
      accountType: 'partner'
    };
  },

  handleInput(prop, e){
    this.props.onChange(prop, e.target.value, e);
  },

  handleSwitch(){
    this.props.onSwitch();
  },

  render(){
    return <div className="Signup">
      <LogoSVG />
      <div className='pt-card'>
        <h2>Sign up for free</h2>
        <div className="subheading">NativeSync is the best way to integrate your apps.</div>
        <form onSubmit={this.props.onSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <label className="pt-label">
                Your Name
                <div className='pt-input-group pt-large'>
                  <input
                    autoFocus
                    required
                    onChange={this.handleInput.bind(this,'name')}
                    className='pt-input' value={this.props.name}
                    placeholder='John Smith'
                  />
                </div>
              </label>
              <label className="pt-label">
                Email
                <div className='pt-input-group pt-large'>
                  <input
                    required
                    pattern="^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$"
                    onChange={this.handleInput.bind(this,'email')}
                    className='pt-input' value={this.props.email}
                    placeholder='you@example.com'
                  />
                </div>
              </label>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <label className="pt-label">
                Company Name
                <div className='pt-input-group pt-large'>
                  <input
                    onChange={this.handleInput.bind(this,'companyName')}
                    className='pt-input' type='companyName' value={this.props.companyName}
                    placeholder='Acme Co.'
                  />
                </div>
              </label>
              <label className="pt-label">
                Create Password
                <div className='pt-input-group pt-large'>
                  <input
                    required
                    name="password"
                    onChange={this.handleInput.bind(this,'password')}
                    className='pt-input' type='password' value={this.props.password}
                    placeholder='Password'
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="divider"></div>
          <div className="row final">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 terms-and-conditions">
              By signing up, you are agreeing to NativeSync's
              <a href="#"> Terms and Conditions</a>.
            </div>
            <div className="buttons col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <button type="submit" className='submit pt-button pt-large pt-intent-primary'>
                Sign Up
              </button>
            </div>
            <div className="buttons col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <Link className="cancel-link" to="/">
                <button className='cancel pt-button pt-large pt-intent-cancel'>
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
      <p className="login">Already have an account? <Link to="/login">Log In</Link></p>
    </div>;
  }
});
