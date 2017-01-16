webpackJsonp([13],{

/***/ 623:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _logo_svg = __webpack_require__(489);

	var _logo_svg2 = _interopRequireDefault(_logo_svg);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	      { className: 'Login' },
	      React.createElement(_logo_svg2.default, null),
	      React.createElement(
	        'div',
	        { className: 'pt-card' },
	        React.createElement(
	          'h2',
	          null,
	          'Log in to your account'
	        ),
	        React.createElement(
	          'div',
	          { className: 'pt-control-group pt-vertical' },
	          React.createElement(
	            'div',
	            { className: 'pt-input-group pt-large' },
	            React.createElement('input', {
	              autoFocus: true,
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
	        ),
	        React.createElement('hr', null),
	        React.createElement(
	          'h6',
	          { className: 'signup' },
	          'New to NativeSync? ',
	          React.createElement(
	            'a',
	            { onClick: this.handleSwitch },
	            'Sign up'
	          )
	        )
	      )
	    );
	  }
	});

/***/ },

/***/ 632:
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

/***/ 644:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';

	var _reactRouter = __webpack_require__(80);

	__webpack_require__(703);

	var React = __webpack_require__(1);

	// CSS


	var Login = __webpack_require__(623);
	var Signup = __webpack_require__(632);
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
	        { className: 'LoginContainer row center-xs' },
	        React.createElement(
	          'div',
	          { className: 'col-xs-4' },
	          show
	        )
	      )
	    );
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 686:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(380)();
	// imports


	// module
	exports.push([module.id, ".LoginContainer {\n  background-color: #2E2F56;\n  height: 100vh;\n  margin: 0;\n}\n\n.LoginContainer .Login {\n  margin-top: 200px;\n}\n\n.LoginContainer .Login .logo_svg {\n  margin-bottom: 30px;\n  height: 72px;\n}\n\n.LoginContainer .Login h1,\n.LoginContainer .Login h2 {\n  margin-bottom: 40px;\n  font-family: \"Geomanist Bold\", -apple-system, \"BlinkMacSystemFont\", \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Open Sans\", \"Helvetica Neue\", sans-serif, \"Icons16\";\n}\n\n.LoginContainer .Login input {\n  margin-bottom: 30px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL25hdGhhbi9TaXRlcy9uYXRpdmVzeW5jLWZyb250ZW5kL2FwcC9wYWdlcy9sb2dpbi9sb2dpbi5zY3NzIiwic291cmNlcyI6WyIvVXNlcnMvbmF0aGFuL1NpdGVzL25hdGl2ZXN5bmMtZnJvbnRlbmQvYXBwL3BhZ2VzL2xvZ2luL2xvZ2luLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiLkxvZ2luQ29udGFpbmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJFMkY1NjtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgbWFyZ2luOiAwO1xuICAuTG9naW4ge1xuICAgIG1hcmdpbi10b3A6IDIwMHB4O1xuICAgIC5sb2dvX3N2ZyB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuICAgICAgaGVpZ2h0OiA3MnB4O1xuICAgIH1cbiAgICBoMSwgaDIge1xuICAgICAgbWFyZ2luLWJvdHRvbTogNDBweDtcbiAgICAgIGZvbnQtZmFtaWx5OiBcIkdlb21hbmlzdCBCb2xkXCIsIC1hcHBsZS1zeXN0ZW0sIFwiQmxpbmtNYWNTeXN0ZW1Gb250XCIsIFwiU2Vnb2UgVUlcIiwgXCJSb2JvdG9cIiwgXCJPeHlnZW5cIiwgXCJVYnVudHVcIiwgXCJDYW50YXJlbGxcIiwgXCJPcGVuIFNhbnNcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmLCBcIkljb25zMTZcIjtcblxuICAgIH1cbiAgICBpbnB1dCB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuICAgIH1cbiAgICAucHQtY2FyZCB7XG4gICAgICAuc2lnbnVwIHtcbiAgICAgICAgLy8gZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQUFBQSxlQUFlLENBQUM7RUFDZCxnQkFBZ0IsRUFBRSxPQUFPO0VBQ3pCLE1BQU0sRUFBRSxLQUFLO0VBQ2IsTUFBTSxFQUFFLENBQUMsR0FxQlY7RUF4QkQsQUFJRSxlQUphLENBSWIsTUFBTSxDQUFDO0lBQ0wsVUFBVSxFQUFFLEtBQUssR0FrQmxCO0lBdkJILEFBTUksZUFOVyxDQUliLE1BQU0sQ0FFSixTQUFTLENBQUM7TUFDUixhQUFhLEVBQUUsSUFBSTtNQUNuQixNQUFNLEVBQUUsSUFBSSxHQUNiO0lBVEwsQUFVSSxlQVZXLENBSWIsTUFBTSxDQU1KLEVBQUUsRUFWTixBQVVNLGVBVlMsQ0FJYixNQUFNLENBTUEsRUFBRSxDQUFDO01BQ0wsYUFBYSxFQUFFLElBQUk7TUFDbkIsV0FBVyxFQUFFLGtLQUFrSyxHQUVoTDtJQWRMLEFBZUksZUFmVyxDQUliLE1BQU0sQ0FXSixLQUFLLENBQUM7TUFDSixhQUFhLEVBQUUsSUFBSSxHQUNwQiJ9 */", "", {"version":3,"sources":["/./app/pages/login/login.scss","/./app/pages/login/login.scss"],"names":[],"mappings":"AAAA;EACE,0BAAyB;EACzB,cAAa;EACb,UAAS;CCCV;;AAED;EACE,kBDAiB;CCClB;;AAED;EACE,oBDCiB;ECAjB,aDZF;CCaC;;AAED;;EAEE,oBAAoB;EACpB,gLAAgL;CACjL;;AAED;EACE,oBAAoB;CACrB;;AAED,ipDAAipD","file":"login.scss","sourcesContent":[".LoginContainer {\n  background-color: #2E2F56;\n  height: 100vh;\n  margin: 0;\n  .Login {\n    margin-top: 200px;\n    .logo_svg {\n      margin-bottom: 30px;\n      height: 72px;\n    }\n    h1, h2 {\n      margin-bottom: 40px;\n      font-family: \"Geomanist Bold\", -apple-system, \"BlinkMacSystemFont\", \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Open Sans\", \"Helvetica Neue\", sans-serif, \"Icons16\";\n\n    }\n    input {\n      margin-bottom: 30px;\n    }\n    .pt-card {\n      .signup {\n        // font-weight: bold;\n      }\n    }\n  }\n}\n",".LoginContainer {\n  background-color: #2E2F56;\n  height: 100vh;\n  margin: 0;\n}\n\n.LoginContainer .Login {\n  margin-top: 200px;\n}\n\n.LoginContainer .Login .logo_svg {\n  margin-bottom: 30px;\n  height: 72px;\n}\n\n.LoginContainer .Login h1,\n.LoginContainer .Login h2 {\n  margin-bottom: 40px;\n  font-family: \"Geomanist Bold\", -apple-system, \"BlinkMacSystemFont\", \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Open Sans\", \"Helvetica Neue\", sans-serif, \"Icons16\";\n}\n\n.LoginContainer .Login input {\n  margin-bottom: 30px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL25hdGhhbi9TaXRlcy9uYXRpdmVzeW5jLWZyb250ZW5kL2FwcC9wYWdlcy9sb2dpbi9sb2dpbi5zY3NzIiwic291cmNlcyI6WyIvVXNlcnMvbmF0aGFuL1NpdGVzL25hdGl2ZXN5bmMtZnJvbnRlbmQvYXBwL3BhZ2VzL2xvZ2luL2xvZ2luLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiLkxvZ2luQ29udGFpbmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJFMkY1NjtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgbWFyZ2luOiAwO1xuICAuTG9naW4ge1xuICAgIG1hcmdpbi10b3A6IDIwMHB4O1xuICAgIC5sb2dvX3N2ZyB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuICAgICAgaGVpZ2h0OiA3MnB4O1xuICAgIH1cbiAgICBoMSwgaDIge1xuICAgICAgbWFyZ2luLWJvdHRvbTogNDBweDtcbiAgICAgIGZvbnQtZmFtaWx5OiBcIkdlb21hbmlzdCBCb2xkXCIsIC1hcHBsZS1zeXN0ZW0sIFwiQmxpbmtNYWNTeXN0ZW1Gb250XCIsIFwiU2Vnb2UgVUlcIiwgXCJSb2JvdG9cIiwgXCJPeHlnZW5cIiwgXCJVYnVudHVcIiwgXCJDYW50YXJlbGxcIiwgXCJPcGVuIFNhbnNcIiwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmLCBcIkljb25zMTZcIjtcblxuICAgIH1cbiAgICBpbnB1dCB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuICAgIH1cbiAgICAucHQtY2FyZCB7XG4gICAgICAuc2lnbnVwIHtcbiAgICAgICAgLy8gZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQUFBQSxlQUFlLENBQUM7RUFDZCxnQkFBZ0IsRUFBRSxPQUFPO0VBQ3pCLE1BQU0sRUFBRSxLQUFLO0VBQ2IsTUFBTSxFQUFFLENBQUMsR0FxQlY7RUF4QkQsQUFJRSxlQUphLENBSWIsTUFBTSxDQUFDO0lBQ0wsVUFBVSxFQUFFLEtBQUssR0FrQmxCO0lBdkJILEFBTUksZUFOVyxDQUliLE1BQU0sQ0FFSixTQUFTLENBQUM7TUFDUixhQUFhLEVBQUUsSUFBSTtNQUNuQixNQUFNLEVBQUUsSUFBSSxHQUNiO0lBVEwsQUFVSSxlQVZXLENBSWIsTUFBTSxDQU1KLEVBQUUsRUFWTixBQVVNLGVBVlMsQ0FJYixNQUFNLENBTUEsRUFBRSxDQUFDO01BQ0wsYUFBYSxFQUFFLElBQUk7TUFDbkIsV0FBVyxFQUFFLGtLQUFrSyxHQUVoTDtJQWRMLEFBZUksZUFmVyxDQUliLE1BQU0sQ0FXSixLQUFLLENBQUM7TUFDSixhQUFhLEVBQUUsSUFBSSxHQUNwQiJ9 */"],"sourceRoot":"webpack://"}]);

	// exports


/***/ },

/***/ 703:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(686);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(465)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/resolve-url-loader/index.js!./../../../node_modules/sass-loader/index.js?sourceMap!./login.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/resolve-url-loader/index.js!./../../../node_modules/sass-loader/index.js?sourceMap!./login.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }

});