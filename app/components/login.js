var React = require('react')
module.exports = React.createClass({
  getDefaultProps(){
    return {
      onChange:function(){},
      onSwitch:function(){},
      onSubmit:function(){},
      password:'',email:''
    }
  },
  handleInput(prop,e){
    this.props.onChange(prop,e.target.value,e)
  },
  handleSwitch(){
    this.props.onSwitch()
  },
  submit(){
    this.props.onSubmit()
  },
  render(){
    return <div>
      <div className='pt-card'>
        Login to your Nativesync Account
      </div>
      <div className='pt-card'>
        <div className='pt-control-group pt-vertical'>
          <div className='pt-input-group pt-large'>
            <input 
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
      </div>
      <div className='pt-card'>
        Need an account? <a onClick={this.handleSwitch}>Signup</a>
      </div>
    </div>
  }
})
