webpackJsonp([14],{

/***/ 621:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	module.exports = React.createClass({
	  displayName: 'exports',
	  getDefaultProps: function getDefaultProps() {
	    return {
	      onChange: function onChange() {},
	      onSwitch: function onSwitch() {},
	      onSubmit: function onSubmit() {},
	      password: '', email: ''
	    };
	  },
	  handleInput: function handleInput(prop, e) {
	    this.props.onChange(prop, e.target.value, e);
	  },
	  handleSwitch: function handleSwitch() {
	    this.props.onSwitch();
	  },
	  submit: function submit() {
	    this.props.onSubmit();
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'pt-card' },
	        'Login to your Nativesync Account'
	      ),
	      React.createElement(
	        'div',
	        { className: 'pt-card' },
	        React.createElement(
	          'div',
	          { className: 'pt-control-group pt-vertical' },
	          React.createElement(
	            'div',
	            { className: 'pt-input-group pt-large' },
	            React.createElement('input', {
	              onChange: this.handleInput.bind(this, 'email'),
	              className: 'pt-input', value: this.props.email,
	              placeholder: 'Email'
	            })
	          ),
	          React.createElement(
	            'div',
	            { className: 'pt-input-group pt-large' },
	            React.createElement('input', {
	              onChange: this.handleInput.bind(this, 'password'),
	              className: 'pt-input', type: 'password', value: this.props.password,
	              placeholder: 'Password'
	            })
	          ),
	          React.createElement(
	            'button',
	            { onClick: this.submit,
	              className: 'pt-button pt-large pt-intent-primary' },
	            'Login'
	          )
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'pt-card' },
	        'Need an account? ',
	        React.createElement(
	          'a',
	          { onClick: this.handleSwitch },
	          'Signup'
	        )
	      )
	    );
	  }
	});

/***/ },

/***/ 630:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	module.exports = React.createClass({
	  displayName: 'exports',
	  getDefaultProps: function getDefaultProps() {
	    return {
	      onChange: function onChange() {},
	      onSwitch: function onSwitch() {},
	      onSubmit: function onSubmit() {},
	      password: '',
	      email: '',
	      companyName: '',
	      accountType: 'partner'
	    };
	  },
	  handleInput: function handleInput(prop, e) {
	    this.props.onChange(prop, e.target.value, e);
	  },
	  handleSwitch: function handleSwitch() {
	    this.props.onSwitch();
	  },
	  submit: function submit() {
	    this.props.onSubmit();
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'pt-card' },
	        'Create a Nativesync Account'
	      ),
	      React.createElement(
	        'div',
	        { className: 'pt-card' },
	        React.createElement(
	          'div',
	          { className: 'pt-control-group pt-vertical' },
	          React.createElement(
	            'div',
	            { className: 'pt-input-group pt-large' },
	            React.createElement('input', {
	              onChange: this.handleInput.bind(this, 'email'),
	              className: 'pt-input', value: this.props.email,
	              placeholder: 'Email'
	            })
	          ),
	          React.createElement(
	            'div',
	            { className: 'pt-input-group pt-large' },
	            React.createElement('input', {
	              onChange: this.handleInput.bind(this, 'password'),
	              className: 'pt-input', type: 'password', value: this.props.password,
	              placeholder: 'Password'
	            })
	          ),
	          React.createElement(
	            'div',
	            { className: 'pt-select pt-fill' },
	            React.createElement(
	              'select',
	              {
	                onChange: this.handleInput.bind(this, 'accountType'),
	                value: this.props.accountType
	              },
	              React.createElement(
	                'option',
	                { value: 'partner' },
	                'Developer/Partner'
	              ),
	              React.createElement(
	                'option',
	                { value: 'client' },
	                'Client'
	              )
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'pt-input-group pt-large' },
	            React.createElement('input', {
	              onChange: this.handleInput.bind(this, 'companyName'),
	              className: 'pt-input', type: 'companyName', value: this.props.companyName,
	              placeholder: 'Company Name'
	            })
	          ),
	          React.createElement(
	            'button',
	            { onClick: this.submit,
	              className: 'pt-button pt-large pt-intent-primary' },
	            'Signup'
	          )
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'pt-card' },
	        'Have an account? ',
	        React.createElement(
	          'a',
	          { onClick: this.handleSwitch },
	          'Login'
	        )
	      )
	    );
	  }
	});

/***/ },

/***/ 643:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';

	var _reactRouter = __webpack_require__(77);

	var React = __webpack_require__(1);


	var Login = __webpack_require__(621);
	var Signup = __webpack_require__(630);
	var actions = __webpack_require__(4);

	module.exports = React.createClass({
	  displayName: 'exports',

	  getInitialState: function getInitialState() {
	    return {
	      signup: false,
	      user: {
	        email: '', password: ''
	      },
	      nextPath: '/'
	    };
	  },
	  handleUserChange: function handleUserChange(prop, val) {
	    var user = this.state.user;
	    user[prop] = val;
	    this.setState(user);
	  },
	  handleLoginSubmit: function handleLoginSubmit() {
	    var self = this;
	    actions.login(this.state.user.email, this.state.user.password).then(function (user) {
	      console.log("USER: ", user);
	      actions.goto(self.state.nextPath);
	    }).catch(actions.toastError);
	  },
	  handleSignupSubmit: function handleSignupSubmit() {
	    var self = this;
	    actions.signup(this.state.user.email, this.state.user.password, this.state.accountType, this.state.companyName).then(function (user) {
	      console.log(user);
	      actions.goto(self.state.nextPath);
	    }).catch(actions.toastError);
	  },
	  switchToLogin: function switchToLogin() {
	    this.setState({ signup: false });
	  },
	  switchToSignup: function switchToSignup() {
	    this.setState({ signup: true });
	  },
	  render: function render() {
	    var show = null;
	    if (this.state.signup) {
	      show = React.createElement(Signup, { onSubmit: this.handleSignupSubmit,
	        onSwitch: this.switchToLogin,
	        onChange: this.handleUserChange,
	        email: this.state.email,
	        companyName: this.state.companyName,
	        accountType: this.state.accountType,
	        password: this.state.password });
	    } else {
	      show = React.createElement(Login, { onSubmit: this.handleLoginSubmit,
	        onSwitch: this.switchToSignup,
	        onChange: this.handleUserChange,
	        email: this.state.email,
	        password: this.state.password });
	    }
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'row center-xs' },
	        React.createElement(
	          'div',
	          { style: { paddingTop: 200, paddingBottom: 200 }, className: 'col-xs-4' },
	          show
	        )
	      )
	    );
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }

});