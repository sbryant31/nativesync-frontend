var React = require('react');
import LogoSVG from './logo_svg';

module.exports = React.createClass({
  getDefaultProps() {
    return {
      onChange:function() {},
      onSwitch:function() {},
      onSubmit:function() {},
      password:'',email:''
    };
  },
  handleInput(prop,e) {
    this.props.onChange(prop,e.target.value,e);
  },
  handleSwitch() {
    this.props.onSwitch();
  },
  submit() {
    this.props.onSubmit();
  },
  render() {
    return <div className="Login">
      <LogoSVG />
      <div className='pt-card'>
        <h2>Log in to your account</h2>
        <div className='pt-control-group pt-vertical'>
          <div className='pt-input-group pt-large'>
            <input
              autoFocus
              onChange={this.handleInput.bind(this,'email')}
              className='pt-input' value={this.props.email}
              placeholder='Email'

            />
          </div>
          <div className='pt-input-group pt-large'>
            <input
              onChange={this.handleInput.bind(this,'password')}
              className='pt-input' type='password' value={this.props.password}
              placeholder='Password'
            />
          </div>
          <button onClick={this.submit}
            className='pt-button pt-large pt-intent-primary'>
            Login
          </button>
        </div>
        <hr />
        <h6 className="signup">
          New to NativeSync? <a onClick={this.handleSwitch}>Sign up</a>
        </h6>
      </div>
    </div>;
  }
});
