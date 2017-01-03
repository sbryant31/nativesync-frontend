var React = require('react');
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
        Create a Nativesync Account
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
          <div className='pt-select pt-fill'>
            <select
              onChange={this.handleInput.bind(this,'accountType')}
              value={this.props.accountType}
            >
              <option value="partner">Developer/Partner</option>
              <option value="client">Client</option>
            </select>
          </div>
          <div className='pt-input-group pt-large'>
            <input
              onChange={this.handleInput.bind(this,'companyName')}
              className='pt-input' type='companyName' value={this.props.companyName}
              placeholder='Company Name'
            />
          </div>
          <button onClick={this.submit}
            className='pt-button pt-large pt-intent-primary'>
            Signup
          </button>
        </div>
      </div>
      <div className='pt-card'>
        Have an account? <a onClick={this.handleSwitch}>Login</a>
      </div>
    </div>
  }
})
