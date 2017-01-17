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
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div className="row name_inputs">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <label className="pt-label">
                  First Name
                  <div className='pt-input-group pt-large'>
                    <input
                      autoFocus
                      onChange={this.handleInput.bind(this,'first_name')}
                      className='pt-input' value={this.props.first_name}
                      placeholder='Your First Name'
                    />
                  </div>
                </label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <label className="pt-label">
                  Last Name
                  <div className='pt-input-group pt-large'>
                    <input
                      onChange={this.handleInput.bind(this,'last_name')}
                      className='pt-input' value={this.props.last_name}
                      placeholder='Your Last Name'
                    />
                  </div>
                </label>
              </div>
            </div>
            <label className="pt-label">
              Email
              <div className='pt-input-group pt-large'>
                <input
                  onChange={this.handleInput.bind(this,'email')}
                  className='pt-input' value={this.props.email}
                  placeholder='Email'
                />
              </div>
            </label>
            <label className="pt-label">
              Company Name
              <div className='pt-input-group pt-large'>
                <input
                  onChange={this.handleInput.bind(this,'companyName')}
                  className='pt-input' type='companyName' value={this.props.companyName}
                  placeholder='Company Name'
                />
              </div>
            </label>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label className="pt-label">
              I am a:
              <div className='pt-select pt-large'>
                <select
                  onChange={this.handleInput.bind(this,'accountType')}
                  value={this.props.accountType}
                >
                  <option value="partner">Developer/Partner</option>
                  <option value="client">Client</option>
                </select>
              </div>
            </label>
            <label className="pt-label">
              Create Password
              <div className='pt-input-group pt-large'>
                <input
                  onChange={this.handleInput.bind(this,'password')}
                  className='pt-input' type='password' value={this.props.password}
                  placeholder='Password'
                />
              </div>
            </label>
            <label className="pt-label">
              Confirm Password
              <div className='pt-input-group pt-large'>
                <input
                  onChange={this.handleInput.bind(this,'password_confirmation')}
                  className='pt-input' type='password' value={this.props.password_confirmation}
                  placeholder='Re-enter Password'
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
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <button onClick={this.props.onSubmit} className='pt-button pt-large pt-intent-primary'>
              Sign Up
            </button>
          </div>
        </div>
        <div className="divider"></div>
        <h6>Have an account? <Link to="/login">Login</Link></h6>
      </div>
    </div>;
  }
});
