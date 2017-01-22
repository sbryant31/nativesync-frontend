webpackJsonp([8],{

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/react-select
	*/

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(24);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactInputAutosize = __webpack_require__(41);

	var _reactInputAutosize2 = _interopRequireDefault(_reactInputAutosize);

	var _classnames = __webpack_require__(7);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _utilsDefaultArrowRenderer = __webpack_require__(47);

	var _utilsDefaultArrowRenderer2 = _interopRequireDefault(_utilsDefaultArrowRenderer);

	var _utilsDefaultFilterOptions = __webpack_require__(25);

	var _utilsDefaultFilterOptions2 = _interopRequireDefault(_utilsDefaultFilterOptions);

	var _utilsDefaultMenuRenderer = __webpack_require__(26);

	var _utilsDefaultMenuRenderer2 = _interopRequireDefault(_utilsDefaultMenuRenderer);

	var _Async = __webpack_require__(42);

	var _Async2 = _interopRequireDefault(_Async);

	var _AsyncCreatable = __webpack_require__(43);

	var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

	var _Creatable = __webpack_require__(44);

	var _Creatable2 = _interopRequireDefault(_Creatable);

	var _Option = __webpack_require__(45);

	var _Option2 = _interopRequireDefault(_Option);

	var _Value = __webpack_require__(46);

	var _Value2 = _interopRequireDefault(_Value);

	function stringifyValue(value) {
		var valueType = typeof value;
		if (valueType === 'string') {
			return value;
		} else if (valueType === 'object') {
			return JSON.stringify(value);
		} else if (valueType === 'number' || valueType === 'boolean') {
			return String(value);
		} else {
			return '';
		}
	}

	var stringOrNode = _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]);

	var instanceId = 1;

	var Select = _react2['default'].createClass({

		displayName: 'Select',

		propTypes: {
			addLabelText: _react2['default'].PropTypes.string, // placeholder displayed when you want to add a label on a multi-value input
			'aria-label': _react2['default'].PropTypes.string, // Aria label (for assistive tech)
			'aria-labelledby': _react2['default'].PropTypes.string, // HTML ID of an element that should be used as the label (for assistive tech)
			arrowRenderer: _react2['default'].PropTypes.func, // Create drop-down caret element
			autoBlur: _react2['default'].PropTypes.bool, // automatically blur the component when an option is selected
			autofocus: _react2['default'].PropTypes.bool, // autofocus the component on mount
			autosize: _react2['default'].PropTypes.bool, // whether to enable autosizing or not
			backspaceRemoves: _react2['default'].PropTypes.bool, // whether backspace removes an item if there is no text input
			backspaceToRemoveMessage: _react2['default'].PropTypes.string, // Message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
			className: _react2['default'].PropTypes.string, // className for the outer element
			clearAllText: stringOrNode, // title for the "clear" control when multi: true
			clearValueText: stringOrNode, // title for the "clear" control
			clearable: _react2['default'].PropTypes.bool, // should it be possible to reset value
			delimiter: _react2['default'].PropTypes.string, // delimiter to use to join multiple values for the hidden field value
			disabled: _react2['default'].PropTypes.bool, // whether the Select is disabled or not
			escapeClearsValue: _react2['default'].PropTypes.bool, // whether escape clears the value when the menu is closed
			filterOption: _react2['default'].PropTypes.func, // method to filter a single option (option, filterString)
			filterOptions: _react2['default'].PropTypes.any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
			ignoreAccents: _react2['default'].PropTypes.bool, // whether to strip diacritics when filtering
			ignoreCase: _react2['default'].PropTypes.bool, // whether to perform case-insensitive filtering
			inputProps: _react2['default'].PropTypes.object, // custom attributes for the Input
			inputRenderer: _react2['default'].PropTypes.func, // returns a custom input component
			instanceId: _react2['default'].PropTypes.string, // set the components instanceId
			isLoading: _react2['default'].PropTypes.bool, // whether the Select is loading externally or not (such as options being loaded)
			joinValues: _react2['default'].PropTypes.bool, // joins multiple values into a single form field with the delimiter (legacy mode)
			labelKey: _react2['default'].PropTypes.string, // path of the label value in option objects
			matchPos: _react2['default'].PropTypes.string, // (any|start) match the start or entire string when filtering
			matchProp: _react2['default'].PropTypes.string, // (any|label|value) which option property to filter on
			menuBuffer: _react2['default'].PropTypes.number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
			menuContainerStyle: _react2['default'].PropTypes.object, // optional style to apply to the menu container
			menuRenderer: _react2['default'].PropTypes.func, // renders a custom menu with options
			menuStyle: _react2['default'].PropTypes.object, // optional style to apply to the menu
			multi: _react2['default'].PropTypes.bool, // multi-value input
			name: _react2['default'].PropTypes.string, // generates a hidden <input /> tag with this field name for html forms
			noResultsText: stringOrNode, // placeholder displayed when there are no matching search results
			onBlur: _react2['default'].PropTypes.func, // onBlur handler: function (event) {}
			onBlurResetsInput: _react2['default'].PropTypes.bool, // whether input is cleared on blur
			onChange: _react2['default'].PropTypes.func, // onChange handler: function (newValue) {}
			onClose: _react2['default'].PropTypes.func, // fires when the menu is closed
			onCloseResetsInput: _react2['default'].PropTypes.bool, // whether input is cleared when menu is closed through the arrow
			onFocus: _react2['default'].PropTypes.func, // onFocus handler: function (event) {}
			onInputChange: _react2['default'].PropTypes.func, // onInputChange handler: function (inputValue) {}
			onInputKeyDown: _react2['default'].PropTypes.func, // input keyDown handler: function (event) {}
			onMenuScrollToBottom: _react2['default'].PropTypes.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
			onOpen: _react2['default'].PropTypes.func, // fires when the menu is opened
			onValueClick: _react2['default'].PropTypes.func, // onClick handler for value labels: function (value, event) {}
			openAfterFocus: _react2['default'].PropTypes.bool, // boolean to enable opening dropdown when focused
			openOnFocus: _react2['default'].PropTypes.bool, // always open options menu on focus
			optionClassName: _react2['default'].PropTypes.string, // additional class(es) to apply to the <Option /> elements
			optionComponent: _react2['default'].PropTypes.func, // option component to render in dropdown
			optionRenderer: _react2['default'].PropTypes.func, // optionRenderer: function (option) {}
			options: _react2['default'].PropTypes.array, // array of options
			pageSize: _react2['default'].PropTypes.number, // number of entries to page when using page up/down keys
			placeholder: stringOrNode, // field placeholder, displayed when there's no value
			required: _react2['default'].PropTypes.bool, // applies HTML5 required attribute when needed
			resetValue: _react2['default'].PropTypes.any, // value to use when you clear the control
			scrollMenuIntoView: _react2['default'].PropTypes.bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
			searchable: _react2['default'].PropTypes.bool, // whether to enable searching feature or not
			simpleValue: _react2['default'].PropTypes.bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
			style: _react2['default'].PropTypes.object, // optional style to apply to the control
			tabIndex: _react2['default'].PropTypes.string, // optional tab index of the control
			tabSelectsValue: _react2['default'].PropTypes.bool, // whether to treat tabbing out while focused to be value selection
			value: _react2['default'].PropTypes.any, // initial field value
			valueComponent: _react2['default'].PropTypes.func, // value component to render
			valueKey: _react2['default'].PropTypes.string, // path of the label value in option objects
			valueRenderer: _react2['default'].PropTypes.func, // valueRenderer: function (option) {}
			wrapperStyle: _react2['default'].PropTypes.object },

		// optional style to apply to the component wrapper
		statics: { Async: _Async2['default'], AsyncCreatable: _AsyncCreatable2['default'], Creatable: _Creatable2['default'] },

		getDefaultProps: function getDefaultProps() {
			return {
				addLabelText: 'Add "{label}"?',
				arrowRenderer: _utilsDefaultArrowRenderer2['default'],
				autosize: true,
				backspaceRemoves: true,
				backspaceToRemoveMessage: 'Press backspace to remove {label}',
				clearable: true,
				clearAllText: 'Clear all',
				clearValueText: 'Clear value',
				delimiter: ',',
				disabled: false,
				escapeClearsValue: true,
				filterOptions: _utilsDefaultFilterOptions2['default'],
				ignoreAccents: true,
				ignoreCase: true,
				inputProps: {},
				isLoading: false,
				joinValues: false,
				labelKey: 'label',
				matchPos: 'any',
				matchProp: 'any',
				menuBuffer: 0,
				menuRenderer: _utilsDefaultMenuRenderer2['default'],
				multi: false,
				noResultsText: 'No results found',
				onBlurResetsInput: true,
				onCloseResetsInput: true,
				openAfterFocus: false,
				optionComponent: _Option2['default'],
				pageSize: 5,
				placeholder: 'Select...',
				required: false,
				scrollMenuIntoView: true,
				searchable: true,
				simpleValue: false,
				tabSelectsValue: true,
				valueComponent: _Value2['default'],
				valueKey: 'value'
			};
		},

		getInitialState: function getInitialState() {
			return {
				inputValue: '',
				isFocused: false,
				isOpen: false,
				isPseudoFocused: false,
				required: false
			};
		},

		componentWillMount: function componentWillMount() {
			this._instancePrefix = 'react-select-' + (this.props.instanceId || ++instanceId) + '-';
			var valueArray = this.getValueArray(this.props.value);

			if (this.props.required) {
				this.setState({
					required: this.handleRequired(valueArray[0], this.props.multi)
				});
			}
		},

		componentDidMount: function componentDidMount() {
			if (this.props.autofocus) {
				this.focus();
			}
		},

		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var valueArray = this.getValueArray(nextProps.value, nextProps);

			if (nextProps.required) {
				this.setState({
					required: this.handleRequired(valueArray[0], nextProps.multi)
				});
			}
		},

		componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
			if (nextState.isOpen !== this.state.isOpen) {
				this.toggleTouchOutsideEvent(nextState.isOpen);
				var handler = nextState.isOpen ? nextProps.onOpen : nextProps.onClose;
				handler && handler();
			}
		},

		componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
			// focus to the selected option
			if (this.menu && this.focused && this.state.isOpen && !this.hasScrolledToOption) {
				var focusedOptionNode = _reactDom2['default'].findDOMNode(this.focused);
				var menuNode = _reactDom2['default'].findDOMNode(this.menu);
				menuNode.scrollTop = focusedOptionNode.offsetTop;
				this.hasScrolledToOption = true;
			} else if (!this.state.isOpen) {
				this.hasScrolledToOption = false;
			}

			if (this._scrollToFocusedOptionOnUpdate && this.focused && this.menu) {
				this._scrollToFocusedOptionOnUpdate = false;
				var focusedDOM = _reactDom2['default'].findDOMNode(this.focused);
				var menuDOM = _reactDom2['default'].findDOMNode(this.menu);
				var focusedRect = focusedDOM.getBoundingClientRect();
				var menuRect = menuDOM.getBoundingClientRect();
				if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
					menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
				}
			}
			if (this.props.scrollMenuIntoView && this.menuContainer) {
				var menuContainerRect = this.menuContainer.getBoundingClientRect();
				if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
					window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
				}
			}
			if (prevProps.disabled !== this.props.disabled) {
				this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
				this.closeMenu();
			}
		},

		componentWillUnmount: function componentWillUnmount() {
			document.removeEventListener('touchstart', this.handleTouchOutside);
		},

		toggleTouchOutsideEvent: function toggleTouchOutsideEvent(enabled) {
			if (enabled) {
				document.addEventListener('touchstart', this.handleTouchOutside);
			} else {
				document.removeEventListener('touchstart', this.handleTouchOutside);
			}
		},

		handleTouchOutside: function handleTouchOutside(event) {
			// handle touch outside on ios to dismiss menu
			if (this.wrapper && !this.wrapper.contains(event.target)) {
				this.closeMenu();
			}
		},

		focus: function focus() {
			if (!this.input) return;
			this.input.focus();

			if (this.props.openAfterFocus) {
				this.setState({
					isOpen: true
				});
			}
		},

		blurInput: function blurInput() {
			if (!this.input) return;
			this.input.blur();
		},

		handleTouchMove: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		},

		handleTouchStart: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		},

		handleTouchEnd: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.handleMouseDown(event);
		},

		handleTouchEndClearValue: function handleTouchEndClearValue(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Clear the value
			this.clearValue(event);
		},

		handleMouseDown: function handleMouseDown(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			if (event.target.tagName === 'INPUT') {
				return;
			}

			// prevent default event handlers
			event.stopPropagation();
			event.preventDefault();

			// for the non-searchable select, toggle the menu
			if (!this.props.searchable) {
				this.focus();
				return this.setState({
					isOpen: !this.state.isOpen
				});
			}

			if (this.state.isFocused) {
				// On iOS, we can get into a state where we think the input is focused but it isn't really,
				// since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
				// Call focus() again here to be safe.
				this.focus();

				var input = this.input;
				if (typeof input.getInput === 'function') {
					// Get the actual DOM input if the ref is an <AutosizeInput /> component
					input = input.getInput();
				}

				// clears the value so that the cursor will be at the end of input when the component re-renders
				input.value = '';

				// if the input is focused, ensure the menu is open
				this.setState({
					isOpen: true,
					isPseudoFocused: false
				});
			} else {
				// otherwise, focus the input and open the menu
				this._openAfterFocus = true;
				this.focus();
			}
		},

		handleMouseDownOnArrow: function handleMouseDownOnArrow(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			// If the menu isn't open, let the event bubble to the main handleMouseDown
			if (!this.state.isOpen) {
				return;
			}
			// prevent default event handlers
			event.stopPropagation();
			event.preventDefault();
			// close the menu
			this.closeMenu();
		},

		handleMouseDownOnMenu: function handleMouseDownOnMenu(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();

			this._openAfterFocus = true;
			this.focus();
		},

		closeMenu: function closeMenu() {
			if (this.props.onCloseResetsInput) {
				this.setState({
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi,
					inputValue: ''
				});
			} else {
				this.setState({
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi,
					inputValue: this.state.inputValue
				});
			}
			this.hasScrolledToOption = false;
		},

		handleInputFocus: function handleInputFocus(event) {
			if (this.props.disabled) return;
			var isOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
			if (this.props.onFocus) {
				this.props.onFocus(event);
			}
			this.setState({
				isFocused: true,
				isOpen: isOpen
			});
			this._openAfterFocus = false;
		},

		handleInputBlur: function handleInputBlur(event) {
			// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
			if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
				this.focus();
				return;
			}

			if (this.props.onBlur) {
				this.props.onBlur(event);
			}
			var onBlurredState = {
				isFocused: false,
				isOpen: false,
				isPseudoFocused: false
			};
			if (this.props.onBlurResetsInput) {
				onBlurredState.inputValue = '';
			}
			this.setState(onBlurredState);
		},

		handleInputChange: function handleInputChange(event) {
			var newInputValue = event.target.value;

			if (this.state.inputValue !== event.target.value && this.props.onInputChange) {
				var nextState = this.props.onInputChange(newInputValue);
				// Note: != used deliberately here to catch undefined and null
				if (nextState != null && typeof nextState !== 'object') {
					newInputValue = '' + nextState;
				}
			}

			this.setState({
				isOpen: true,
				isPseudoFocused: false,
				inputValue: newInputValue
			});
		},

		handleKeyDown: function handleKeyDown(event) {
			if (this.props.disabled) return;

			if (typeof this.props.onInputKeyDown === 'function') {
				this.props.onInputKeyDown(event);
				if (event.defaultPrevented) {
					return;
				}
			}

			switch (event.keyCode) {
				case 8:
					// backspace
					if (!this.state.inputValue && this.props.backspaceRemoves) {
						event.preventDefault();
						this.popValue();
					}
					return;
				case 9:
					// tab
					if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
						return;
					}
					this.selectFocusedOption();
					return;
				case 13:
					// enter
					if (!this.state.isOpen) return;
					event.stopPropagation();
					this.selectFocusedOption();
					break;
				case 27:
					// escape
					if (this.state.isOpen) {
						this.closeMenu();
						event.stopPropagation();
					} else if (this.props.clearable && this.props.escapeClearsValue) {
						this.clearValue(event);
						event.stopPropagation();
					}
					break;
				case 38:
					// up
					this.focusPreviousOption();
					break;
				case 40:
					// down
					this.focusNextOption();
					break;
				case 33:
					// page up
					this.focusPageUpOption();
					break;
				case 34:
					// page down
					this.focusPageDownOption();
					break;
				case 35:
					// end key
					if (event.shiftKey) {
						return;
					}
					this.focusEndOption();
					break;
				case 36:
					// home key
					if (event.shiftKey) {
						return;
					}
					this.focusStartOption();
					break;
				default:
					return;
			}
			event.preventDefault();
		},

		handleValueClick: function handleValueClick(option, event) {
			if (!this.props.onValueClick) return;
			this.props.onValueClick(option, event);
		},

		handleMenuScroll: function handleMenuScroll(event) {
			if (!this.props.onMenuScrollToBottom) return;
			var target = event.target;

			if (target.scrollHeight > target.offsetHeight && !(target.scrollHeight - target.offsetHeight - target.scrollTop)) {
				this.props.onMenuScrollToBottom();
			}
		},

		handleRequired: function handleRequired(value, multi) {
			if (!value) return true;
			return multi ? value.length === 0 : Object.keys(value).length === 0;
		},

		getOptionLabel: function getOptionLabel(op) {
			return op[this.props.labelKey];
		},

		/**
	  * Turns a value into an array from the given options
	  * @param	{String|Number|Array}	value		- the value of the select input
	  * @param	{Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
	  * @returns	{Array}	the value of the select represented in an array
	  */
		getValueArray: function getValueArray(value, nextProps) {
			var _this = this;

			/** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
			var props = typeof nextProps === 'object' ? nextProps : this.props;
			if (props.multi) {
				if (typeof value === 'string') value = value.split(props.delimiter);
				if (!Array.isArray(value)) {
					if (value === null || value === undefined) return [];
					value = [value];
				}
				return value.map(function (value) {
					return _this.expandValue(value, props);
				}).filter(function (i) {
					return i;
				});
			}
			var expandedValue = this.expandValue(value, props);
			return expandedValue ? [expandedValue] : [];
		},

		/**
	  * Retrieve a value from the given options and valueKey
	  * @param	{String|Number|Array}	value	- the selected value(s)
	  * @param	{Object}		props	- the Select component's props (or nextProps)
	  */
		expandValue: function expandValue(value, props) {
			var valueType = typeof value;
			if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
			var options = props.options;
			var valueKey = props.valueKey;

			if (!options) return;
			for (var i = 0; i < options.length; i++) {
				if (options[i][valueKey] === value) return options[i];
			}
		},

		setValue: function setValue(value) {
			var _this2 = this;

			if (this.props.autoBlur) {
				this.blurInput();
			}
			if (!this.props.onChange) return;
			if (this.props.required) {
				var required = this.handleRequired(value, this.props.multi);
				this.setState({ required: required });
			}
			if (this.props.simpleValue && value) {
				value = this.props.multi ? value.map(function (i) {
					return i[_this2.props.valueKey];
				}).join(this.props.delimiter) : value[this.props.valueKey];
			}
			this.props.onChange(value);
		},

		selectValue: function selectValue(value) {
			var _this3 = this;

			//NOTE: update value in the callback to make sure the input value is empty so that there are no styling issues (Chrome had issue otherwise)
			this.hasScrolledToOption = false;
			if (this.props.multi) {
				this.setState({
					inputValue: '',
					focusedIndex: null
				}, function () {
					_this3.addValue(value);
				});
			} else {
				this.setState({
					isOpen: false,
					inputValue: '',
					isPseudoFocused: this.state.isFocused
				}, function () {
					_this3.setValue(value);
				});
			}
		},

		addValue: function addValue(value) {
			var valueArray = this.getValueArray(this.props.value);
			this.setValue(valueArray.concat(value));
		},

		popValue: function popValue() {
			var valueArray = this.getValueArray(this.props.value);
			if (!valueArray.length) return;
			if (valueArray[valueArray.length - 1].clearableValue === false) return;
			this.setValue(valueArray.slice(0, valueArray.length - 1));
		},

		removeValue: function removeValue(value) {
			var valueArray = this.getValueArray(this.props.value);
			this.setValue(valueArray.filter(function (i) {
				return i !== value;
			}));
			this.focus();
		},

		clearValue: function clearValue(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, ignore it.
			if (event && event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();
			this.setValue(this.getResetValue());
			this.setState({
				isOpen: false,
				inputValue: ''
			}, this.focus);
		},

		getResetValue: function getResetValue() {
			if (this.props.resetValue !== undefined) {
				return this.props.resetValue;
			} else if (this.props.multi) {
				return [];
			} else {
				return null;
			}
		},

		focusOption: function focusOption(option) {
			this.setState({
				focusedOption: option
			});
		},

		focusNextOption: function focusNextOption() {
			this.focusAdjacentOption('next');
		},

		focusPreviousOption: function focusPreviousOption() {
			this.focusAdjacentOption('previous');
		},

		focusPageUpOption: function focusPageUpOption() {
			this.focusAdjacentOption('page_up');
		},

		focusPageDownOption: function focusPageDownOption() {
			this.focusAdjacentOption('page_down');
		},

		focusStartOption: function focusStartOption() {
			this.focusAdjacentOption('start');
		},

		focusEndOption: function focusEndOption() {
			this.focusAdjacentOption('end');
		},

		focusAdjacentOption: function focusAdjacentOption(dir) {
			var options = this._visibleOptions.map(function (option, index) {
				return { option: option, index: index };
			}).filter(function (option) {
				return !option.option.disabled;
			});
			this._scrollToFocusedOptionOnUpdate = true;
			if (!this.state.isOpen) {
				this.setState({
					isOpen: true,
					inputValue: '',
					focusedOption: this._focusedOption || options[dir === 'next' ? 0 : options.length - 1].option
				});
				return;
			}
			if (!options.length) return;
			var focusedIndex = -1;
			for (var i = 0; i < options.length; i++) {
				if (this._focusedOption === options[i].option) {
					focusedIndex = i;
					break;
				}
			}
			if (dir === 'next' && focusedIndex !== -1) {
				focusedIndex = (focusedIndex + 1) % options.length;
			} else if (dir === 'previous') {
				if (focusedIndex > 0) {
					focusedIndex = focusedIndex - 1;
				} else {
					focusedIndex = options.length - 1;
				}
			} else if (dir === 'start') {
				focusedIndex = 0;
			} else if (dir === 'end') {
				focusedIndex = options.length - 1;
			} else if (dir === 'page_up') {
				var potentialIndex = focusedIndex - this.props.pageSize;
				if (potentialIndex < 0) {
					focusedIndex = 0;
				} else {
					focusedIndex = potentialIndex;
				}
			} else if (dir === 'page_down') {
				var potentialIndex = focusedIndex + this.props.pageSize;
				if (potentialIndex > options.length - 1) {
					focusedIndex = options.length - 1;
				} else {
					focusedIndex = potentialIndex;
				}
			}

			if (focusedIndex === -1) {
				focusedIndex = 0;
			}

			this.setState({
				focusedIndex: options[focusedIndex].index,
				focusedOption: options[focusedIndex].option
			});
		},

		getFocusedOption: function getFocusedOption() {
			return this._focusedOption;
		},

		getInputValue: function getInputValue() {
			return this.state.inputValue;
		},

		selectFocusedOption: function selectFocusedOption() {
			if (this._focusedOption) {
				return this.selectValue(this._focusedOption);
			}
		},

		renderLoading: function renderLoading() {
			if (!this.props.isLoading) return;
			return _react2['default'].createElement(
				'span',
				{ className: 'Select-loading-zone', 'aria-hidden': 'true' },
				_react2['default'].createElement('span', { className: 'Select-loading' })
			);
		},

		renderValue: function renderValue(valueArray, isOpen) {
			var _this4 = this;

			var renderLabel = this.props.valueRenderer || this.getOptionLabel;
			var ValueComponent = this.props.valueComponent;
			if (!valueArray.length) {
				return !this.state.inputValue ? _react2['default'].createElement(
					'div',
					{ className: 'Select-placeholder' },
					this.props.placeholder
				) : null;
			}
			var onClick = this.props.onValueClick ? this.handleValueClick : null;
			if (this.props.multi) {
				return valueArray.map(function (value, i) {
					return _react2['default'].createElement(
						ValueComponent,
						{
							id: _this4._instancePrefix + '-value-' + i,
							instancePrefix: _this4._instancePrefix,
							disabled: _this4.props.disabled || value.clearableValue === false,
							key: 'value-' + i + '-' + value[_this4.props.valueKey],
							onClick: onClick,
							onRemove: _this4.removeValue,
							value: value
						},
						renderLabel(value, i),
						_react2['default'].createElement(
							'span',
							{ className: 'Select-aria-only' },
							' '
						)
					);
				});
			} else if (!this.state.inputValue) {
				if (isOpen) onClick = null;
				return _react2['default'].createElement(
					ValueComponent,
					{
						id: this._instancePrefix + '-value-item',
						disabled: this.props.disabled,
						instancePrefix: this._instancePrefix,
						onClick: onClick,
						value: valueArray[0]
					},
					renderLabel(valueArray[0])
				);
			}
		},

		renderInput: function renderInput(valueArray, focusedOptionIndex) {
			var _this5 = this;

			if (this.props.inputRenderer) {
				return this.props.inputRenderer();
			} else {
				var _classNames;

				var className = (0, _classnames2['default'])('Select-input', this.props.inputProps.className);
				var isOpen = !!this.state.isOpen;

				var ariaOwns = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, this._instancePrefix + '-list', isOpen), _defineProperty(_classNames, this._instancePrefix + '-backspace-remove-message', this.props.multi && !this.props.disabled && this.state.isFocused && !this.state.inputValue), _classNames));

				// TODO: Check how this project includes Object.assign()
				var inputProps = _extends({}, this.props.inputProps, {
					role: 'combobox',
					'aria-expanded': '' + isOpen,
					'aria-owns': ariaOwns,
					'aria-haspopup': '' + isOpen,
					'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
					'aria-labelledby': this.props['aria-labelledby'],
					'aria-label': this.props['aria-label'],
					className: className,
					tabIndex: this.props.tabIndex,
					onBlur: this.handleInputBlur,
					onChange: this.handleInputChange,
					onFocus: this.handleInputFocus,
					ref: function ref(_ref) {
						return _this5.input = _ref;
					},
					required: this.state.required,
					value: this.state.inputValue
				});

				if (this.props.disabled || !this.props.searchable) {
					var _props$inputProps = this.props.inputProps;
					var inputClassName = _props$inputProps.inputClassName;

					var divProps = _objectWithoutProperties(_props$inputProps, ['inputClassName']);

					return _react2['default'].createElement('div', _extends({}, divProps, {
						role: 'combobox',
						'aria-expanded': isOpen,
						'aria-owns': isOpen ? this._instancePrefix + '-list' : this._instancePrefix + '-value',
						'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
						className: className,
						tabIndex: this.props.tabIndex || 0,
						onBlur: this.handleInputBlur,
						onFocus: this.handleInputFocus,
						ref: function (ref) {
							return _this5.input = ref;
						},
						'aria-readonly': '' + !!this.props.disabled,
						style: { border: 0, width: 1, display: 'inline-block' } }));
				}

				if (this.props.autosize) {
					return _react2['default'].createElement(_reactInputAutosize2['default'], _extends({}, inputProps, { minWidth: '5px' }));
				}
				return _react2['default'].createElement(
					'div',
					{ className: className },
					_react2['default'].createElement('input', inputProps)
				);
			}
		},

		renderClear: function renderClear() {
			if (!this.props.clearable || !this.props.value || this.props.value === 0 || this.props.multi && !this.props.value.length || this.props.disabled || this.props.isLoading) return;
			return _react2['default'].createElement(
				'span',
				{ className: 'Select-clear-zone', title: this.props.multi ? this.props.clearAllText : this.props.clearValueText,
					'aria-label': this.props.multi ? this.props.clearAllText : this.props.clearValueText,
					onMouseDown: this.clearValue,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove,
					onTouchEnd: this.handleTouchEndClearValue
				},
				_react2['default'].createElement('span', { className: 'Select-clear', dangerouslySetInnerHTML: { __html: '&times;' } })
			);
		},

		renderArrow: function renderArrow() {
			var onMouseDown = this.handleMouseDownOnArrow;
			var arrow = this.props.arrowRenderer({ onMouseDown: onMouseDown });

			return _react2['default'].createElement(
				'span',
				{
					className: 'Select-arrow-zone',
					onMouseDown: onMouseDown
				},
				arrow
			);
		},

		filterOptions: function filterOptions(excludeOptions) {
			var filterValue = this.state.inputValue;
			var options = this.props.options || [];
			if (this.props.filterOptions) {
				// Maintain backwards compatibility with boolean attribute
				var filterOptions = typeof this.props.filterOptions === 'function' ? this.props.filterOptions : _utilsDefaultFilterOptions2['default'];

				return filterOptions(options, filterValue, excludeOptions, {
					filterOption: this.props.filterOption,
					ignoreAccents: this.props.ignoreAccents,
					ignoreCase: this.props.ignoreCase,
					labelKey: this.props.labelKey,
					matchPos: this.props.matchPos,
					matchProp: this.props.matchProp,
					valueKey: this.props.valueKey
				});
			} else {
				return options;
			}
		},

		onOptionRef: function onOptionRef(ref, isFocused) {
			if (isFocused) {
				this.focused = ref;
			}
		},

		renderMenu: function renderMenu(options, valueArray, focusedOption) {
			if (options && options.length) {
				return this.props.menuRenderer({
					focusedOption: focusedOption,
					focusOption: this.focusOption,
					instancePrefix: this._instancePrefix,
					labelKey: this.props.labelKey,
					onFocus: this.focusOption,
					onSelect: this.selectValue,
					optionClassName: this.props.optionClassName,
					optionComponent: this.props.optionComponent,
					optionRenderer: this.props.optionRenderer || this.getOptionLabel,
					options: options,
					selectValue: this.selectValue,
					valueArray: valueArray,
					valueKey: this.props.valueKey,
					onOptionRef: this.onOptionRef
				});
			} else if (this.props.noResultsText) {
				return _react2['default'].createElement(
					'div',
					{ className: 'Select-noresults' },
					this.props.noResultsText
				);
			} else {
				return null;
			}
		},

		renderHiddenField: function renderHiddenField(valueArray) {
			var _this6 = this;

			if (!this.props.name) return;
			if (this.props.joinValues) {
				var value = valueArray.map(function (i) {
					return stringifyValue(i[_this6.props.valueKey]);
				}).join(this.props.delimiter);
				return _react2['default'].createElement('input', {
					type: 'hidden',
					ref: function (ref) {
						return _this6.value = ref;
					},
					name: this.props.name,
					value: value,
					disabled: this.props.disabled });
			}
			return valueArray.map(function (item, index) {
				return _react2['default'].createElement('input', { key: 'hidden.' + index,
					type: 'hidden',
					ref: 'value' + index,
					name: _this6.props.name,
					value: stringifyValue(item[_this6.props.valueKey]),
					disabled: _this6.props.disabled });
			});
		},

		getFocusableOptionIndex: function getFocusableOptionIndex(selectedOption) {
			var options = this._visibleOptions;
			if (!options.length) return null;

			var focusedOption = this.state.focusedOption || selectedOption;
			if (focusedOption && !focusedOption.disabled) {
				var focusedOptionIndex = options.indexOf(focusedOption);
				if (focusedOptionIndex !== -1) {
					return focusedOptionIndex;
				}
			}

			for (var i = 0; i < options.length; i++) {
				if (!options[i].disabled) return i;
			}
			return null;
		},

		renderOuter: function renderOuter(options, valueArray, focusedOption) {
			var _this7 = this;

			var menu = this.renderMenu(options, valueArray, focusedOption);
			if (!menu) {
				return null;
			}

			return _react2['default'].createElement(
				'div',
				{ ref: function (ref) {
						return _this7.menuContainer = ref;
					}, className: 'Select-menu-outer', style: this.props.menuContainerStyle },
				_react2['default'].createElement(
					'div',
					{ ref: function (ref) {
							return _this7.menu = ref;
						}, role: 'listbox', className: 'Select-menu', id: this._instancePrefix + '-list',
						style: this.props.menuStyle,
						onScroll: this.handleMenuScroll,
						onMouseDown: this.handleMouseDownOnMenu },
					menu
				)
			);
		},

		render: function render() {
			var _this8 = this;

			var valueArray = this.getValueArray(this.props.value);
			var options = this._visibleOptions = this.filterOptions(this.props.multi ? this.getValueArray(this.props.value) : null);
			var isOpen = this.state.isOpen;
			if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
			var focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

			var focusedOption = null;
			if (focusedOptionIndex !== null) {
				focusedOption = this._focusedOption = options[focusedOptionIndex];
			} else {
				focusedOption = this._focusedOption = null;
			}
			var className = (0, _classnames2['default'])('Select', this.props.className, {
				'Select--multi': this.props.multi,
				'Select--single': !this.props.multi,
				'is-disabled': this.props.disabled,
				'is-focused': this.state.isFocused,
				'is-loading': this.props.isLoading,
				'is-open': isOpen,
				'is-pseudo-focused': this.state.isPseudoFocused,
				'is-searchable': this.props.searchable,
				'has-value': valueArray.length
			});

			var removeMessage = null;
			if (this.props.multi && !this.props.disabled && valueArray.length && !this.state.inputValue && this.state.isFocused && this.props.backspaceRemoves) {
				removeMessage = _react2['default'].createElement(
					'span',
					{ id: this._instancePrefix + '-backspace-remove-message', className: 'Select-aria-only', 'aria-live': 'assertive' },
					this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey])
				);
			}

			return _react2['default'].createElement(
				'div',
				{ ref: function (ref) {
						return _this8.wrapper = ref;
					},
					className: className,
					style: this.props.wrapperStyle },
				this.renderHiddenField(valueArray),
				_react2['default'].createElement(
					'div',
					{ ref: function (ref) {
							return _this8.control = ref;
						},
						className: 'Select-control',
						style: this.props.style,
						onKeyDown: this.handleKeyDown,
						onMouseDown: this.handleMouseDown,
						onTouchEnd: this.handleTouchEnd,
						onTouchStart: this.handleTouchStart,
						onTouchMove: this.handleTouchMove
					},
					_react2['default'].createElement(
						'span',
						{ className: 'Select-multi-value-wrapper', id: this._instancePrefix + '-value' },
						this.renderValue(valueArray, isOpen),
						this.renderInput(valueArray, focusedOptionIndex)
					),
					removeMessage,
					this.renderLoading(),
					this.renderClear(),
					this.renderArrow()
				),
				isOpen ? this.renderOuter(options, !this.props.multi ? valueArray : null, focusedOption) : null
			);
		}

	});

	exports['default'] = Select;
	module.exports = exports['default'];

/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {"use strict";

	var React = __webpack_require__(1);
	// var _ = require('underscore');
	// var lodash = require('lodash');
	// var actions = require('../../modules/actions');
	// var Select = require('react-select');

	module.exports = React.createClass({
	  displayName: "exports",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      onChange: function onChange(res) {
	        console.log(res);
	      }
	    };
	  },
	  render: function render() {
	    var self = this;
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "label",
	        { className: "pt-label pt-inline col-xs" },
	        React.createElement(
	          "span",
	          null,
	          this.props.label
	        ),
	        React.createElement("input", { className: "pt-input pt-fill", onChange: this.props.onChange, value: this.props.value })
	      )
	    );
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _stripDiacritics = __webpack_require__(27);

	var _stripDiacritics2 = _interopRequireDefault(_stripDiacritics);

	function filterOptions(options, filterValue, excludeOptions, props) {
		var _this = this;

		if (props.ignoreAccents) {
			filterValue = (0, _stripDiacritics2['default'])(filterValue);
		}

		if (props.ignoreCase) {
			filterValue = filterValue.toLowerCase();
		}

		if (excludeOptions) excludeOptions = excludeOptions.map(function (i) {
			return i[props.valueKey];
		});

		return options.filter(function (option) {
			if (excludeOptions && excludeOptions.indexOf(option[props.valueKey]) > -1) return false;
			if (props.filterOption) return props.filterOption.call(_this, option, filterValue);
			if (!filterValue) return true;
			var valueTest = String(option[props.valueKey]);
			var labelTest = String(option[props.labelKey]);
			if (props.ignoreAccents) {
				if (props.matchProp !== 'label') valueTest = (0, _stripDiacritics2['default'])(valueTest);
				if (props.matchProp !== 'value') labelTest = (0, _stripDiacritics2['default'])(labelTest);
			}
			if (props.ignoreCase) {
				if (props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
				if (props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
			}
			return props.matchPos === 'start' ? props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
		});
	}

	module.exports = filterOptions;

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _classnames = __webpack_require__(7);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function menuRenderer(_ref) {
		var focusedOption = _ref.focusedOption;
		var instancePrefix = _ref.instancePrefix;
		var labelKey = _ref.labelKey;
		var onFocus = _ref.onFocus;
		var onSelect = _ref.onSelect;
		var optionClassName = _ref.optionClassName;
		var optionComponent = _ref.optionComponent;
		var optionRenderer = _ref.optionRenderer;
		var options = _ref.options;
		var valueArray = _ref.valueArray;
		var valueKey = _ref.valueKey;
		var onOptionRef = _ref.onOptionRef;

		var Option = optionComponent;

		return options.map(function (option, i) {
			var isSelected = valueArray && valueArray.indexOf(option) > -1;
			var isFocused = option === focusedOption;
			var optionClass = (0, _classnames2['default'])(optionClassName, {
				'Select-option': true,
				'is-selected': isSelected,
				'is-focused': isFocused,
				'is-disabled': option.disabled
			});

			return _react2['default'].createElement(
				Option,
				{
					className: optionClass,
					instancePrefix: instancePrefix,
					isDisabled: option.disabled,
					isFocused: isFocused,
					isSelected: isSelected,
					key: 'option-' + i + '-' + option[valueKey],
					onFocus: onFocus,
					onSelect: onSelect,
					option: option,
					optionIndex: i,
					ref: function (ref) {
						onOptionRef(ref, isFocused);
					}
				},
				optionRenderer(option, i)
			);
		});
	}

	module.exports = menuRenderer;

/***/ },

/***/ 27:
/***/ function(module, exports) {

	'use strict';

	var map = [{ 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g }, { 'base': 'AA', 'letters': /[\uA732]/g }, { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g }, { 'base': 'AO', 'letters': /[\uA734]/g }, { 'base': 'AU', 'letters': /[\uA736]/g }, { 'base': 'AV', 'letters': /[\uA738\uA73A]/g }, { 'base': 'AY', 'letters': /[\uA73C]/g }, { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g }, { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g }, { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g }, { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g }, { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g }, { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g }, { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g }, { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g }, { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g }, { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g }, { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g }, { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g }, { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g }, { 'base': 'LJ', 'letters': /[\u01C7]/g }, { 'base': 'Lj', 'letters': /[\u01C8]/g }, { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g }, { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g }, { 'base': 'NJ', 'letters': /[\u01CA]/g }, { 'base': 'Nj', 'letters': /[\u01CB]/g }, { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g }, { 'base': 'OI', 'letters': /[\u01A2]/g }, { 'base': 'OO', 'letters': /[\uA74E]/g }, { 'base': 'OU', 'letters': /[\u0222]/g }, { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g }, { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g }, { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g }, { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g }, { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g }, { 'base': 'TZ', 'letters': /[\uA728]/g }, { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g }, { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g }, { 'base': 'VY', 'letters': /[\uA760]/g }, { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g }, { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g }, { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g }, { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g }, { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g }, { 'base': 'aa', 'letters': /[\uA733]/g }, { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g }, { 'base': 'ao', 'letters': /[\uA735]/g }, { 'base': 'au', 'letters': /[\uA737]/g }, { 'base': 'av', 'letters': /[\uA739\uA73B]/g }, { 'base': 'ay', 'letters': /[\uA73D]/g }, { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g }, { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g }, { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g }, { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g }, { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g }, { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g }, { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g }, { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g }, { 'base': 'hv', 'letters': /[\u0195]/g }, { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g }, { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g }, { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g }, { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g }, { 'base': 'lj', 'letters': /[\u01C9]/g }, { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g }, { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g }, { 'base': 'nj', 'letters': /[\u01CC]/g }, { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g }, { 'base': 'oi', 'letters': /[\u01A3]/g }, { 'base': 'ou', 'letters': /[\u0223]/g }, { 'base': 'oo', 'letters': /[\uA74F]/g }, { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g }, { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g }, { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g }, { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g }, { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g }, { 'base': 'tz', 'letters': /[\uA729]/g }, { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g }, { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g }, { 'base': 'vy', 'letters': /[\uA761]/g }, { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g }, { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g }, { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }, { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }];

	module.exports = function stripDiacritics(str) {
		for (var i = 0; i < map.length; i++) {
			str = str.replace(map[i].letters, map[i].base);
		}
		return str;
	};

/***/ },

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.capitalize = capitalize;
	exports.callbackName = callbackName;
	exports.isObject = isObject;
	exports.extend = extend;
	exports.isFunction = isFunction;
	exports.object = object;
	exports.isArguments = isArguments;
	exports.throwIf = throwIf;

	function capitalize(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function callbackName(string, prefix) {
	    prefix = prefix || "on";
	    return prefix + exports.capitalize(string);
	}

	/*
	 * isObject, extend, isFunction, isArguments are taken from undescore/lodash in
	 * order to remove the dependency
	 */

	function isObject(obj) {
	    var type = typeof obj;
	    return type === "function" || type === "object" && !!obj;
	}

	function extend(obj) {
	    if (!isObject(obj)) {
	        return obj;
	    }
	    var source, prop;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	        source = arguments[i];
	        for (prop in source) {
	            if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
	                var propertyDescriptor = Object.getOwnPropertyDescriptor(source, prop);
	                Object.defineProperty(obj, prop, propertyDescriptor);
	            } else {
	                obj[prop] = source[prop];
	            }
	        }
	    }
	    return obj;
	}

	function isFunction(value) {
	    return typeof value === "function";
	}

	exports.EventEmitter = __webpack_require__(272);

	exports.nextTick = function (callback) {
	    setTimeout(callback, 0);
	};

	function object(keys, vals) {
	    var o = {},
	        i = 0;
	    for (; i < keys.length; i++) {
	        o[keys[i]] = vals[i];
	    }
	    return o;
	}

	function isArguments(value) {
	    return typeof value === "object" && "callee" in value && typeof value.length === "number";
	}

	function throwIf(val, msg) {
	    if (val) {
	        throw Error(msg || val);
	    }
	}

/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(316);

	Reflux.connect = __webpack_require__(318);

	Reflux.connectFilter = __webpack_require__(319);

	Reflux.ListenerMixin = __webpack_require__(164);

	Reflux.listenTo = __webpack_require__(320);

	Reflux.listenToMany = __webpack_require__(321);

	module.exports = Reflux;


/***/ },

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);

	var sizerStyle = { position: 'absolute', top: 0, left: 0, visibility: 'hidden', height: 0, overflow: 'scroll', whiteSpace: 'pre' };

	var AutosizeInput = React.createClass({
		displayName: 'AutosizeInput',

		propTypes: {
			className: React.PropTypes.string, // className for the outer element
			defaultValue: React.PropTypes.any, // default field value
			inputClassName: React.PropTypes.string, // className for the input element
			inputStyle: React.PropTypes.object, // css styles for the input element
			minWidth: React.PropTypes.oneOfType([// minimum width for input element
			React.PropTypes.number, React.PropTypes.string]),
			onChange: React.PropTypes.func, // onChange handler: function(newValue) {}
			placeholder: React.PropTypes.string, // placeholder text
			placeholderIsMinWidth: React.PropTypes.bool, // don't collapse size to less than the placeholder
			style: React.PropTypes.object, // css styles for the outer element
			value: React.PropTypes.any },
		// field value
		getDefaultProps: function getDefaultProps() {
			return {
				minWidth: 1
			};
		},
		getInitialState: function getInitialState() {
			return {
				inputWidth: this.props.minWidth
			};
		},
		componentDidMount: function componentDidMount() {
			this.copyInputStyles();
			this.updateInputWidth();
		},
		componentDidUpdate: function componentDidUpdate() {
			this.updateInputWidth();
		},
		copyInputStyles: function copyInputStyles() {
			if (!this.isMounted() || !window.getComputedStyle) {
				return;
			}
			var inputStyle = window.getComputedStyle(this.refs.input);
			if (!inputStyle) {
				return;
			}
			var widthNode = this.refs.sizer;
			widthNode.style.fontSize = inputStyle.fontSize;
			widthNode.style.fontFamily = inputStyle.fontFamily;
			widthNode.style.fontWeight = inputStyle.fontWeight;
			widthNode.style.fontStyle = inputStyle.fontStyle;
			widthNode.style.letterSpacing = inputStyle.letterSpacing;
			if (this.props.placeholder) {
				var placeholderNode = this.refs.placeholderSizer;
				placeholderNode.style.fontSize = inputStyle.fontSize;
				placeholderNode.style.fontFamily = inputStyle.fontFamily;
				placeholderNode.style.fontWeight = inputStyle.fontWeight;
				placeholderNode.style.fontStyle = inputStyle.fontStyle;
				placeholderNode.style.letterSpacing = inputStyle.letterSpacing;
			}
		},
		updateInputWidth: function updateInputWidth() {
			if (!this.isMounted() || typeof this.refs.sizer.scrollWidth === 'undefined') {
				return;
			}
			var newInputWidth = undefined;
			if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
				newInputWidth = Math.max(this.refs.sizer.scrollWidth, this.refs.placeholderSizer.scrollWidth) + 2;
			} else {
				newInputWidth = this.refs.sizer.scrollWidth + 2;
			}
			if (newInputWidth < this.props.minWidth) {
				newInputWidth = this.props.minWidth;
			}
			if (newInputWidth !== this.state.inputWidth) {
				this.setState({
					inputWidth: newInputWidth
				});
			}
		},
		getInput: function getInput() {
			return this.refs.input;
		},
		focus: function focus() {
			this.refs.input.focus();
		},
		blur: function blur() {
			this.refs.input.blur();
		},
		select: function select() {
			this.refs.input.select();
		},
		render: function render() {
			var sizerValue = this.props.defaultValue || this.props.value || '';
			var wrapperStyle = this.props.style || {};
			if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';
			var inputStyle = _extends({}, this.props.inputStyle);
			inputStyle.width = this.state.inputWidth + 'px';
			inputStyle.boxSizing = 'content-box';
			var inputProps = _extends({}, this.props);
			inputProps.className = this.props.inputClassName;
			inputProps.style = inputStyle;
			// ensure props meant for `AutosizeInput` don't end up on the `input`
			delete inputProps.inputClassName;
			delete inputProps.inputStyle;
			delete inputProps.minWidth;
			delete inputProps.placeholderIsMinWidth;
			return React.createElement(
				'div',
				{ className: this.props.className, style: wrapperStyle },
				React.createElement('input', _extends({}, inputProps, { ref: 'input' })),
				React.createElement(
					'div',
					{ ref: 'sizer', style: sizerStyle },
					sizerValue
				),
				this.props.placeholder ? React.createElement(
					'div',
					{ ref: 'placeholderSizer', style: sizerStyle },
					this.props.placeholder
				) : null
			);
		}
	});

	module.exports = AutosizeInput;

/***/ },

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Select = __webpack_require__(3);

	var _Select2 = _interopRequireDefault(_Select);

	var _utilsStripDiacritics = __webpack_require__(27);

	var _utilsStripDiacritics2 = _interopRequireDefault(_utilsStripDiacritics);

	var propTypes = {
		autoload: _react2['default'].PropTypes.bool.isRequired, // automatically call the `loadOptions` prop on-mount; defaults to true
		cache: _react2['default'].PropTypes.any, // object to use to cache results; set to null/false to disable caching
		children: _react2['default'].PropTypes.func.isRequired, // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
		ignoreAccents: _react2['default'].PropTypes.bool, // strip diacritics when filtering; defaults to true
		ignoreCase: _react2['default'].PropTypes.bool, // perform case-insensitive filtering; defaults to true
		loadingPlaceholder: _react.PropTypes.string.isRequired, // replaces the placeholder while options are loading
		loadOptions: _react2['default'].PropTypes.func.isRequired, // callback to load options asynchronously; (inputValue: string, callback: Function): ?Promise
		options: _react.PropTypes.array.isRequired, // array of options
		placeholder: _react2['default'].PropTypes.oneOfType([// field placeholder, displayed when there's no value (shared with Select)
		_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]),
		searchPromptText: _react2['default'].PropTypes.oneOfType([// label to prompt for search input
		_react2['default'].PropTypes.string, _react2['default'].PropTypes.node])
	};

	var defaultProps = {
		autoload: true,
		cache: {},
		children: defaultChildren,
		ignoreAccents: true,
		ignoreCase: true,
		loadingPlaceholder: 'Loading...',
		options: [],
		searchPromptText: 'Type to search'
	};

	var Async = (function (_Component) {
		_inherits(Async, _Component);

		function Async(props, context) {
			_classCallCheck(this, Async);

			_get(Object.getPrototypeOf(Async.prototype), 'constructor', this).call(this, props, context);

			this.state = {
				isLoading: false,
				options: props.options
			};

			this._onInputChange = this._onInputChange.bind(this);
		}

		_createClass(Async, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var autoload = this.props.autoload;

				if (autoload) {
					this.loadOptions('');
				}
			}
		}, {
			key: 'componentWillUpdate',
			value: function componentWillUpdate(nextProps, nextState) {
				var _this = this;

				var propertiesToSync = ['options'];
				propertiesToSync.forEach(function (prop) {
					if (_this.props[prop] !== nextProps[prop]) {
						_this.setState(_defineProperty({}, prop, nextProps[prop]));
					}
				});
			}
		}, {
			key: 'loadOptions',
			value: function loadOptions(inputValue) {
				var _this2 = this;

				var _props = this.props;
				var cache = _props.cache;
				var loadOptions = _props.loadOptions;

				if (cache && cache.hasOwnProperty(inputValue)) {
					this.setState({
						options: cache[inputValue]
					});

					return;
				}

				var callback = function callback(error, data) {
					if (callback === _this2._callback) {
						_this2._callback = null;

						var options = data && data.options || [];

						if (cache) {
							cache[inputValue] = options;
						}

						_this2.setState({
							isLoading: false,
							options: options
						});
					}
				};

				// Ignore all but the most recent request
				this._callback = callback;

				var promise = loadOptions(inputValue, callback);
				if (promise) {
					promise.then(function (data) {
						return callback(null, data);
					}, function (error) {
						return callback(error);
					});
				}

				if (this._callback && !this.state.isLoading) {
					this.setState({
						isLoading: true
					});
				}

				return inputValue;
			}
		}, {
			key: '_onInputChange',
			value: function _onInputChange(inputValue) {
				var _props2 = this.props;
				var ignoreAccents = _props2.ignoreAccents;
				var ignoreCase = _props2.ignoreCase;

				if (ignoreAccents) {
					inputValue = (0, _utilsStripDiacritics2['default'])(inputValue);
				}

				if (ignoreCase) {
					inputValue = inputValue.toLowerCase();
				}

				return this.loadOptions(inputValue);
			}
		}, {
			key: 'render',
			value: function render() {
				var _props3 = this.props;
				var children = _props3.children;
				var loadingPlaceholder = _props3.loadingPlaceholder;
				var placeholder = _props3.placeholder;
				var searchPromptText = _props3.searchPromptText;
				var _state = this.state;
				var isLoading = _state.isLoading;
				var options = _state.options;

				var props = {
					noResultsText: isLoading ? loadingPlaceholder : searchPromptText,
					placeholder: isLoading ? loadingPlaceholder : placeholder,
					options: isLoading ? [] : options
				};

				return children(_extends({}, this.props, props, {
					isLoading: isLoading,
					onInputChange: this._onInputChange
				}));
			}
		}]);

		return Async;
	})(_react.Component);

	exports['default'] = Async;

	Async.propTypes = propTypes;
	Async.defaultProps = defaultProps;

	function defaultChildren(props) {
		return _react2['default'].createElement(_Select2['default'], props);
	};
	module.exports = exports['default'];

/***/ },

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Select = __webpack_require__(3);

	var _Select2 = _interopRequireDefault(_Select);

	var AsyncCreatable = _react2['default'].createClass({
		displayName: 'AsyncCreatableSelect',

		render: function render() {
			var _this = this;

			return _react2['default'].createElement(
				_Select2['default'].Async,
				this.props,
				function (asyncProps) {
					return _react2['default'].createElement(
						_Select2['default'].Creatable,
						_this.props,
						function (creatableProps) {
							return _react2['default'].createElement(_Select2['default'], _extends({}, asyncProps, creatableProps, {
								onInputChange: function (input) {
									creatableProps.onInputChange(input);
									return asyncProps.onInputChange(input);
								}
							}));
						}
					);
				}
			);
		}
	});

	module.exports = AsyncCreatable;

/***/ },

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Select = __webpack_require__(3);

	var _Select2 = _interopRequireDefault(_Select);

	var _utilsDefaultFilterOptions = __webpack_require__(25);

	var _utilsDefaultFilterOptions2 = _interopRequireDefault(_utilsDefaultFilterOptions);

	var _utilsDefaultMenuRenderer = __webpack_require__(26);

	var _utilsDefaultMenuRenderer2 = _interopRequireDefault(_utilsDefaultMenuRenderer);

	var Creatable = _react2['default'].createClass({
		displayName: 'CreatableSelect',

		propTypes: {
			// Child function responsible for creating the inner Select component
			// This component can be used to compose HOCs (eg Creatable and Async)
			// (props: Object): PropTypes.element
			children: _react2['default'].PropTypes.func,

			// See Select.propTypes.filterOptions
			filterOptions: _react2['default'].PropTypes.any,

			// Searches for any matching option within the set of options.
			// This function prevents duplicate options from being created.
			// ({ option: Object, options: Array, labelKey: string, valueKey: string }): boolean
			isOptionUnique: _react2['default'].PropTypes.func,

			// Determines if the current input text represents a valid option.
			// ({ label: string }): boolean
			isValidNewOption: _react2['default'].PropTypes.func,

			// See Select.propTypes.menuRenderer
			menuRenderer: _react2['default'].PropTypes.any,

			// Factory to create new option.
			// ({ label: string, labelKey: string, valueKey: string }): Object
			newOptionCreator: _react2['default'].PropTypes.func,

			// See Select.propTypes.options
			options: _react2['default'].PropTypes.array,

			// Creates prompt/placeholder option text.
			// (filterText: string): string
			promptTextCreator: _react2['default'].PropTypes.func,

			// Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option.
			shouldKeyDownEventCreateNewOption: _react2['default'].PropTypes.func
		},

		// Default prop methods
		statics: {
			isOptionUnique: isOptionUnique,
			isValidNewOption: isValidNewOption,
			newOptionCreator: newOptionCreator,
			promptTextCreator: promptTextCreator,
			shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption
		},

		getDefaultProps: function getDefaultProps() {
			return {
				filterOptions: _utilsDefaultFilterOptions2['default'],
				isOptionUnique: isOptionUnique,
				isValidNewOption: isValidNewOption,
				menuRenderer: _utilsDefaultMenuRenderer2['default'],
				newOptionCreator: newOptionCreator,
				promptTextCreator: promptTextCreator,
				shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption
			};
		},

		createNewOption: function createNewOption() {
			var _props = this.props;
			var isValidNewOption = _props.isValidNewOption;
			var newOptionCreator = _props.newOptionCreator;
			var _props$options = _props.options;
			var options = _props$options === undefined ? [] : _props$options;
			var shouldKeyDownEventCreateNewOption = _props.shouldKeyDownEventCreateNewOption;

			if (isValidNewOption({ label: this.inputValue })) {
				var option = newOptionCreator({ label: this.inputValue, labelKey: this.labelKey, valueKey: this.valueKey });
				var _isOptionUnique = this.isOptionUnique({ option: option });

				// Don't add the same option twice.
				if (_isOptionUnique) {
					options.unshift(option);

					this.select.selectValue(option);
				}
			}
		},

		filterOptions: function filterOptions() {
			var _props2 = this.props;
			var filterOptions = _props2.filterOptions;
			var isValidNewOption = _props2.isValidNewOption;
			var options = _props2.options;
			var promptTextCreator = _props2.promptTextCreator;

			// TRICKY Check currently selected options as well.
			// Don't display a create-prompt for a value that's selected.
			// This covers async edge-cases where a newly-created Option isn't yet in the async-loaded array.
			var excludeOptions = arguments[2] || [];

			var filteredOptions = filterOptions.apply(undefined, arguments) || [];

			if (isValidNewOption({ label: this.inputValue })) {
				var _newOptionCreator = this.props.newOptionCreator;

				var option = _newOptionCreator({
					label: this.inputValue,
					labelKey: this.labelKey,
					valueKey: this.valueKey
				});

				// TRICKY Compare to all options (not just filtered options) in case option has already been selected).
				// For multi-selects, this would remove it from the filtered list.
				var _isOptionUnique2 = this.isOptionUnique({
					option: option,
					options: excludeOptions.concat(filteredOptions)
				});

				if (_isOptionUnique2) {
					var _prompt = promptTextCreator(this.inputValue);

					this._createPlaceholderOption = _newOptionCreator({
						label: _prompt,
						labelKey: this.labelKey,
						valueKey: this.valueKey
					});

					filteredOptions.unshift(this._createPlaceholderOption);
				}
			}

			return filteredOptions;
		},

		isOptionUnique: function isOptionUnique(_ref2) {
			var option = _ref2.option;
			var options = _ref2.options;
			var isOptionUnique = this.props.isOptionUnique;

			options = options || this.select.filterOptions();

			return isOptionUnique({
				labelKey: this.labelKey,
				option: option,
				options: options,
				valueKey: this.valueKey
			});
		},

		menuRenderer: function menuRenderer(params) {
			var menuRenderer = this.props.menuRenderer;

			return menuRenderer(_extends({}, params, {
				onSelect: this.onOptionSelect
			}));
		},

		onInputChange: function onInputChange(input) {
			// This value may be needed in between Select mounts (when this.select is null)
			this.inputValue = input;
		},

		onInputKeyDown: function onInputKeyDown(event) {
			var shouldKeyDownEventCreateNewOption = this.props.shouldKeyDownEventCreateNewOption;

			var focusedOption = this.select.getFocusedOption();

			if (focusedOption && focusedOption === this._createPlaceholderOption && shouldKeyDownEventCreateNewOption({ keyCode: event.keyCode })) {
				this.createNewOption();

				// Prevent decorated Select from doing anything additional with this keyDown event
				event.preventDefault();
			}
		},

		onOptionSelect: function onOptionSelect(option, event) {
			if (option === this._createPlaceholderOption) {
				this.createNewOption();
			} else {
				this.select.selectValue(option);
			}
		},

		render: function render() {
			var _this = this;

			var _props3 = this.props;
			var _props3$children = _props3.children;
			var children = _props3$children === undefined ? defaultChildren : _props3$children;
			var newOptionCreator = _props3.newOptionCreator;
			var shouldKeyDownEventCreateNewOption = _props3.shouldKeyDownEventCreateNewOption;

			var restProps = _objectWithoutProperties(_props3, ['children', 'newOptionCreator', 'shouldKeyDownEventCreateNewOption']);

			var props = _extends({}, restProps, {
				allowCreate: true,
				filterOptions: this.filterOptions,
				menuRenderer: this.menuRenderer,
				onInputChange: this.onInputChange,
				onInputKeyDown: this.onInputKeyDown,
				ref: function ref(_ref) {
					_this.select = _ref;

					// These values may be needed in between Select mounts (when this.select is null)
					if (_ref) {
						_this.labelKey = _ref.props.labelKey;
						_this.valueKey = _ref.props.valueKey;
					}
				}
			});

			return children(props);
		}
	});

	function defaultChildren(props) {
		return _react2['default'].createElement(_Select2['default'], props);
	};

	function isOptionUnique(_ref3) {
		var option = _ref3.option;
		var options = _ref3.options;
		var labelKey = _ref3.labelKey;
		var valueKey = _ref3.valueKey;

		return options.filter(function (existingOption) {
			return existingOption[labelKey] === option[labelKey] || existingOption[valueKey] === option[valueKey];
		}).length === 0;
	};

	function isValidNewOption(_ref4) {
		var label = _ref4.label;

		return !!label;
	};

	function newOptionCreator(_ref5) {
		var label = _ref5.label;
		var labelKey = _ref5.labelKey;
		var valueKey = _ref5.valueKey;

		var option = {};
		option[valueKey] = label;
		option[labelKey] = label;
		option.className = 'Select-create-option-placeholder';
		return option;
	};

	function promptTextCreator(label) {
		return 'Create option "' + label + '"';
	}

	function shouldKeyDownEventCreateNewOption(_ref6) {
		var keyCode = _ref6.keyCode;

		switch (keyCode) {
			case 9: // TAB
			case 13: // ENTER
			case 188:
				// COMMA
				return true;
		}

		return false;
	};

	module.exports = Creatable;

/***/ },

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(7);

	var _classnames2 = _interopRequireDefault(_classnames);

	var Option = _react2['default'].createClass({
		displayName: 'Option',

		propTypes: {
			children: _react2['default'].PropTypes.node,
			className: _react2['default'].PropTypes.string, // className (based on mouse position)
			instancePrefix: _react2['default'].PropTypes.string.isRequired, // unique prefix for the ids (used for aria)
			isDisabled: _react2['default'].PropTypes.bool, // the option is disabled
			isFocused: _react2['default'].PropTypes.bool, // the option is focused
			isSelected: _react2['default'].PropTypes.bool, // the option is selected
			onFocus: _react2['default'].PropTypes.func, // method to handle mouseEnter on option element
			onSelect: _react2['default'].PropTypes.func, // method to handle click on option element
			onUnfocus: _react2['default'].PropTypes.func, // method to handle mouseLeave on option element
			option: _react2['default'].PropTypes.object.isRequired, // object that is base for that option
			optionIndex: _react2['default'].PropTypes.number },
		// index of the option, used to generate unique ids for aria
		blockEvent: function blockEvent(event) {
			event.preventDefault();
			event.stopPropagation();
			if (event.target.tagName !== 'A' || !('href' in event.target)) {
				return;
			}
			if (event.target.target) {
				window.open(event.target.href, event.target.target);
			} else {
				window.location.href = event.target.href;
			}
		},

		handleMouseDown: function handleMouseDown(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onSelect(this.props.option, event);
		},

		handleMouseEnter: function handleMouseEnter(event) {
			this.onFocus(event);
		},

		handleMouseMove: function handleMouseMove(event) {
			this.onFocus(event);
		},

		handleTouchEnd: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			this.handleMouseDown(event);
		},

		handleTouchMove: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		},

		handleTouchStart: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		},

		onFocus: function onFocus(event) {
			if (!this.props.isFocused) {
				this.props.onFocus(this.props.option, event);
			}
		},
		render: function render() {
			var _props = this.props;
			var option = _props.option;
			var instancePrefix = _props.instancePrefix;
			var optionIndex = _props.optionIndex;

			var className = (0, _classnames2['default'])(this.props.className, option.className);

			return option.disabled ? _react2['default'].createElement(
				'div',
				{ className: className,
					onMouseDown: this.blockEvent,
					onClick: this.blockEvent },
				this.props.children
			) : _react2['default'].createElement(
				'div',
				{ className: className,
					style: option.style,
					role: 'option',
					onMouseDown: this.handleMouseDown,
					onMouseEnter: this.handleMouseEnter,
					onMouseMove: this.handleMouseMove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove,
					onTouchEnd: this.handleTouchEnd,
					id: instancePrefix + '-option-' + optionIndex,
					title: option.title },
				this.props.children
			);
		}
	});

	module.exports = Option;

/***/ },

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(7);

	var _classnames2 = _interopRequireDefault(_classnames);

	var Value = _react2['default'].createClass({

		displayName: 'Value',

		propTypes: {
			children: _react2['default'].PropTypes.node,
			disabled: _react2['default'].PropTypes.bool, // disabled prop passed to ReactSelect
			id: _react2['default'].PropTypes.string, // Unique id for the value - used for aria
			onClick: _react2['default'].PropTypes.func, // method to handle click on value label
			onRemove: _react2['default'].PropTypes.func, // method to handle removal of the value
			value: _react2['default'].PropTypes.object.isRequired },

		// the option object for this value
		handleMouseDown: function handleMouseDown(event) {
			if (event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			if (this.props.onClick) {
				event.stopPropagation();
				this.props.onClick(this.props.value, event);
				return;
			}
			if (this.props.value.href) {
				event.stopPropagation();
			}
		},

		onRemove: function onRemove(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onRemove(this.props.value);
		},

		handleTouchEndRemove: function handleTouchEndRemove(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.onRemove(event);
		},

		handleTouchMove: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		},

		handleTouchStart: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		},

		renderRemoveIcon: function renderRemoveIcon() {
			if (this.props.disabled || !this.props.onRemove) return;
			return _react2['default'].createElement(
				'span',
				{ className: 'Select-value-icon',
					'aria-hidden': 'true',
					onMouseDown: this.onRemove,
					onTouchEnd: this.handleTouchEndRemove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove },
				'×'
			);
		},

		renderLabel: function renderLabel() {
			var className = 'Select-value-label';
			return this.props.onClick || this.props.value.href ? _react2['default'].createElement(
				'a',
				{ className: className, href: this.props.value.href, target: this.props.value.target, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
				this.props.children
			) : _react2['default'].createElement(
				'span',
				{ className: className, role: 'option', 'aria-selected': 'true', id: this.props.id },
				this.props.children
			);
		},

		render: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: (0, _classnames2['default'])('Select-value', this.props.value.className),
					style: this.props.value.style,
					title: this.props.value.title
				},
				this.renderRemoveIcon(),
				this.renderLabel()
			);
		}

	});

	module.exports = Value;

/***/ },

/***/ 47:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports["default"] = arrowRenderer;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function arrowRenderer(_ref) {
		var onMouseDown = _ref.onMouseDown;

		return _react2["default"].createElement("span", {
			className: "Select-arrow",
			onMouseDown: onMouseDown
		});
	}

	;
	module.exports = exports["default"];

/***/ },

/***/ 64:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(34),
	    maker = __webpack_require__(202).instanceJoinCreator;

	/**
	 * Extract child listenables from a parent from their
	 * children property and return them in a keyed Object
	 *
	 * @param {Object} listenable The parent listenable
	 */
	var mapChildListenables = function mapChildListenables(listenable) {
	    var i = 0,
	        children = {},
	        childName;
	    for (; i < (listenable.children || []).length; ++i) {
	        childName = listenable.children[i];
	        if (listenable[childName]) {
	            children[childName] = listenable[childName];
	        }
	    }
	    return children;
	};

	/**
	 * Make a flat dictionary of all listenables including their
	 * possible children (recursively), concatenating names in camelCase.
	 *
	 * @param {Object} listenables The top-level listenables
	 */
	var flattenListenables = function flattenListenables(listenables) {
	    var flattened = {};
	    for (var key in listenables) {
	        var listenable = listenables[key];
	        var childMap = mapChildListenables(listenable);

	        // recursively flatten children
	        var children = flattenListenables(childMap);

	        // add the primary listenable and chilren
	        flattened[key] = listenable;
	        for (var childKey in children) {
	            var childListenable = children[childKey];
	            flattened[key + _.capitalize(childKey)] = childListenable;
	        }
	    }

	    return flattened;
	};

	/**
	 * A module of methods related to listening.
	 */
	module.exports = {

	    /**
	     * An internal utility function used by `validateListening`
	     *
	     * @param {Action|Store} listenable The listenable we want to search for
	     * @returns {Boolean} The result of a recursive search among `this.subscriptions`
	     */
	    hasListener: function hasListener(listenable) {
	        var i = 0,
	            j,
	            listener,
	            listenables;
	        for (; i < (this.subscriptions || []).length; ++i) {
	            listenables = [].concat(this.subscriptions[i].listenable);
	            for (j = 0; j < listenables.length; j++) {
	                listener = listenables[j];
	                if (listener === listenable || listener.hasListener && listener.hasListener(listenable)) {
	                    return true;
	                }
	            }
	        }
	        return false;
	    },

	    /**
	     * A convenience method that listens to all listenables in the given object.
	     *
	     * @param {Object} listenables An object of listenables. Keys will be used as callback method names.
	     */
	    listenToMany: function listenToMany(listenables) {
	        var allListenables = flattenListenables(listenables);
	        for (var key in allListenables) {
	            var cbname = _.callbackName(key),
	                localname = this[cbname] ? cbname : this[key] ? key : undefined;
	            if (localname) {
	                this.listenTo(allListenables[key], localname, this[cbname + "Default"] || this[localname + "Default"] || localname);
	            }
	        }
	    },

	    /**
	     * Checks if the current context can listen to the supplied listenable
	     *
	     * @param {Action|Store} listenable An Action or Store that should be
	     *  listened to.
	     * @returns {String|Undefined} An error message, or undefined if there was no problem.
	     */
	    validateListening: function validateListening(listenable) {
	        if (listenable === this) {
	            return "Listener is not able to listen to itself";
	        }
	        if (!_.isFunction(listenable.listen)) {
	            return listenable + " is missing a listen method";
	        }
	        if (listenable.hasListener && listenable.hasListener(this)) {
	            return "Listener cannot listen to this listenable because of circular loop";
	        }
	    },

	    /**
	     * Sets up a subscription to the given listenable for the context object
	     *
	     * @param {Action|Store} listenable An Action or Store that should be
	     *  listened to.
	     * @param {Function|String} callback The callback to register as event handler
	     * @param {Function|String} defaultCallback The callback to register as default handler
	     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is the object being listened to
	     */
	    listenTo: function listenTo(listenable, callback, defaultCallback) {
	        var desub,
	            unsubscriber,
	            subscriptionobj,
	            subs = this.subscriptions = this.subscriptions || [];
	        _.throwIf(this.validateListening(listenable));
	        this.fetchInitialState(listenable, defaultCallback);
	        desub = listenable.listen(this[callback] || callback, this);
	        unsubscriber = function () {
	            var index = subs.indexOf(subscriptionobj);
	            _.throwIf(index === -1, "Tried to remove listen already gone from subscriptions list!");
	            subs.splice(index, 1);
	            desub();
	        };
	        subscriptionobj = {
	            stop: unsubscriber,
	            listenable: listenable
	        };
	        subs.push(subscriptionobj);
	        return subscriptionobj;
	    },

	    /**
	     * Stops listening to a single listenable
	     *
	     * @param {Action|Store} listenable The action or store we no longer want to listen to
	     * @returns {Boolean} True if a subscription was found and removed, otherwise false.
	     */
	    stopListeningTo: function stopListeningTo(listenable) {
	        var sub,
	            i = 0,
	            subs = this.subscriptions || [];
	        for (; i < subs.length; i++) {
	            sub = subs[i];
	            if (sub.listenable === listenable) {
	                sub.stop();
	                _.throwIf(subs.indexOf(sub) !== -1, "Failed to remove listen from subscriptions list!");
	                return true;
	            }
	        }
	        return false;
	    },

	    /**
	     * Stops all subscriptions and empties subscriptions array
	     */
	    stopListeningToAll: function stopListeningToAll() {
	        var remaining,
	            subs = this.subscriptions || [];
	        while (remaining = subs.length) {
	            subs[0].stop();
	            _.throwIf(subs.length !== remaining - 1, "Failed to remove listen from subscriptions list!");
	        }
	    },

	    /**
	     * Used in `listenTo`. Fetches initial data from a publisher if it has a `getInitialState` method.
	     * @param {Action|Store} listenable The publisher we want to get initial state from
	     * @param {Function|String} defaultCallback The method to receive the data
	     */
	    fetchInitialState: function fetchInitialState(listenable, defaultCallback) {
	        defaultCallback = defaultCallback && this[defaultCallback] || defaultCallback;
	        var me = this;
	        if (_.isFunction(defaultCallback) && _.isFunction(listenable.getInitialState)) {
	            var data = listenable.getInitialState();
	            if (data && _.isFunction(data.then)) {
	                data.then(function () {
	                    defaultCallback.apply(me, arguments);
	                });
	            } else {
	                defaultCallback.call(this, data);
	            }
	        }
	    },

	    /**
	     * The callback will be called once all listenables have triggered at least once.
	     * It will be invoked with the last emission from each listenable.
	     * @param {...Publishers} publishers Publishers that should be tracked.
	     * @param {Function|String} callback The method to call when all publishers have emitted
	     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
	     */
	    joinTrailing: maker("last"),

	    /**
	     * The callback will be called once all listenables have triggered at least once.
	     * It will be invoked with the first emission from each listenable.
	     * @param {...Publishers} publishers Publishers that should be tracked.
	     * @param {Function|String} callback The method to call when all publishers have emitted
	     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
	     */
	    joinLeading: maker("first"),

	    /**
	     * The callback will be called once all listenables have triggered at least once.
	     * It will be invoked with all emission from each listenable.
	     * @param {...Publishers} publishers Publishers that should be tracked.
	     * @param {Function|String} callback The method to call when all publishers have emitted
	     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
	     */
	    joinConcat: maker("all"),

	    /**
	     * The callback will be called once all listenables have triggered.
	     * If a callback triggers twice before that happens, an error is thrown.
	     * @param {...Publishers} publishers Publishers that should be tracked.
	     * @param {Function|String} callback The method to call when all publishers have emitted
	     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
	     */
	    joinStrict: maker("strict")
	};

/***/ },

/***/ 104:
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(40);

	var MarkdownEditorActions = Reflux.createActions([
		'clearSelection',
		'clickEditorTab',
		'clickPreviewTab',
		'makeBold',
		'makeImage',
		'makeItalic',
		'makeLink',
		'makeList',
		'makeHeader',
		'makeSubHeader',
		'makeUnderline',
		'setSelection'
	]);

	module.exports = MarkdownEditorActions;


/***/ },

/***/ 161:
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(40);

	var MarkdownSelectionActions = Reflux.createActions([
		'selectionCleared',
		'selectionSet'
	]);

	module.exports = MarkdownSelectionActions;


/***/ },

/***/ 162:
/***/ function(module, exports) {

	"use strict";

	exports.createdStores = [];

	exports.createdActions = [];

	exports.reset = function () {
	    while (exports.createdStores.length) {
	        exports.createdStores.pop();
	    }
	    while (exports.createdActions.length) {
	        exports.createdActions.pop();
	    }
	};

/***/ },

/***/ 163:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(34);

	/**
	 * A module of methods for object that you want to be able to listen to.
	 * This module is consumed by `createStore` and `createAction`
	 */
	module.exports = {

	    /**
	     * Hook used by the publisher that is invoked before emitting
	     * and before `shouldEmit`. The arguments are the ones that the action
	     * is invoked with. If this function returns something other than
	     * undefined, that will be passed on as arguments for shouldEmit and
	     * emission.
	     */
	    preEmit: function preEmit() {},

	    /**
	     * Hook used by the publisher after `preEmit` to determine if the
	     * event should be emitted with given arguments. This may be overridden
	     * in your application, default implementation always returns true.
	     *
	     * @returns {Boolean} true if event should be emitted
	     */
	    shouldEmit: function shouldEmit() {
	        return true;
	    },

	    /**
	     * Subscribes the given callback for action triggered
	     *
	     * @param {Function} callback The callback to register as event handler
	     * @param {Mixed} [optional] bindContext The context to bind the callback with
	     * @returns {Function} Callback that unsubscribes the registered event handler
	     */
	    listen: function listen(callback, bindContext) {
	        bindContext = bindContext || this;
	        var eventHandler = function eventHandler(args) {
	            if (aborted) {
	                return;
	            }
	            callback.apply(bindContext, args);
	        },
	            me = this,
	            aborted = false;
	        this.emitter.addListener(this.eventLabel, eventHandler);
	        return function () {
	            aborted = true;
	            me.emitter.removeListener(me.eventLabel, eventHandler);
	        };
	    },

	    /**
	     * Publishes an event using `this.emitter` (if `shouldEmit` agrees)
	     */
	    trigger: function trigger() {
	        var args = arguments,
	            pre = this.preEmit.apply(this, args);
	        args = pre === undefined ? args : _.isArguments(pre) ? pre : [].concat(pre);
	        if (this.shouldEmit.apply(this, args)) {
	            this.emitter.emit(this.eventLabel, args);
	        }
	    },

	    /**
	     * Tries to publish the event on the next tick
	     */
	    triggerAsync: function triggerAsync() {
	        var args = arguments,
	            me = this;
	        _.nextTick(function () {
	            me.trigger.apply(me, args);
	        });
	    },

	    /**
	     * Wraps the trigger mechanism with a deferral function.
	     *
	     * @param {Function} callback the deferral function,
	     *        first argument is the resolving function and the
	     *        rest are the arguments provided from the previous
	     *        trigger invocation
	     */
	    deferWith: function deferWith(callback) {
	        var oldTrigger = this.trigger,
	            ctx = this,
	            resolver = function resolver() {
	            oldTrigger.apply(ctx, arguments);
	        };
	        this.trigger = function () {
	            callback.apply(ctx, [resolver].concat([].splice.call(arguments, 0)));
	        };
	    }

	};

/***/ },

/***/ 164:
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(34),
	    ListenerMethods = __webpack_require__(64);

	/**
	 * A module meant to be consumed as a mixin by a React component. Supplies the methods from
	 * `ListenerMethods` mixin and takes care of teardown of subscriptions.
	 * Note that if you're using the `connect` mixin you don't need this mixin, as connect will
	 * import everything this mixin contains!
	 */
	module.exports = _.extend({

	    /**
	     * Cleans up all listener previously registered.
	     */
	    componentWillUnmount: ListenerMethods.stopListeningToAll

	}, ListenerMethods);


/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(40);

	var PublicMarkdownEditorActions = Reflux.createActions([
		'updateText'
	]);

	module.exports = PublicMarkdownEditorActions;


/***/ },

/***/ 199:
/***/ function(module, exports) {

	/**
	 * A module of methods that you want to include in all actions.
	 * This module is consumed by `createAction`.
	 */
	"use strict";

	module.exports = {};

/***/ },

/***/ 200:
/***/ function(module, exports) {

	/**
	 * A module of methods that you want to include in all stores.
	 * This module is consumed by `createStore`.
	 */
	"use strict";

	module.exports = {};

/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(34),
	    Keep = __webpack_require__(162),
	    mixer = __webpack_require__(317),
	    bindMethods = __webpack_require__(314);

	var allowed = { preEmit: 1, shouldEmit: 1 };

	/**
	 * Creates an event emitting Data Store. It is mixed in with functions
	 * from the `ListenerMethods` and `PublisherMethods` mixins. `preEmit`
	 * and `shouldEmit` may be overridden in the definition object.
	 *
	 * @param {Object} definition The data store object definition
	 * @returns {Store} A data store instance
	 */
	module.exports = function (definition) {

	    var StoreMethods = __webpack_require__(200),
	        PublisherMethods = __webpack_require__(163),
	        ListenerMethods = __webpack_require__(64);

	    definition = definition || {};

	    for (var a in StoreMethods) {
	        if (!allowed[a] && (PublisherMethods[a] || ListenerMethods[a])) {
	            throw new Error("Cannot override API method " + a + " in Reflux.StoreMethods. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead.");
	        }
	    }

	    for (var d in definition) {
	        if (!allowed[d] && (PublisherMethods[d] || ListenerMethods[d])) {
	            throw new Error("Cannot override API method " + d + " in store creation. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead.");
	        }
	    }

	    definition = mixer(definition);

	    function Store() {
	        var i = 0,
	            arr;
	        this.subscriptions = [];
	        this.emitter = new _.EventEmitter();
	        this.eventLabel = "change";
	        bindMethods(this, definition);
	        if (this.init && _.isFunction(this.init)) {
	            this.init();
	        }
	        if (this.listenables) {
	            arr = [].concat(this.listenables);
	            for (; i < arr.length; i++) {
	                this.listenToMany(arr[i]);
	            }
	        }
	    }

	    _.extend(Store.prototype, ListenerMethods, PublisherMethods, StoreMethods, definition);

	    var store = new Store();
	    Keep.createdStores.push(store);

	    return store;
	};

/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Internal module used to create static and instance join methods
	 */

	"use strict";

	var createStore = __webpack_require__(201),
	    _ = __webpack_require__(34);

	var slice = Array.prototype.slice,
	    strategyMethodNames = {
	    strict: "joinStrict",
	    first: "joinLeading",
	    last: "joinTrailing",
	    all: "joinConcat"
	};

	/**
	 * Used in `index.js` to create the static join methods
	 * @param {String} strategy Which strategy to use when tracking listenable trigger arguments
	 * @returns {Function} A static function which returns a store with a join listen on the given listenables using the given strategy
	 */
	exports.staticJoinCreator = function (strategy) {
	    return function () /* listenables... */{
	        var listenables = slice.call(arguments);
	        return createStore({
	            init: function init() {
	                this[strategyMethodNames[strategy]].apply(this, listenables.concat("triggerAsync"));
	            }
	        });
	    };
	};

	/**
	 * Used in `ListenerMethods.js` to create the instance join methods
	 * @param {String} strategy Which strategy to use when tracking listenable trigger arguments
	 * @returns {Function} An instance method which sets up a join listen on the given listenables using the given strategy
	 */
	exports.instanceJoinCreator = function (strategy) {
	    return function () /* listenables..., callback*/{
	        _.throwIf(arguments.length < 2, "Cannot create a join with less than 2 listenables!");
	        var listenables = slice.call(arguments),
	            callback = listenables.pop(),
	            numberOfListenables = listenables.length,
	            join = {
	            numberOfListenables: numberOfListenables,
	            callback: this[callback] || callback,
	            listener: this,
	            strategy: strategy
	        },
	            i,
	            cancels = [],
	            subobj;
	        for (i = 0; i < numberOfListenables; i++) {
	            _.throwIf(this.validateListening(listenables[i]));
	        }
	        for (i = 0; i < numberOfListenables; i++) {
	            cancels.push(listenables[i].listen(newListener(i, join), this));
	        }
	        reset(join);
	        subobj = { listenable: listenables };
	        subobj.stop = makeStopper(subobj, cancels, this);
	        this.subscriptions = (this.subscriptions || []).concat(subobj);
	        return subobj;
	    };
	};

	// ---- internal join functions ----

	function makeStopper(subobj, cancels, context) {
	    return function () {
	        var i,
	            subs = context.subscriptions,
	            index = subs ? subs.indexOf(subobj) : -1;
	        _.throwIf(index === -1, "Tried to remove join already gone from subscriptions list!");
	        for (i = 0; i < cancels.length; i++) {
	            cancels[i]();
	        }
	        subs.splice(index, 1);
	    };
	}

	function reset(join) {
	    join.listenablesEmitted = new Array(join.numberOfListenables);
	    join.args = new Array(join.numberOfListenables);
	}

	function newListener(i, join) {
	    return function () {
	        var callargs = slice.call(arguments);
	        if (join.listenablesEmitted[i]) {
	            switch (join.strategy) {
	                case "strict":
	                    throw new Error("Strict join failed because listener triggered twice.");
	                case "last":
	                    join.args[i] = callargs;break;
	                case "all":
	                    join.args[i].push(callargs);
	            }
	        } else {
	            join.listenablesEmitted[i] = true;
	            join.args[i] = join.strategy === "all" ? [callargs] : callargs;
	        }
	        emitIfAllListenablesEmitted(join);
	    };
	}

	function emitIfAllListenablesEmitted(join) {
	    for (var i = 0; i < join.numberOfListenables; i++) {
	        if (!join.listenablesEmitted[i]) {
	            return;
	        }
	    }
	    join.callback.apply(join.listener, join.args);
	    reset(join);
	}

/***/ },

/***/ 272:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var has = Object.prototype.hasOwnProperty;

	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//
	var prefix = typeof Object.create !== 'function' ? '~' : false;

	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} [once=false] Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }

	/**
	 * Hold the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;

	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var events = this._events
	    , names = []
	    , name;

	  if (!events) return names;

	  for (name in events) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }

	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }

	  return names;
	};

	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events && this._events[evt];

	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];

	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }

	  return ee;
	};

	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return false;

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return this;

	  var listeners = this._events[evt]
	    , events = [];

	  if (fn) {
	    if (listeners.fn) {
	      if (
	           listeners.fn !== fn
	        || (once && !listeners.once)
	        || (context && listeners.context !== context)
	      ) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (
	             listeners[i].fn !== fn
	          || (once && !listeners[i].once)
	          || (context && listeners[i].context !== context)
	        ) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }

	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }

	  return this;
	};

	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;

	  if (event) delete this._events[prefix ? prefix + event : event];
	  else this._events = prefix ? {} : Object.create(null);

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}


/***/ },

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	// super simple module for the most common nodejs use case.
	exports.markdown = __webpack_require__(278);
	exports.parse = exports.markdown.toHTML;


/***/ },

/***/ 278:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {// Released under MIT license
	// Copyright (c) 2009-2010 Dominic Baggott
	// Copyright (c) 2009-2010 Ash Berlin
	// Copyright (c) 2011 Christoph Dorn <christoph@christophdorn.com> (http://www.christophdorn.com)

	/*jshint browser:true, devel:true */

	(function( expose ) {

	/**
	 *  class Markdown
	 *
	 *  Markdown processing in Javascript done right. We have very particular views
	 *  on what constitutes 'right' which include:
	 *
	 *  - produces well-formed HTML (this means that em and strong nesting is
	 *    important)
	 *
	 *  - has an intermediate representation to allow processing of parsed data (We
	 *    in fact have two, both as [JsonML]: a markdown tree and an HTML tree).
	 *
	 *  - is easily extensible to add new dialects without having to rewrite the
	 *    entire parsing mechanics
	 *
	 *  - has a good test suite
	 *
	 *  This implementation fulfills all of these (except that the test suite could
	 *  do with expanding to automatically run all the fixtures from other Markdown
	 *  implementations.)
	 *
	 *  ##### Intermediate Representation
	 *
	 *  *TODO* Talk about this :) Its JsonML, but document the node names we use.
	 *
	 *  [JsonML]: http://jsonml.org/ "JSON Markup Language"
	 **/
	var Markdown = expose.Markdown = function(dialect) {
	  switch (typeof dialect) {
	    case "undefined":
	      this.dialect = Markdown.dialects.Gruber;
	      break;
	    case "object":
	      this.dialect = dialect;
	      break;
	    default:
	      if ( dialect in Markdown.dialects ) {
	        this.dialect = Markdown.dialects[dialect];
	      }
	      else {
	        throw new Error("Unknown Markdown dialect '" + String(dialect) + "'");
	      }
	      break;
	  }
	  this.em_state = [];
	  this.strong_state = [];
	  this.debug_indent = "";
	};

	/**
	 *  parse( markdown, [dialect] ) -> JsonML
	 *  - markdown (String): markdown string to parse
	 *  - dialect (String | Dialect): the dialect to use, defaults to gruber
	 *
	 *  Parse `markdown` and return a markdown document as a Markdown.JsonML tree.
	 **/
	expose.parse = function( source, dialect ) {
	  // dialect will default if undefined
	  var md = new Markdown( dialect );
	  return md.toTree( source );
	};

	/**
	 *  toHTML( markdown, [dialect]  ) -> String
	 *  toHTML( md_tree ) -> String
	 *  - markdown (String): markdown string to parse
	 *  - md_tree (Markdown.JsonML): parsed markdown tree
	 *
	 *  Take markdown (either as a string or as a JsonML tree) and run it through
	 *  [[toHTMLTree]] then turn it into a well-formated HTML fragment.
	 **/
	expose.toHTML = function toHTML( source , dialect , options ) {
	  var input = expose.toHTMLTree( source , dialect , options );

	  return expose.renderJsonML( input );
	};

	/**
	 *  toHTMLTree( markdown, [dialect] ) -> JsonML
	 *  toHTMLTree( md_tree ) -> JsonML
	 *  - markdown (String): markdown string to parse
	 *  - dialect (String | Dialect): the dialect to use, defaults to gruber
	 *  - md_tree (Markdown.JsonML): parsed markdown tree
	 *
	 *  Turn markdown into HTML, represented as a JsonML tree. If a string is given
	 *  to this function, it is first parsed into a markdown tree by calling
	 *  [[parse]].
	 **/
	expose.toHTMLTree = function toHTMLTree( input, dialect , options ) {
	  // convert string input to an MD tree
	  if ( typeof input ==="string" ) input = this.parse( input, dialect );

	  // Now convert the MD tree to an HTML tree

	  // remove references from the tree
	  var attrs = extract_attr( input ),
	      refs = {};

	  if ( attrs && attrs.references ) {
	    refs = attrs.references;
	  }

	  var html = convert_tree_to_html( input, refs , options );
	  merge_text_nodes( html );
	  return html;
	};

	// For Spidermonkey based engines
	function mk_block_toSource() {
	  return "Markdown.mk_block( " +
	          uneval(this.toString()) +
	          ", " +
	          uneval(this.trailing) +
	          ", " +
	          uneval(this.lineNumber) +
	          " )";
	}

	// node
	function mk_block_inspect() {
	  var util = __webpack_require__(35);
	  return "Markdown.mk_block( " +
	          util.inspect(this.toString()) +
	          ", " +
	          util.inspect(this.trailing) +
	          ", " +
	          util.inspect(this.lineNumber) +
	          " )";

	}

	var mk_block = Markdown.mk_block = function(block, trail, line) {
	  // Be helpful for default case in tests.
	  if ( arguments.length == 1 ) trail = "\n\n";

	  var s = new String(block);
	  s.trailing = trail;
	  // To make it clear its not just a string
	  s.inspect = mk_block_inspect;
	  s.toSource = mk_block_toSource;

	  if ( line != undefined )
	    s.lineNumber = line;

	  return s;
	};

	function count_lines( str ) {
	  var n = 0, i = -1;
	  while ( ( i = str.indexOf("\n", i + 1) ) !== -1 ) n++;
	  return n;
	}

	// Internal - split source into rough blocks
	Markdown.prototype.split_blocks = function splitBlocks( input, startLine ) {
	  input = input.replace(/(\r\n|\n|\r)/g, "\n");
	  // [\s\S] matches _anything_ (newline or space)
	  // [^] is equivalent but doesn't work in IEs.
	  var re = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g,
	      blocks = [],
	      m;

	  var line_no = 1;

	  if ( ( m = /^(\s*\n)/.exec(input) ) != null ) {
	    // skip (but count) leading blank lines
	    line_no += count_lines( m[0] );
	    re.lastIndex = m[0].length;
	  }

	  while ( ( m = re.exec(input) ) !== null ) {
	    if (m[2] == "\n#") {
	      m[2] = "\n";
	      re.lastIndex--;
	    }
	    blocks.push( mk_block( m[1], m[2], line_no ) );
	    line_no += count_lines( m[0] );
	  }

	  return blocks;
	};

	/**
	 *  Markdown#processBlock( block, next ) -> undefined | [ JsonML, ... ]
	 *  - block (String): the block to process
	 *  - next (Array): the following blocks
	 *
	 * Process `block` and return an array of JsonML nodes representing `block`.
	 *
	 * It does this by asking each block level function in the dialect to process
	 * the block until one can. Succesful handling is indicated by returning an
	 * array (with zero or more JsonML nodes), failure by a false value.
	 *
	 * Blocks handlers are responsible for calling [[Markdown#processInline]]
	 * themselves as appropriate.
	 *
	 * If the blocks were split incorrectly or adjacent blocks need collapsing you
	 * can adjust `next` in place using shift/splice etc.
	 *
	 * If any of this default behaviour is not right for the dialect, you can
	 * define a `__call__` method on the dialect that will get invoked to handle
	 * the block processing.
	 */
	Markdown.prototype.processBlock = function processBlock( block, next ) {
	  var cbs = this.dialect.block,
	      ord = cbs.__order__;

	  if ( "__call__" in cbs ) {
	    return cbs.__call__.call(this, block, next);
	  }

	  for ( var i = 0; i < ord.length; i++ ) {
	    //D:this.debug( "Testing", ord[i] );
	    var res = cbs[ ord[i] ].call( this, block, next );
	    if ( res ) {
	      //D:this.debug("  matched");
	      if ( !isArray(res) || ( res.length > 0 && !( isArray(res[0]) ) ) )
	        this.debug(ord[i], "didn't return a proper array");
	      //D:this.debug( "" );
	      return res;
	    }
	  }

	  // Uhoh! no match! Should we throw an error?
	  return [];
	};

	Markdown.prototype.processInline = function processInline( block ) {
	  return this.dialect.inline.__call__.call( this, String( block ) );
	};

	/**
	 *  Markdown#toTree( source ) -> JsonML
	 *  - source (String): markdown source to parse
	 *
	 *  Parse `source` into a JsonML tree representing the markdown document.
	 **/
	// custom_tree means set this.tree to `custom_tree` and restore old value on return
	Markdown.prototype.toTree = function toTree( source, custom_root ) {
	  var blocks = source instanceof Array ? source : this.split_blocks( source );

	  // Make tree a member variable so its easier to mess with in extensions
	  var old_tree = this.tree;
	  try {
	    this.tree = custom_root || this.tree || [ "markdown" ];

	    blocks:
	    while ( blocks.length ) {
	      var b = this.processBlock( blocks.shift(), blocks );

	      // Reference blocks and the like won't return any content
	      if ( !b.length ) continue blocks;

	      this.tree.push.apply( this.tree, b );
	    }
	    return this.tree;
	  }
	  finally {
	    if ( custom_root ) {
	      this.tree = old_tree;
	    }
	  }
	};

	// Noop by default
	Markdown.prototype.debug = function () {
	  var args = Array.prototype.slice.call( arguments);
	  args.unshift(this.debug_indent);
	  if ( typeof print !== "undefined" )
	      print.apply( print, args );
	  if ( typeof console !== "undefined" && typeof console.log !== "undefined" )
	      console.log.apply( null, args );
	}

	Markdown.prototype.loop_re_over_block = function( re, block, cb ) {
	  // Dont use /g regexps with this
	  var m,
	      b = block.valueOf();

	  while ( b.length && (m = re.exec(b) ) != null ) {
	    b = b.substr( m[0].length );
	    cb.call(this, m);
	  }
	  return b;
	};

	/**
	 * Markdown.dialects
	 *
	 * Namespace of built-in dialects.
	 **/
	Markdown.dialects = {};

	/**
	 * Markdown.dialects.Gruber
	 *
	 * The default dialect that follows the rules set out by John Gruber's
	 * markdown.pl as closely as possible. Well actually we follow the behaviour of
	 * that script which in some places is not exactly what the syntax web page
	 * says.
	 **/
	Markdown.dialects.Gruber = {
	  block: {
	    atxHeader: function atxHeader( block, next ) {
	      var m = block.match( /^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/ );

	      if ( !m ) return undefined;

	      var header = [ "header", { level: m[ 1 ].length } ];
	      Array.prototype.push.apply(header, this.processInline(m[ 2 ]));

	      if ( m[0].length < block.length )
	        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

	      return [ header ];
	    },

	    setextHeader: function setextHeader( block, next ) {
	      var m = block.match( /^(.*)\n([-=])\2\2+(?:\n|$)/ );

	      if ( !m ) return undefined;

	      var level = ( m[ 2 ] === "=" ) ? 1 : 2;
	      var header = [ "header", { level : level }, m[ 1 ] ];

	      if ( m[0].length < block.length )
	        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

	      return [ header ];
	    },

	    code: function code( block, next ) {
	      // |    Foo
	      // |bar
	      // should be a code block followed by a paragraph. Fun
	      //
	      // There might also be adjacent code block to merge.

	      var ret = [],
	          re = /^(?: {0,3}\t| {4})(.*)\n?/,
	          lines;

	      // 4 spaces + content
	      if ( !block.match( re ) ) return undefined;

	      block_search:
	      do {
	        // Now pull out the rest of the lines
	        var b = this.loop_re_over_block(
	                  re, block.valueOf(), function( m ) { ret.push( m[1] ); } );

	        if ( b.length ) {
	          // Case alluded to in first comment. push it back on as a new block
	          next.unshift( mk_block(b, block.trailing) );
	          break block_search;
	        }
	        else if ( next.length ) {
	          // Check the next block - it might be code too
	          if ( !next[0].match( re ) ) break block_search;

	          // Pull how how many blanks lines follow - minus two to account for .join
	          ret.push ( block.trailing.replace(/[^\n]/g, "").substring(2) );

	          block = next.shift();
	        }
	        else {
	          break block_search;
	        }
	      } while ( true );

	      return [ [ "code_block", ret.join("\n") ] ];
	    },

	    horizRule: function horizRule( block, next ) {
	      // this needs to find any hr in the block to handle abutting blocks
	      var m = block.match( /^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/ );

	      if ( !m ) {
	        return undefined;
	      }

	      var jsonml = [ [ "hr" ] ];

	      // if there's a leading abutting block, process it
	      if ( m[ 1 ] ) {
	        jsonml.unshift.apply( jsonml, this.processBlock( m[ 1 ], [] ) );
	      }

	      // if there's a trailing abutting block, stick it into next
	      if ( m[ 3 ] ) {
	        next.unshift( mk_block( m[ 3 ] ) );
	      }

	      return jsonml;
	    },

	    // There are two types of lists. Tight and loose. Tight lists have no whitespace
	    // between the items (and result in text just in the <li>) and loose lists,
	    // which have an empty line between list items, resulting in (one or more)
	    // paragraphs inside the <li>.
	    //
	    // There are all sorts weird edge cases about the original markdown.pl's
	    // handling of lists:
	    //
	    // * Nested lists are supposed to be indented by four chars per level. But
	    //   if they aren't, you can get a nested list by indenting by less than
	    //   four so long as the indent doesn't match an indent of an existing list
	    //   item in the 'nest stack'.
	    //
	    // * The type of the list (bullet or number) is controlled just by the
	    //    first item at the indent. Subsequent changes are ignored unless they
	    //    are for nested lists
	    //
	    lists: (function( ) {
	      // Use a closure to hide a few variables.
	      var any_list = "[*+-]|\\d+\\.",
	          bullet_list = /[*+-]/,
	          number_list = /\d+\./,
	          // Capture leading indent as it matters for determining nested lists.
	          is_list_re = new RegExp( "^( {0,3})(" + any_list + ")[ \t]+" ),
	          indent_re = "(?: {0,3}\\t| {4})";

	      // TODO: Cache this regexp for certain depths.
	      // Create a regexp suitable for matching an li for a given stack depth
	      function regex_for_depth( depth ) {

	        return new RegExp(
	          // m[1] = indent, m[2] = list_type
	          "(?:^(" + indent_re + "{0," + depth + "} {0,3})(" + any_list + ")\\s+)|" +
	          // m[3] = cont
	          "(^" + indent_re + "{0," + (depth-1) + "}[ ]{0,4})"
	        );
	      }
	      function expand_tab( input ) {
	        return input.replace( / {0,3}\t/g, "    " );
	      }

	      // Add inline content `inline` to `li`. inline comes from processInline
	      // so is an array of content
	      function add(li, loose, inline, nl) {
	        if ( loose ) {
	          li.push( [ "para" ].concat(inline) );
	          return;
	        }
	        // Hmmm, should this be any block level element or just paras?
	        var add_to = li[li.length -1] instanceof Array && li[li.length - 1][0] == "para"
	                   ? li[li.length -1]
	                   : li;

	        // If there is already some content in this list, add the new line in
	        if ( nl && li.length > 1 ) inline.unshift(nl);

	        for ( var i = 0; i < inline.length; i++ ) {
	          var what = inline[i],
	              is_str = typeof what == "string";
	          if ( is_str && add_to.length > 1 && typeof add_to[add_to.length-1] == "string" ) {
	            add_to[ add_to.length-1 ] += what;
	          }
	          else {
	            add_to.push( what );
	          }
	        }
	      }

	      // contained means have an indent greater than the current one. On
	      // *every* line in the block
	      function get_contained_blocks( depth, blocks ) {

	        var re = new RegExp( "^(" + indent_re + "{" + depth + "}.*?\\n?)*$" ),
	            replace = new RegExp("^" + indent_re + "{" + depth + "}", "gm"),
	            ret = [];

	        while ( blocks.length > 0 ) {
	          if ( re.exec( blocks[0] ) ) {
	            var b = blocks.shift(),
	                // Now remove that indent
	                x = b.replace( replace, "");

	            ret.push( mk_block( x, b.trailing, b.lineNumber ) );
	          }
	          else {
	            break;
	          }
	        }
	        return ret;
	      }

	      // passed to stack.forEach to turn list items up the stack into paras
	      function paragraphify(s, i, stack) {
	        var list = s.list;
	        var last_li = list[list.length-1];

	        if ( last_li[1] instanceof Array && last_li[1][0] == "para" ) {
	          return;
	        }
	        if ( i + 1 == stack.length ) {
	          // Last stack frame
	          // Keep the same array, but replace the contents
	          last_li.push( ["para"].concat( last_li.splice(1, last_li.length - 1) ) );
	        }
	        else {
	          var sublist = last_li.pop();
	          last_li.push( ["para"].concat( last_li.splice(1, last_li.length - 1) ), sublist );
	        }
	      }

	      // The matcher function
	      return function( block, next ) {
	        var m = block.match( is_list_re );
	        if ( !m ) return undefined;

	        function make_list( m ) {
	          var list = bullet_list.exec( m[2] )
	                   ? ["bulletlist"]
	                   : ["numberlist"];

	          stack.push( { list: list, indent: m[1] } );
	          return list;
	        }


	        var stack = [], // Stack of lists for nesting.
	            list = make_list( m ),
	            last_li,
	            loose = false,
	            ret = [ stack[0].list ],
	            i;

	        // Loop to search over block looking for inner block elements and loose lists
	        loose_search:
	        while ( true ) {
	          // Split into lines preserving new lines at end of line
	          var lines = block.split( /(?=\n)/ );

	          // We have to grab all lines for a li and call processInline on them
	          // once as there are some inline things that can span lines.
	          var li_accumulate = "";

	          // Loop over the lines in this block looking for tight lists.
	          tight_search:
	          for ( var line_no = 0; line_no < lines.length; line_no++ ) {
	            var nl = "",
	                l = lines[line_no].replace(/^\n/, function(n) { nl = n; return ""; });

	            // TODO: really should cache this
	            var line_re = regex_for_depth( stack.length );

	            m = l.match( line_re );
	            //print( "line:", uneval(l), "\nline match:", uneval(m) );

	            // We have a list item
	            if ( m[1] !== undefined ) {
	              // Process the previous list item, if any
	              if ( li_accumulate.length ) {
	                add( last_li, loose, this.processInline( li_accumulate ), nl );
	                // Loose mode will have been dealt with. Reset it
	                loose = false;
	                li_accumulate = "";
	              }

	              m[1] = expand_tab( m[1] );
	              var wanted_depth = Math.floor(m[1].length/4)+1;
	              //print( "want:", wanted_depth, "stack:", stack.length);
	              if ( wanted_depth > stack.length ) {
	                // Deep enough for a nested list outright
	                //print ( "new nested list" );
	                list = make_list( m );
	                last_li.push( list );
	                last_li = list[1] = [ "listitem" ];
	              }
	              else {
	                // We aren't deep enough to be strictly a new level. This is
	                // where Md.pl goes nuts. If the indent matches a level in the
	                // stack, put it there, else put it one deeper then the
	                // wanted_depth deserves.
	                var found = false;
	                for ( i = 0; i < stack.length; i++ ) {
	                  if ( stack[ i ].indent != m[1] ) continue;
	                  list = stack[ i ].list;
	                  stack.splice( i+1, stack.length - (i+1) );
	                  found = true;
	                  break;
	                }

	                if (!found) {
	                  //print("not found. l:", uneval(l));
	                  wanted_depth++;
	                  if ( wanted_depth <= stack.length ) {
	                    stack.splice(wanted_depth, stack.length - wanted_depth);
	                    //print("Desired depth now", wanted_depth, "stack:", stack.length);
	                    list = stack[wanted_depth-1].list;
	                    //print("list:", uneval(list) );
	                  }
	                  else {
	                    //print ("made new stack for messy indent");
	                    list = make_list(m);
	                    last_li.push(list);
	                  }
	                }

	                //print( uneval(list), "last", list === stack[stack.length-1].list );
	                last_li = [ "listitem" ];
	                list.push(last_li);
	              } // end depth of shenegains
	              nl = "";
	            }

	            // Add content
	            if ( l.length > m[0].length ) {
	              li_accumulate += nl + l.substr( m[0].length );
	            }
	          } // tight_search

	          if ( li_accumulate.length ) {
	            add( last_li, loose, this.processInline( li_accumulate ), nl );
	            // Loose mode will have been dealt with. Reset it
	            loose = false;
	            li_accumulate = "";
	          }

	          // Look at the next block - we might have a loose list. Or an extra
	          // paragraph for the current li
	          var contained = get_contained_blocks( stack.length, next );

	          // Deal with code blocks or properly nested lists
	          if ( contained.length > 0 ) {
	            // Make sure all listitems up the stack are paragraphs
	            forEach( stack, paragraphify, this);

	            last_li.push.apply( last_li, this.toTree( contained, [] ) );
	          }

	          var next_block = next[0] && next[0].valueOf() || "";

	          if ( next_block.match(is_list_re) || next_block.match( /^ / ) ) {
	            block = next.shift();

	            // Check for an HR following a list: features/lists/hr_abutting
	            var hr = this.dialect.block.horizRule( block, next );

	            if ( hr ) {
	              ret.push.apply(ret, hr);
	              break;
	            }

	            // Make sure all listitems up the stack are paragraphs
	            forEach( stack, paragraphify, this);

	            loose = true;
	            continue loose_search;
	          }
	          break;
	        } // loose_search

	        return ret;
	      };
	    })(),

	    blockquote: function blockquote( block, next ) {
	      if ( !block.match( /^>/m ) )
	        return undefined;

	      var jsonml = [];

	      // separate out the leading abutting block, if any. I.e. in this case:
	      //
	      //  a
	      //  > b
	      //
	      if ( block[ 0 ] != ">" ) {
	        var lines = block.split( /\n/ ),
	            prev = [],
	            line_no = block.lineNumber;

	        // keep shifting lines until you find a crotchet
	        while ( lines.length && lines[ 0 ][ 0 ] != ">" ) {
	            prev.push( lines.shift() );
	            line_no++;
	        }

	        var abutting = mk_block( prev.join( "\n" ), "\n", block.lineNumber );
	        jsonml.push.apply( jsonml, this.processBlock( abutting, [] ) );
	        // reassemble new block of just block quotes!
	        block = mk_block( lines.join( "\n" ), block.trailing, line_no );
	      }


	      // if the next block is also a blockquote merge it in
	      while ( next.length && next[ 0 ][ 0 ] == ">" ) {
	        var b = next.shift();
	        block = mk_block( block + block.trailing + b, b.trailing, block.lineNumber );
	      }

	      // Strip off the leading "> " and re-process as a block.
	      var input = block.replace( /^> ?/gm, "" ),
	          old_tree = this.tree,
	          processedBlock = this.toTree( input, [ "blockquote" ] ),
	          attr = extract_attr( processedBlock );

	      // If any link references were found get rid of them
	      if ( attr && attr.references ) {
	        delete attr.references;
	        // And then remove the attribute object if it's empty
	        if ( isEmpty( attr ) ) {
	          processedBlock.splice( 1, 1 );
	        }
	      }

	      jsonml.push( processedBlock );
	      return jsonml;
	    },

	    referenceDefn: function referenceDefn( block, next) {
	      var re = /^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;
	      // interesting matches are [ , ref_id, url, , title, title ]

	      if ( !block.match(re) )
	        return undefined;

	      // make an attribute node if it doesn't exist
	      if ( !extract_attr( this.tree ) ) {
	        this.tree.splice( 1, 0, {} );
	      }

	      var attrs = extract_attr( this.tree );

	      // make a references hash if it doesn't exist
	      if ( attrs.references === undefined ) {
	        attrs.references = {};
	      }

	      var b = this.loop_re_over_block(re, block, function( m ) {

	        if ( m[2] && m[2][0] == "<" && m[2][m[2].length-1] == ">" )
	          m[2] = m[2].substring( 1, m[2].length - 1 );

	        var ref = attrs.references[ m[1].toLowerCase() ] = {
	          href: m[2]
	        };

	        if ( m[4] !== undefined )
	          ref.title = m[4];
	        else if ( m[5] !== undefined )
	          ref.title = m[5];

	      } );

	      if ( b.length )
	        next.unshift( mk_block( b, block.trailing ) );

	      return [];
	    },

	    para: function para( block, next ) {
	      // everything's a para!
	      return [ ["para"].concat( this.processInline( block ) ) ];
	    }
	  }
	};

	Markdown.dialects.Gruber.inline = {

	    __oneElement__: function oneElement( text, patterns_or_re, previous_nodes ) {
	      var m,
	          res,
	          lastIndex = 0;

	      patterns_or_re = patterns_or_re || this.dialect.inline.__patterns__;
	      var re = new RegExp( "([\\s\\S]*?)(" + (patterns_or_re.source || patterns_or_re) + ")" );

	      m = re.exec( text );
	      if (!m) {
	        // Just boring text
	        return [ text.length, text ];
	      }
	      else if ( m[1] ) {
	        // Some un-interesting text matched. Return that first
	        return [ m[1].length, m[1] ];
	      }

	      var res;
	      if ( m[2] in this.dialect.inline ) {
	        res = this.dialect.inline[ m[2] ].call(
	                  this,
	                  text.substr( m.index ), m, previous_nodes || [] );
	      }
	      // Default for now to make dev easier. just slurp special and output it.
	      res = res || [ m[2].length, m[2] ];
	      return res;
	    },

	    __call__: function inline( text, patterns ) {

	      var out = [],
	          res;

	      function add(x) {
	        //D:self.debug("  adding output", uneval(x));
	        if ( typeof x == "string" && typeof out[out.length-1] == "string" )
	          out[ out.length-1 ] += x;
	        else
	          out.push(x);
	      }

	      while ( text.length > 0 ) {
	        res = this.dialect.inline.__oneElement__.call(this, text, patterns, out );
	        text = text.substr( res.shift() );
	        forEach(res, add )
	      }

	      return out;
	    },

	    // These characters are intersting elsewhere, so have rules for them so that
	    // chunks of plain text blocks don't include them
	    "]": function () {},
	    "}": function () {},

	    __escape__ : /^\\[\\`\*_{}\[\]()#\+.!\-]/,

	    "\\": function escaped( text ) {
	      // [ length of input processed, node/children to add... ]
	      // Only esacape: \ ` * _ { } [ ] ( ) # * + - . !
	      if ( this.dialect.inline.__escape__.exec( text ) )
	        return [ 2, text.charAt( 1 ) ];
	      else
	        // Not an esacpe
	        return [ 1, "\\" ];
	    },

	    "![": function image( text ) {

	      // Unlike images, alt text is plain text only. no other elements are
	      // allowed in there

	      // ![Alt text](/path/to/img.jpg "Optional title")
	      //      1          2            3       4         <--- captures
	      var m = text.match( /^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/ );

	      if ( m ) {
	        if ( m[2] && m[2][0] == "<" && m[2][m[2].length-1] == ">" )
	          m[2] = m[2].substring( 1, m[2].length - 1 );

	        m[2] = this.dialect.inline.__call__.call( this, m[2], /\\/ )[0];

	        var attrs = { alt: m[1], href: m[2] || "" };
	        if ( m[4] !== undefined)
	          attrs.title = m[4];

	        return [ m[0].length, [ "img", attrs ] ];
	      }

	      // ![Alt text][id]
	      m = text.match( /^!\[(.*?)\][ \t]*\[(.*?)\]/ );

	      if ( m ) {
	        // We can't check if the reference is known here as it likely wont be
	        // found till after. Check it in md tree->hmtl tree conversion
	        return [ m[0].length, [ "img_ref", { alt: m[1], ref: m[2].toLowerCase(), original: m[0] } ] ];
	      }

	      // Just consume the '!['
	      return [ 2, "![" ];
	    },

	    "[": function link( text ) {

	      var orig = String(text);
	      // Inline content is possible inside `link text`
	      var res = Markdown.DialectHelpers.inline_until_char.call( this, text.substr(1), "]" );

	      // No closing ']' found. Just consume the [
	      if ( !res ) return [ 1, "[" ];

	      var consumed = 1 + res[ 0 ],
	          children = res[ 1 ],
	          link,
	          attrs;

	      // At this point the first [...] has been parsed. See what follows to find
	      // out which kind of link we are (reference or direct url)
	      text = text.substr( consumed );

	      // [link text](/path/to/img.jpg "Optional title")
	      //                 1            2       3         <--- captures
	      // This will capture up to the last paren in the block. We then pull
	      // back based on if there a matching ones in the url
	      //    ([here](/url/(test))
	      // The parens have to be balanced
	      var m = text.match( /^\s*\([ \t]*([^"']*)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/ );
	      if ( m ) {
	        var url = m[1];
	        consumed += m[0].length;

	        if ( url && url[0] == "<" && url[url.length-1] == ">" )
	          url = url.substring( 1, url.length - 1 );

	        // If there is a title we don't have to worry about parens in the url
	        if ( !m[3] ) {
	          var open_parens = 1; // One open that isn't in the capture
	          for ( var len = 0; len < url.length; len++ ) {
	            switch ( url[len] ) {
	            case "(":
	              open_parens++;
	              break;
	            case ")":
	              if ( --open_parens == 0) {
	                consumed -= url.length - len;
	                url = url.substring(0, len);
	              }
	              break;
	            }
	          }
	        }

	        // Process escapes only
	        url = this.dialect.inline.__call__.call( this, url, /\\/ )[0];

	        attrs = { href: url || "" };
	        if ( m[3] !== undefined)
	          attrs.title = m[3];

	        link = [ "link", attrs ].concat( children );
	        return [ consumed, link ];
	      }

	      // [Alt text][id]
	      // [Alt text] [id]
	      m = text.match( /^\s*\[(.*?)\]/ );

	      if ( m ) {

	        consumed += m[ 0 ].length;

	        // [links][] uses links as its reference
	        attrs = { ref: ( m[ 1 ] || String(children) ).toLowerCase(),  original: orig.substr( 0, consumed ) };

	        link = [ "link_ref", attrs ].concat( children );

	        // We can't check if the reference is known here as it likely wont be
	        // found till after. Check it in md tree->hmtl tree conversion.
	        // Store the original so that conversion can revert if the ref isn't found.
	        return [ consumed, link ];
	      }

	      // [id]
	      // Only if id is plain (no formatting.)
	      if ( children.length == 1 && typeof children[0] == "string" ) {

	        attrs = { ref: children[0].toLowerCase(),  original: orig.substr( 0, consumed ) };
	        link = [ "link_ref", attrs, children[0] ];
	        return [ consumed, link ];
	      }

	      // Just consume the "["
	      return [ 1, "[" ];
	    },


	    "<": function autoLink( text ) {
	      var m;

	      if ( ( m = text.match( /^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/ ) ) != null ) {
	        if ( m[3] ) {
	          return [ m[0].length, [ "link", { href: "mailto:" + m[3] }, m[3] ] ];

	        }
	        else if ( m[2] == "mailto" ) {
	          return [ m[0].length, [ "link", { href: m[1] }, m[1].substr("mailto:".length ) ] ];
	        }
	        else
	          return [ m[0].length, [ "link", { href: m[1] }, m[1] ] ];
	      }

	      return [ 1, "<" ];
	    },

	    "`": function inlineCode( text ) {
	      // Inline code block. as many backticks as you like to start it
	      // Always skip over the opening ticks.
	      var m = text.match( /(`+)(([\s\S]*?)\1)/ );

	      if ( m && m[2] )
	        return [ m[1].length + m[2].length, [ "inlinecode", m[3] ] ];
	      else {
	        // TODO: No matching end code found - warn!
	        return [ 1, "`" ];
	      }
	    },

	    "  \n": function lineBreak( text ) {
	      return [ 3, [ "linebreak" ] ];
	    }

	};

	// Meta Helper/generator method for em and strong handling
	function strong_em( tag, md ) {

	  var state_slot = tag + "_state",
	      other_slot = tag == "strong" ? "em_state" : "strong_state";

	  function CloseTag(len) {
	    this.len_after = len;
	    this.name = "close_" + md;
	  }

	  return function ( text, orig_match ) {

	    if ( this[state_slot][0] == md ) {
	      // Most recent em is of this type
	      //D:this.debug("closing", md);
	      this[state_slot].shift();

	      // "Consume" everything to go back to the recrusion in the else-block below
	      return[ text.length, new CloseTag(text.length-md.length) ];
	    }
	    else {
	      // Store a clone of the em/strong states
	      var other = this[other_slot].slice(),
	          state = this[state_slot].slice();

	      this[state_slot].unshift(md);

	      //D:this.debug_indent += "  ";

	      // Recurse
	      var res = this.processInline( text.substr( md.length ) );
	      //D:this.debug_indent = this.debug_indent.substr(2);

	      var last = res[res.length - 1];

	      //D:this.debug("processInline from", tag + ": ", uneval( res ) );

	      var check = this[state_slot].shift();
	      if ( last instanceof CloseTag ) {
	        res.pop();
	        // We matched! Huzzah.
	        var consumed = text.length - last.len_after;
	        return [ consumed, [ tag ].concat(res) ];
	      }
	      else {
	        // Restore the state of the other kind. We might have mistakenly closed it.
	        this[other_slot] = other;
	        this[state_slot] = state;

	        // We can't reuse the processed result as it could have wrong parsing contexts in it.
	        return [ md.length, md ];
	      }
	    }
	  }; // End returned function
	}

	Markdown.dialects.Gruber.inline["**"] = strong_em("strong", "**");
	Markdown.dialects.Gruber.inline["__"] = strong_em("strong", "__");
	Markdown.dialects.Gruber.inline["*"]  = strong_em("em", "*");
	Markdown.dialects.Gruber.inline["_"]  = strong_em("em", "_");


	// Build default order from insertion order.
	Markdown.buildBlockOrder = function(d) {
	  var ord = [];
	  for ( var i in d ) {
	    if ( i == "__order__" || i == "__call__" ) continue;
	    ord.push( i );
	  }
	  d.__order__ = ord;
	};

	// Build patterns for inline matcher
	Markdown.buildInlinePatterns = function(d) {
	  var patterns = [];

	  for ( var i in d ) {
	    // __foo__ is reserved and not a pattern
	    if ( i.match( /^__.*__$/) ) continue;
	    var l = i.replace( /([\\.*+?|()\[\]{}])/g, "\\$1" )
	             .replace( /\n/, "\\n" );
	    patterns.push( i.length == 1 ? l : "(?:" + l + ")" );
	  }

	  patterns = patterns.join("|");
	  d.__patterns__ = patterns;
	  //print("patterns:", uneval( patterns ) );

	  var fn = d.__call__;
	  d.__call__ = function(text, pattern) {
	    if ( pattern != undefined ) {
	      return fn.call(this, text, pattern);
	    }
	    else
	    {
	      return fn.call(this, text, patterns);
	    }
	  };
	};

	Markdown.DialectHelpers = {};
	Markdown.DialectHelpers.inline_until_char = function( text, want ) {
	  var consumed = 0,
	      nodes = [];

	  while ( true ) {
	    if ( text.charAt( consumed ) == want ) {
	      // Found the character we were looking for
	      consumed++;
	      return [ consumed, nodes ];
	    }

	    if ( consumed >= text.length ) {
	      // No closing char found. Abort.
	      return null;
	    }

	    var res = this.dialect.inline.__oneElement__.call(this, text.substr( consumed ) );
	    consumed += res[ 0 ];
	    // Add any returned nodes.
	    nodes.push.apply( nodes, res.slice( 1 ) );
	  }
	}

	// Helper function to make sub-classing a dialect easier
	Markdown.subclassDialect = function( d ) {
	  function Block() {}
	  Block.prototype = d.block;
	  function Inline() {}
	  Inline.prototype = d.inline;

	  return { block: new Block(), inline: new Inline() };
	};

	Markdown.buildBlockOrder ( Markdown.dialects.Gruber.block );
	Markdown.buildInlinePatterns( Markdown.dialects.Gruber.inline );

	Markdown.dialects.Maruku = Markdown.subclassDialect( Markdown.dialects.Gruber );

	Markdown.dialects.Maruku.processMetaHash = function processMetaHash( meta_string ) {
	  var meta = split_meta_hash( meta_string ),
	      attr = {};

	  for ( var i = 0; i < meta.length; ++i ) {
	    // id: #foo
	    if ( /^#/.test( meta[ i ] ) ) {
	      attr.id = meta[ i ].substring( 1 );
	    }
	    // class: .foo
	    else if ( /^\./.test( meta[ i ] ) ) {
	      // if class already exists, append the new one
	      if ( attr["class"] ) {
	        attr["class"] = attr["class"] + meta[ i ].replace( /./, " " );
	      }
	      else {
	        attr["class"] = meta[ i ].substring( 1 );
	      }
	    }
	    // attribute: foo=bar
	    else if ( /\=/.test( meta[ i ] ) ) {
	      var s = meta[ i ].split( /\=/ );
	      attr[ s[ 0 ] ] = s[ 1 ];
	    }
	  }

	  return attr;
	}

	function split_meta_hash( meta_string ) {
	  var meta = meta_string.split( "" ),
	      parts = [ "" ],
	      in_quotes = false;

	  while ( meta.length ) {
	    var letter = meta.shift();
	    switch ( letter ) {
	      case " " :
	        // if we're in a quoted section, keep it
	        if ( in_quotes ) {
	          parts[ parts.length - 1 ] += letter;
	        }
	        // otherwise make a new part
	        else {
	          parts.push( "" );
	        }
	        break;
	      case "'" :
	      case '"' :
	        // reverse the quotes and move straight on
	        in_quotes = !in_quotes;
	        break;
	      case "\\" :
	        // shift off the next letter to be used straight away.
	        // it was escaped so we'll keep it whatever it is
	        letter = meta.shift();
	      default :
	        parts[ parts.length - 1 ] += letter;
	        break;
	    }
	  }

	  return parts;
	}

	Markdown.dialects.Maruku.block.document_meta = function document_meta( block, next ) {
	  // we're only interested in the first block
	  if ( block.lineNumber > 1 ) return undefined;

	  // document_meta blocks consist of one or more lines of `Key: Value\n`
	  if ( ! block.match( /^(?:\w+:.*\n)*\w+:.*$/ ) ) return undefined;

	  // make an attribute node if it doesn't exist
	  if ( !extract_attr( this.tree ) ) {
	    this.tree.splice( 1, 0, {} );
	  }

	  var pairs = block.split( /\n/ );
	  for ( p in pairs ) {
	    var m = pairs[ p ].match( /(\w+):\s*(.*)$/ ),
	        key = m[ 1 ].toLowerCase(),
	        value = m[ 2 ];

	    this.tree[ 1 ][ key ] = value;
	  }

	  // document_meta produces no content!
	  return [];
	};

	Markdown.dialects.Maruku.block.block_meta = function block_meta( block, next ) {
	  // check if the last line of the block is an meta hash
	  var m = block.match( /(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/ );
	  if ( !m ) return undefined;

	  // process the meta hash
	  var attr = this.dialect.processMetaHash( m[ 2 ] );

	  var hash;

	  // if we matched ^ then we need to apply meta to the previous block
	  if ( m[ 1 ] === "" ) {
	    var node = this.tree[ this.tree.length - 1 ];
	    hash = extract_attr( node );

	    // if the node is a string (rather than JsonML), bail
	    if ( typeof node === "string" ) return undefined;

	    // create the attribute hash if it doesn't exist
	    if ( !hash ) {
	      hash = {};
	      node.splice( 1, 0, hash );
	    }

	    // add the attributes in
	    for ( a in attr ) {
	      hash[ a ] = attr[ a ];
	    }

	    // return nothing so the meta hash is removed
	    return [];
	  }

	  // pull the meta hash off the block and process what's left
	  var b = block.replace( /\n.*$/, "" ),
	      result = this.processBlock( b, [] );

	  // get or make the attributes hash
	  hash = extract_attr( result[ 0 ] );
	  if ( !hash ) {
	    hash = {};
	    result[ 0 ].splice( 1, 0, hash );
	  }

	  // attach the attributes to the block
	  for ( a in attr ) {
	    hash[ a ] = attr[ a ];
	  }

	  return result;
	};

	Markdown.dialects.Maruku.block.definition_list = function definition_list( block, next ) {
	  // one or more terms followed by one or more definitions, in a single block
	  var tight = /^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,
	      list = [ "dl" ],
	      i, m;

	  // see if we're dealing with a tight or loose block
	  if ( ( m = block.match( tight ) ) ) {
	    // pull subsequent tight DL blocks out of `next`
	    var blocks = [ block ];
	    while ( next.length && tight.exec( next[ 0 ] ) ) {
	      blocks.push( next.shift() );
	    }

	    for ( var b = 0; b < blocks.length; ++b ) {
	      var m = blocks[ b ].match( tight ),
	          terms = m[ 1 ].replace( /\n$/, "" ).split( /\n/ ),
	          defns = m[ 2 ].split( /\n:\s+/ );

	      // print( uneval( m ) );

	      for ( i = 0; i < terms.length; ++i ) {
	        list.push( [ "dt", terms[ i ] ] );
	      }

	      for ( i = 0; i < defns.length; ++i ) {
	        // run inline processing over the definition
	        list.push( [ "dd" ].concat( this.processInline( defns[ i ].replace( /(\n)\s+/, "$1" ) ) ) );
	      }
	    }
	  }
	  else {
	    return undefined;
	  }

	  return [ list ];
	};

	// splits on unescaped instances of @ch. If @ch is not a character the result
	// can be unpredictable

	Markdown.dialects.Maruku.block.table = function table (block, next) {

	    var _split_on_unescaped = function(s, ch) {
	        ch = ch || '\\s';
	        if (ch.match(/^[\\|\[\]{}?*.+^$]$/)) { ch = '\\' + ch; }
	        var res = [ ],
	            r = new RegExp('^((?:\\\\.|[^\\\\' + ch + '])*)' + ch + '(.*)'),
	            m;
	        while(m = s.match(r)) {
	            res.push(m[1]);
	            s = m[2];
	        }
	        res.push(s);
	        return res;
	    }

	    var leading_pipe = /^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/,
	        // find at least an unescaped pipe in each line
	        no_leading_pipe = /^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/,
	        i, m;
	    if (m = block.match(leading_pipe)) {
	        // remove leading pipes in contents
	        // (header and horizontal rule already have the leading pipe left out)
	        m[3] = m[3].replace(/^\s*\|/gm, '');
	    } else if (! ( m = block.match(no_leading_pipe))) {
	        return undefined;
	    }

	    var table = [ "table", [ "thead", [ "tr" ] ], [ "tbody" ] ];

	    // remove trailing pipes, then split on pipes
	    // (no escaped pipes are allowed in horizontal rule)
	    m[2] = m[2].replace(/\|\s*$/, '').split('|');

	    // process alignment
	    var html_attrs = [ ];
	    forEach (m[2], function (s) {
	        if (s.match(/^\s*-+:\s*$/))       html_attrs.push({align: "right"});
	        else if (s.match(/^\s*:-+\s*$/))  html_attrs.push({align: "left"});
	        else if (s.match(/^\s*:-+:\s*$/)) html_attrs.push({align: "center"});
	        else                              html_attrs.push({});
	    });

	    // now for the header, avoid escaped pipes
	    m[1] = _split_on_unescaped(m[1].replace(/\|\s*$/, ''), '|');
	    for (i = 0; i < m[1].length; i++) {
	        table[1][1].push(['th', html_attrs[i] || {}].concat(
	            this.processInline(m[1][i].trim())));
	    }

	    // now for body contents
	    forEach (m[3].replace(/\|\s*$/mg, '').split('\n'), function (row) {
	        var html_row = ['tr'];
	        row = _split_on_unescaped(row, '|');
	        for (i = 0; i < row.length; i++) {
	            html_row.push(['td', html_attrs[i] || {}].concat(this.processInline(row[i].trim())));
	        }
	        table[2].push(html_row);
	    }, this);

	    return [table];
	}

	Markdown.dialects.Maruku.inline[ "{:" ] = function inline_meta( text, matches, out ) {
	  if ( !out.length ) {
	    return [ 2, "{:" ];
	  }

	  // get the preceeding element
	  var before = out[ out.length - 1 ];

	  if ( typeof before === "string" ) {
	    return [ 2, "{:" ];
	  }

	  // match a meta hash
	  var m = text.match( /^\{:\s*((?:\\\}|[^\}])*)\s*\}/ );

	  // no match, false alarm
	  if ( !m ) {
	    return [ 2, "{:" ];
	  }

	  // attach the attributes to the preceeding element
	  var meta = this.dialect.processMetaHash( m[ 1 ] ),
	      attr = extract_attr( before );

	  if ( !attr ) {
	    attr = {};
	    before.splice( 1, 0, attr );
	  }

	  for ( var k in meta ) {
	    attr[ k ] = meta[ k ];
	  }

	  // cut out the string and replace it with nothing
	  return [ m[ 0 ].length, "" ];
	};

	Markdown.dialects.Maruku.inline.__escape__ = /^\\[\\`\*_{}\[\]()#\+.!\-|:]/;

	Markdown.buildBlockOrder ( Markdown.dialects.Maruku.block );
	Markdown.buildInlinePatterns( Markdown.dialects.Maruku.inline );

	var isArray = Array.isArray || function(obj) {
	  return Object.prototype.toString.call(obj) == "[object Array]";
	};

	var forEach;
	// Don't mess with Array.prototype. Its not friendly
	if ( Array.prototype.forEach ) {
	  forEach = function( arr, cb, thisp ) {
	    return arr.forEach( cb, thisp );
	  };
	}
	else {
	  forEach = function(arr, cb, thisp) {
	    for (var i = 0; i < arr.length; i++) {
	      cb.call(thisp || arr, arr[i], i, arr);
	    }
	  }
	}

	var isEmpty = function( obj ) {
	  for ( var key in obj ) {
	    if ( hasOwnProperty.call( obj, key ) ) {
	      return false;
	    }
	  }

	  return true;
	}

	function extract_attr( jsonml ) {
	  return isArray(jsonml)
	      && jsonml.length > 1
	      && typeof jsonml[ 1 ] === "object"
	      && !( isArray(jsonml[ 1 ]) )
	      ? jsonml[ 1 ]
	      : undefined;
	}



	/**
	 *  renderJsonML( jsonml[, options] ) -> String
	 *  - jsonml (Array): JsonML array to render to XML
	 *  - options (Object): options
	 *
	 *  Converts the given JsonML into well-formed XML.
	 *
	 *  The options currently understood are:
	 *
	 *  - root (Boolean): wether or not the root node should be included in the
	 *    output, or just its children. The default `false` is to not include the
	 *    root itself.
	 */
	expose.renderJsonML = function( jsonml, options ) {
	  options = options || {};
	  // include the root element in the rendered output?
	  options.root = options.root || false;

	  var content = [];

	  if ( options.root ) {
	    content.push( render_tree( jsonml ) );
	  }
	  else {
	    jsonml.shift(); // get rid of the tag
	    if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
	      jsonml.shift(); // get rid of the attributes
	    }

	    while ( jsonml.length ) {
	      content.push( render_tree( jsonml.shift() ) );
	    }
	  }

	  return content.join( "\n\n" );
	};

	function escapeHTML( text ) {
	  return text.replace( /&/g, "&amp;" )
	             .replace( /</g, "&lt;" )
	             .replace( />/g, "&gt;" )
	             .replace( /"/g, "&quot;" )
	             .replace( /'/g, "&#39;" );
	}

	function render_tree( jsonml ) {
	  // basic case
	  if ( typeof jsonml === "string" ) {
	    return escapeHTML( jsonml );
	  }

	  var tag = jsonml.shift(),
	      attributes = {},
	      content = [];

	  if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
	    attributes = jsonml.shift();
	  }

	  while ( jsonml.length ) {
	    content.push( render_tree( jsonml.shift() ) );
	  }

	  var tag_attrs = "";
	  for ( var a in attributes ) {
	    tag_attrs += " " + a + '="' + escapeHTML( attributes[ a ] ) + '"';
	  }

	  // be careful about adding whitespace here for inline elements
	  if ( tag == "img" || tag == "br" || tag == "hr" ) {
	    return "<"+ tag + tag_attrs + "/>";
	  }
	  else {
	    return "<"+ tag + tag_attrs + ">" + content.join( "" ) + "</" + tag + ">";
	  }
	}

	function convert_tree_to_html( tree, references, options ) {
	  var i;
	  options = options || {};

	  // shallow clone
	  var jsonml = tree.slice( 0 );

	  if ( typeof options.preprocessTreeNode === "function" ) {
	      jsonml = options.preprocessTreeNode(jsonml, references);
	  }

	  // Clone attributes if they exist
	  var attrs = extract_attr( jsonml );
	  if ( attrs ) {
	    jsonml[ 1 ] = {};
	    for ( i in attrs ) {
	      jsonml[ 1 ][ i ] = attrs[ i ];
	    }
	    attrs = jsonml[ 1 ];
	  }

	  // basic case
	  if ( typeof jsonml === "string" ) {
	    return jsonml;
	  }

	  // convert this node
	  switch ( jsonml[ 0 ] ) {
	    case "header":
	      jsonml[ 0 ] = "h" + jsonml[ 1 ].level;
	      delete jsonml[ 1 ].level;
	      break;
	    case "bulletlist":
	      jsonml[ 0 ] = "ul";
	      break;
	    case "numberlist":
	      jsonml[ 0 ] = "ol";
	      break;
	    case "listitem":
	      jsonml[ 0 ] = "li";
	      break;
	    case "para":
	      jsonml[ 0 ] = "p";
	      break;
	    case "markdown":
	      jsonml[ 0 ] = "html";
	      if ( attrs ) delete attrs.references;
	      break;
	    case "code_block":
	      jsonml[ 0 ] = "pre";
	      i = attrs ? 2 : 1;
	      var code = [ "code" ];
	      code.push.apply( code, jsonml.splice( i, jsonml.length - i ) );
	      jsonml[ i ] = code;
	      break;
	    case "inlinecode":
	      jsonml[ 0 ] = "code";
	      break;
	    case "img":
	      jsonml[ 1 ].src = jsonml[ 1 ].href;
	      delete jsonml[ 1 ].href;
	      break;
	    case "linebreak":
	      jsonml[ 0 ] = "br";
	    break;
	    case "link":
	      jsonml[ 0 ] = "a";
	      break;
	    case "link_ref":
	      jsonml[ 0 ] = "a";

	      // grab this ref and clean up the attribute node
	      var ref = references[ attrs.ref ];

	      // if the reference exists, make the link
	      if ( ref ) {
	        delete attrs.ref;

	        // add in the href and title, if present
	        attrs.href = ref.href;
	        if ( ref.title ) {
	          attrs.title = ref.title;
	        }

	        // get rid of the unneeded original text
	        delete attrs.original;
	      }
	      // the reference doesn't exist, so revert to plain text
	      else {
	        return attrs.original;
	      }
	      break;
	    case "img_ref":
	      jsonml[ 0 ] = "img";

	      // grab this ref and clean up the attribute node
	      var ref = references[ attrs.ref ];

	      // if the reference exists, make the link
	      if ( ref ) {
	        delete attrs.ref;

	        // add in the href and title, if present
	        attrs.src = ref.href;
	        if ( ref.title ) {
	          attrs.title = ref.title;
	        }

	        // get rid of the unneeded original text
	        delete attrs.original;
	      }
	      // the reference doesn't exist, so revert to plain text
	      else {
	        return attrs.original;
	      }
	      break;
	  }

	  // convert all the children
	  i = 1;

	  // deal with the attribute node, if it exists
	  if ( attrs ) {
	    // if there are keys, skip over it
	    for ( var key in jsonml[ 1 ] ) {
	        i = 2;
	        break;
	    }
	    // if there aren't, remove it
	    if ( i === 1 ) {
	      jsonml.splice( i, 1 );
	    }
	  }

	  for ( ; i < jsonml.length; ++i ) {
	    jsonml[ i ] = convert_tree_to_html( jsonml[ i ], references, options );
	  }

	  return jsonml;
	}


	// merges adjacent text nodes into a single node
	function merge_text_nodes( jsonml ) {
	  // skip the tag name and attribute hash
	  var i = extract_attr( jsonml ) ? 2 : 1;

	  while ( i < jsonml.length ) {
	    // if it's a string check the next item too
	    if ( typeof jsonml[ i ] === "string" ) {
	      if ( i + 1 < jsonml.length && typeof jsonml[ i + 1 ] === "string" ) {
	        // merge the second string into the first and remove it
	        jsonml[ i ] += jsonml.splice( i + 1, 1 )[ 0 ];
	      }
	      else {
	        ++i;
	      }
	    }
	    // if it's not a string recurse
	    else {
	      merge_text_nodes( jsonml[ i ] );
	      ++i;
	    }
	  }
	}

	} )( (function() {
	  if ( false ) {
	    window.markdown = {};
	    return window.markdown;
	  }
	  else {
	    return exports;
	  }
	} )() );

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 303:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(24);
	var Reflux = __webpack_require__(40);
	var Markdown = __webpack_require__(277).markdown;
	var MarkdownEditorActions = __webpack_require__(104);
	var PublicMarkdownEditorActions = __webpack_require__(197);
	var MarkdownSelectionActions = __webpack_require__(161);
	var TextAreaSelectionMixin = __webpack_require__(305);
	var ButtonManagerMixin = __webpack_require__(304);
	var MarkdownEditorStore = __webpack_require__(307);
	var MarkdownSelectionStore = __webpack_require__(309);
	var MarkdownEditorTabsInteractionStore = __webpack_require__(308);
	var MarkdownTokenFactory = __webpack_require__(310);
	var MarkdownUtils = __webpack_require__(311);

	var NullMarkdownToken = MarkdownTokenFactory.NullMarkdownToken;
	var RegularMarkdownToken = MarkdownTokenFactory.RegularMarkdownToken;
	var HeaderMarkdownToken = MarkdownTokenFactory.HeaderMarkdownToken;
	var SubHeaderMarkdownToken = MarkdownTokenFactory.SubHeaderMarkdownToken;
	var UrlMarkdownToken = MarkdownTokenFactory.UrlMarkdownToken;
	var ListMarkdownToken = MarkdownTokenFactory.ListMarkdownToken;
	var ImageMarkdownToken = MarkdownTokenFactory.ImageMarkdownToken;

	var MarkdownEditorMenu = React.createClass({displayName: "MarkdownEditorMenu",
	  mixins: [Reflux.ListenerMixin, ButtonManagerMixin],

	  propTypes: {
	    iconsSet: React.PropTypes.string.isRequired
	  },

	  getInitialState: function() {
	    return {
	      enabled: false
	    };
	  },

	  componentWillMount: function() {
	    this.listenTo(MarkdownSelectionStore, this.handleMarkdownSelectionStore);
	    this.setIconsProvider(this.props.iconsSet);
	  },

	  render: function() {
	    var styleMarkdownMenu = {
	      'margin': '5px 0',
	      'flex': '1',
	      'display': 'flex',
	      'position': 'absolute',
	      'right': '20px',
	      'top': '10px'
	    };

	    var _disabled = (!this.state.enabled) ? 'disabled' : '';
	    var boldButton = this.getBoldButton(_disabled, this.handleBoldButtonClick);
	    var italicButton = this.getItalicButton(_disabled, this.handleItalicButtonClick);
	    var makeListButton = this.getMakeListButton(_disabled, this.handleListButtonClick);
	    var imageButton = this.getImageButton(_disabled, this.handleImageButtonClick);
	    var linkButton = this.getLinkButton(_disabled, this.handleLinkButtonClick);
	    var headerButton = this.getButtonWithoutIcon(_disabled, this.handleHeaderButtonClick, 'md-editor-menu-header', 'Header');
	    var subHeaderButton = this.getButtonWithoutIcon(_disabled, this.handleSubHeaderButtonClick, 'md-editor-menu-subheader', 'Subheader');

	    return (
	      React.createElement("div", {style: styleMarkdownMenu, className: "md-editor-menu"}, 
	        boldButton, 
	        italicButton, 
	        headerButton, 
	        subHeaderButton, 
	        makeListButton, 
	        imageButton, 
	        linkButton
	      )
	    );
	  },

	  handleMarkdownSelectionStore: function(data) {
	    if (data.type === 'clear') {
	      this.setState({enabled: false});
	    } else if (data.type === 'set') {
	      this.setState({enabled: true});
	    }
	  },

	  handleBoldButtonClick: function() {
	    MarkdownEditorActions.makeBold();
	  },

	  handleImageButtonClick: function() {
	    MarkdownEditorActions.makeImage();
	  },

	  handleItalicButtonClick: function() {
	    MarkdownEditorActions.makeItalic();
	  },

	  handleUnderlineButtonClick: function() {
	    MarkdownEditorActions.makeUnderline();
	  },

	  handleHeaderButtonClick: function() {
	    MarkdownEditorActions.makeHeader();
	  },

	  handleSubHeaderButtonClick: function() {
	    MarkdownEditorActions.makeSubHeader();
	  },

	  handleLinkButtonClick: function() {
	    MarkdownEditorActions.makeLink();
	  },

	  handleListButtonClick: function() {
	    MarkdownEditorActions.makeList();
	  }
	});

	var MarkdownEditorTabs = React.createClass({displayName: "MarkdownEditorTabs",
	  mixins: [Reflux.ListenerMixin],

	  getInitialState: function() {
	    return {
	      activeTab: 0
	    };
	  },

	  componentWillMount: function() {
	    this.listenTo(MarkdownEditorTabsInteractionStore, this.handleMDEditorTabsInteractionStoreUpdated);
	  },

	  handleMDEditorTabsInteractionStoreUpdated: function(storeState) {
	    if (storeState.activeTab != null) {
	      this.setState({activeTab: storeState.activeTab});
	    }
	  },

	  render: function() {
	    var styleMarkdownEditorTabs = {
	      'border': 'none',
	      'display': 'flex',
	      'justifyContent': 'flex-start'
	    };

	    var styleTab = {
	      'padding': '0px 20px',
	      'cursor': 'pointer',
	      'display': 'flex',
	      'justifyContent': 'center',
	      'alignItems': 'center',
	      'height': '50px'
	    };

	    var styleActiveTab = {
	      'padding': '0px 20px',
	      'cursor': 'pointer',
	      'display': 'flex',
	      'justifyContent': 'center',
	      'alignItems': 'center',
	      'height': '50px',
	      'borderLeft': '1px solid #ddd',
	      'borderRight': '1px solid #ddd',
	      'borderTop': '1px solid #ddd',
	      'backgroundColor': '#fff',
	      'borderRadius': '3px'
	    };

	    var editorTabStyle;
	    var previewTabStyle;
	    if (this.state.activeTab === 0) {
	      editorTabStyle = styleActiveTab;
	      previewTabStyle = styleTab;
	    } else if (this.state.activeTab === 1) {
	      previewTabStyle = styleActiveTab;
	      editorTabStyle = styleTab;
	    }

	    return (
	      React.createElement("div", {style: styleMarkdownEditorTabs, className: "md-editor-tabs"}, 
	        React.createElement("div", {style: editorTabStyle, 
	          className: "md-editor-tabs-item", 
	          onClick: this.handleClick.bind(this, 'clickEditorTab')}, 
	          React.createElement("span", null, "Editor")
	        ), 
	        React.createElement("div", {style: previewTabStyle, 
	          className: "md-editor-tabs-item", 
	          onClick: this.handleClick.bind(this, 'clickPreviewTab')}, 
	          React.createElement("span", null, "Preview")
	        )
	      )
	    );
	  },

	  handleClick: function(actionName) {
	    MarkdownEditorActions[actionName]();
	  }
	});

	var MarkdownEditorContent = React.createClass({displayName: "MarkdownEditorContent",
	  propTypes: {
	    content: React.PropTypes.string.isRequired,
	    onChangeHandler: React.PropTypes.func.isRequired
	  },

	  mixins: [TextAreaSelectionMixin],

	  render: function() {
	    var styleMarkdownTextArea = {
	      'height': '90%',
	      'width': '100%',
	      'padding': '30px 10px',
	      'border': 'none'
	    };

	    return (
	      React.createElement("textarea", {
	        ref: "editor", 
	        className: "md-editor-textarea", 
	        style: styleMarkdownTextArea, 
	        onChange: this.onChange, 
	        onClick: this.clearSelection, 
	        onKeyUp: this.clearSelection}
	      )
	    );
	  },

	  onChange: function() {
	    var content = this.refs.editor.value;
	    var markdownContent = MarkdownUtils.toMarkdown(content);
	    PublicMarkdownEditorActions.updateText(markdownContent);

	    this.props.onChangeHandler(content.replace(/[\n\r]/g, '\n'));
	  },

	  componentDidMount: function() {
	    this.refs.editor.value = this.props.content;
	  },

	  componentDidUpdate: function() {
	    this.refs.editor.value = this.props.content;
	  }
	});

	var MarkdownEditorPreview = React.createClass({displayName: "MarkdownEditorPreview",
	  propTypes: {
	    content: React.PropTypes.string.isRequired
	  },

	  render: function() {
	    // Breaklines in markdown are actually when a line is ended with two spaces + carriage-return
	    var htmlContent = this.props.content.replace(/[\n]/g, '  \n');
	    htmlContent = Markdown.toHTML(htmlContent);

	    var styleMarkdownPreviewArea = {
	      'height': '90%',
	      'width': '100%',
	      'padding': '30px 10px',
	      'backgroundColor': '#fff',
	      'border': 'none'
	    };

	    return (
	      React.createElement("div", {
	        style: styleMarkdownPreviewArea, 
	        dangerouslySetInnerHTML: {__html: htmlContent}}
	      )
	    );
	  }
	});

	var MarkdownEditor = React.createClass({displayName: "MarkdownEditor",
	  mixins: [Reflux.ListenerMixin],

	  propTypes: {
	    initialContent: React.PropTypes.string.isRequired,
	    iconsSet: React.PropTypes.oneOf(['font-awesome', 'materialize-ui']).isRequired,
	    onContentChange: React.PropTypes.func
	  },

	  getInitialState: function() {
	    return {content: this.props.initialContent, inEditMode: true};
	  },

	  render: function() {
	    var divContent;
	    var editorMenu;

	    if (this.state.inEditMode) {
	      divContent = React.createElement(MarkdownEditorContent, {content: this.state.content, onChangeHandler: this.onChangeHandler});
	      editorMenu = React.createElement(MarkdownEditorMenu, {iconsSet: this.props.iconsSet});
	    } else {
	      divContent = React.createElement(MarkdownEditorPreview, {content: this.state.content});
	      editorMenu = null;
	    }

	    var styleMarkdownEditorHeader = {
	      'display': 'flex',
	      'flexDirection': 'column',
	      'borderBottom': '1px solid #ddd',
	      'marginLeft': '0px',
	      'marginRight': '0px',
	      'minHeight': '50px',
	      'justifyContent': 'center',
	      'position': 'relative'
	    };

	    var styleMarkdownEditorContainer = {
	      'display': 'flex',
	      'flexDirection': 'column',
	      'marginTop': '2px',
	      'paddingTop': '10px',
	      'border': '1px solid #ddd',
	      'backgroundColor': '#f7f7f7'
	    };

	    return (
	      React.createElement("div", {
	        style: styleMarkdownEditorContainer}, 
	        React.createElement("div", {style: styleMarkdownEditorHeader, className: "md-editor-header"}, 
	          editorMenu, 
	          React.createElement(MarkdownEditorTabs, null)
	        ), 
	        divContent
	      )
	    );
	  },

	  onChangeHandler: function(newContent) {
	    if (this.props.onContentChange) {
	      this.props.onContentChange(newContent);
	    }

	    this.setState({content: newContent});
	  },

	  componentDidMount: function() {
	    this.listenTo(MarkdownEditorStore, this.handleMarkdowEditorStoreUpdated);
	    this.listenTo(MarkdownEditorTabsInteractionStore, this.handleMDEditorTabsInteractionStoreUpdated);
	  },

	  handleMarkdowEditorStoreUpdated: function(markdownEditorStoreState) {
	    var currentSelection = markdownEditorStoreState.currentSelection;

	    if (currentSelection != null) {
	      this.updateText(this.state.content, currentSelection, markdownEditorStoreState.action);
	    }
	  },

	  handleMDEditorTabsInteractionStoreUpdated: function(mdEditorTabsInteractionStoreState) {
	    if (mdEditorTabsInteractionStoreState.activeTab != null) {
	      var _inEditMode = mdEditorTabsInteractionStoreState.activeTab === 0;
	      this.setState({inEditMode: _inEditMode});
	    }
	  },

	  updateText: function(text, selection, actionType) {
	    var token = this.generateMarkdownToken(actionType);
	    var beforeSelectionContent = text.slice(0, selection.selectionStart);
	    var afterSelectionContent = text.slice(selection.selectionEnd, text.length);
	    var updatedText = token.applyTokenTo(selection.selectedText);

	    var _updatedContent = beforeSelectionContent + updatedText + afterSelectionContent;
	    PublicMarkdownEditorActions.updateText(MarkdownUtils.toMarkdown(_updatedContent));
	    this.setState({content: _updatedContent});
	  },

	  generateMarkdownToken: function(actionType) {
	    switch (actionType) {
	      case 'bold':
	        return new RegularMarkdownToken('**', true);

	      case 'italic':
	        return new RegularMarkdownToken('_', true);

	      case 'header':
	        return new HeaderMarkdownToken();

	      case 'subheader':
	        return new SubHeaderMarkdownToken();

	      case 'link':
	        return new UrlMarkdownToken();

	      case 'list':
	        return new ListMarkdownToken();

	      case 'image':
	        return new ImageMarkdownToken();

	      default:
	        return new NullMarkdownToken();
	    }
	  }
	});

	module.exports = {
	  MarkdownEditor: MarkdownEditor,
	  MarkdownEditorMenu: MarkdownEditorMenu,
	  MarkdownEditorTabs: MarkdownEditorTabs
	};


/***/ },

/***/ 304:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(24);

	var ButtonManagerMixin = {
	  iconsProviderName: null,

	  setIconsProvider: function(name) {
	    this.iconsProviderName = name;
	  },

	  isFontAwesome: function() {
	    return this.iconsProviderName === 'font-awesome';
	  },

	  getStyleMarkdownBtn: function() {
	    return {
	      'flex': '1',
	      'maxWidth': '50px',
	      'border': '1px solid #ddd',
	      'backgroundColor': 'white',
	      'borderRadius': '4px',
	      'margin': '0 2px',
	      'padding': '2px 3px',
	      'cursor': 'pointer',
	      'display': 'flex',
	      'justifyContent': 'center',
	      'alignItems': 'center'
	    };
	  },

	  getBoldButton: function(isDisabled, onClickHandler) {
	    var _style = this.getStyleMarkdownBtn();
	    if (this.isFontAwesome()) {
	      return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-bold', 'bold-btn');
	    } else {
	      return this.getButtonMaterializeIcon(isDisabled, onClickHandler, _style, 'format_bold', 'bold-btn');
	    }
	  },

	  getButtonMaterializeIcon: function(isDisabled, onClickHandler, styleBtn, iconName, containerClassName) {
	    return (
	      React.createElement("div", {role: "button", className: containerClassName, style: styleBtn, disabled: isDisabled, onClick: onClickHandler}, 
	        React.createElement("i", {className: "material-icons"}, iconName)
	      )
	    );
	  },

	  getButtonFontAwesomeIcon: function(isDisabled, onClickHandler, styleBtn, iconName, containerClassName) {
	    var _className = 'fa ' + iconName;
	    return (
	      React.createElement("div", {role: "button", className: containerClassName, style: styleBtn, disabled: isDisabled, onClick: onClickHandler}, 
	        React.createElement("i", {className: _className})
	      )
	    );
	  },

	  getButtonWithoutIcon: function(isDisabled, onClickHandler, additionalClassName, textBtn) {
	    var styleBtn = {
	      'display': 'flex',
	      'minWidth': '50px',
	      'border': '1px solid #ddd',
	      'color': 'black',
	      'backgroundColor': 'white',
	      'borderRadius': '4px',
	      'margin': '0 2px',
	      'padding': '2px 3px',
	      'cursor': 'pointer',
	      'textAlign': 'center',
	      'justifyContent': 'flex-end',
	      'alignItems': 'center'
	    };

	    return (
	      React.createElement("div", {role: "button", style: styleBtn, className: additionalClassName, disabled: isDisabled, onClick: onClickHandler}, 
	        React.createElement("span", null, textBtn)
	      )
	    );
	  },

	  getItalicButton: function(isDisabled, onClickHandler) {
	    if (this.isFontAwesome()) {
	      var _style = this.getStyleMarkdownBtn();
	      return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-italic', 'italic-btn');
	    } else {
	      var _style = this.getStyleMarkdownBtn();
	      return this.getButtonMaterializeIcon(isDisabled, onClickHandler, _style, 'format_italic', 'italic-btn');
	    }
	  },

	  getMakeListButton: function(isDisabled, onClickHandler) {
	    if (this.isFontAwesome()) {
	      var _style = this.getStyleMarkdownBtn();
	      return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-list-ul', 'list-btn');
	    } else {
	      var _style = this.getStyleMarkdownBtn();
	      return this.getButtonMaterializeIcon(isDisabled, onClickHandler, _style, 'format_list_bulleted', 'list-btn');
	    }
	  },

	  getImageButton: function(isDisabled, onClickHandler) {
	    if (this.isFontAwesome()) {
	      var _style = this.getStyleMarkdownBtn();
	      return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-file-image-o', 'insert-img-btn');
	    } else {
	      var _style = this.getStyleMarkdownBtn();
	      return this.getButtonMaterializeIcon(isDisabled, onClickHandler, _style, 'insert_photo', 'insert-img-btn');
	    }
	  },

	  getLinkButton: function(isDisabled, onClickHandler) {
	    if (this.isFontAwesome()) {
	      var _style = this.getStyleMarkdownBtn();
	      return this.getButtonFontAwesomeIcon(isDisabled, onClickHandler, _style, 'fa-link', 'insert-link-btn');
	    } else {
	      var _style = this.getStyleMarkdownBtn();
	      return this.getButtonMaterializeIcon(isDisabled, onClickHandler, _style, 'insert_link', 'insert-link-btn');
	    }
	  }
	};

	module.exports = ButtonManagerMixin;


/***/ },

/***/ 305:
/***/ function(module, exports, __webpack_require__) {

	var MarkdownEditorActions = __webpack_require__(104);
	var Reflux = __webpack_require__(40);

	var _timerClick;
	var _canClear = true;

	var TextAreaSelectionMixin = {
	  mixins: [Reflux.ListenerMixin],

	  clearSelection: function() {
	    if (_canClear) {
	      MarkdownEditorActions.clearSelection();
	    }
	  },

	  bindSelectEvent: function() {
	    if (this.refs.editor !== null) {
	      this.textAreaElem = this.refs.editor;
	      this.textAreaElem.addEventListener('select', this.onSelectHandler);
	    }
	  },

	  componentDidMount: function() {
	    this.bindSelectEvent();
	  },

	  componentWillUpdate: function() {
	    this.unbindSelectEvent();
	  },

	  componentDidUpdate: function() {
	    this.bindSelectEvent();
	  },

	  unbindSelectEvent: function() {
	    this.textAreaElem.removeEventListener('select', this.onSelectHandler);
	  },

	  componentWillUnmount: function() {
	    this.unbindSelectEvent();
	  },

	  onSelectHandler: function(e) {
	    var _eventSource = this._getEventSource(e);
	    var _selectionStart = _eventSource.selectionStart;
	    var _selectionEnd = _eventSource.selectionEnd;
	    var _selectedText = _eventSource.value.slice(_selectionStart, _selectionEnd);

	    var selection = {
	      selectionStart: _selectionStart,
	      selectionEnd: _selectionEnd,
	      selectedText: _selectedText
	    };

	    MarkdownEditorActions.setSelection(selection);
	    this._preventClearSelectionAfterSelectIfNeeded(e);
	  },

	  _getEventSource: function(e) {
	    return e.srcElement || e.target;
	  },

	  _preventClearSelectionAfterSelectIfNeeded: function(e) {
	    if (e.target !== null) {
	      _canClear = false;
	      _timerClick = setTimeout(function() {
	        _canClear = true;
	        _timerClick = null;
	      }, 100);
	    }
	  }
	};

	module.exports = TextAreaSelectionMixin;


/***/ },

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(40);
	var PublicMarkdownEditorActions = __webpack_require__(197);

	var MarkdownEditorContentStore = Reflux.createStore({
	  init: function() {
	    this.listenTo(PublicMarkdownEditorActions.updateText, this.onUpdateText);
	  },

	  onUpdateText: function(updatedMarkdown) {
	    this.trigger({content: updatedMarkdown});
	  }
	});

	module.exports = MarkdownEditorContentStore;


/***/ },

/***/ 307:
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(40);
	var MarkdownEditorActions = __webpack_require__(104);
	var MarkdownSelectionActions = __webpack_require__(161);

	var MarkdownEditorStore = Reflux.createStore({
	  init: function() {
	    this.currentSelection = null;
	    this.listenTo(MarkdownEditorActions.makeBold, this.handleMakeBold);
	    this.listenTo(MarkdownEditorActions.makeItalic, this.handleMakeItalic);
	    this.listenTo(MarkdownEditorActions.makeHeader, this.handleMakeHeader);
	    this.listenTo(MarkdownEditorActions.makeSubHeader, this.handleMakeSubHeader);
	    this.listenTo(MarkdownEditorActions.makeImage, this.handleMakeImage);
	    this.listenTo(MarkdownEditorActions.makeLink, this.handleMakeLink);
	    this.listenTo(MarkdownEditorActions.makeList, this.handleMakeList);
	    this.listenTo(MarkdownEditorActions.makeUnderline, this.handleMakeUnderline);
	    this.listenTo(MarkdownEditorActions.clearSelection, this.handleClearSelection);
	    this.listenTo(MarkdownEditorActions.setSelection, this.handleSetSelection);
	  },

	  handleMakeBold: function() {
	    this.trigger({action: 'bold', currentSelection: this.currentSelection});
	  },

	  handleMakeItalic: function() {
	    this.trigger({action: 'italic', currentSelection: this.currentSelection});
	  },

	  handleMakeLink: function() {
	    this.trigger({action: 'link', currentSelection: this.currentSelection});
	  },

	  handleMakeUnderline: function() {
	    this.trigger({action: 'underline', currentSelection: this.currentSelection});
	  },

	  handleMakeHeader: function() {
	    this.trigger({action: 'header', currentSelection: this.currentSelection});
	  },

	  handleMakeSubHeader: function() {
	    this.trigger({action: 'subheader', currentSelection: this.currentSelection});
	  },

	  handleMakeList: function() {
	    this.trigger({action: 'list', currentSelection: this.currentSelection});
	  },

	  handleMakeImage: function() {
	    this.trigger({action: 'image', currentSelection: this.currentSelection});
	  },

	  handleClearSelection: function() {
	    this.currentSelection = null;
	    MarkdownSelectionActions.selectionCleared();
	  },

	  handleSetSelection: function(_selection) {
	    this.currentSelection = _selection;
	    MarkdownSelectionActions.selectionSet();
	  }
	});

	module.exports = MarkdownEditorStore;


/***/ },

/***/ 308:
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(40);
	var MarkdownEditorActions = __webpack_require__(104);

	var MarkdownEditorTabsInteractionStore = Reflux.createStore({
	  init: function() {
	    this.listenTo(MarkdownEditorActions.clickPreviewTab, this.handleClickPreviewTab);
	    this.listenTo(MarkdownEditorActions.clickEditorTab, this.handleClickEditorTab);
	  },

	  handleClickPreviewTab: function() {
	    this.trigger({activeTab: 1});
	  },

	  handleClickEditorTab: function() {
	    this.trigger({activeTab: 0});
	  }
	});

	module.exports = MarkdownEditorTabsInteractionStore;


/***/ },

/***/ 309:
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(40);
	var MarkdownSelectionActions = __webpack_require__(161);

	var MarkdownSelectionStore = Reflux.createStore({
	  init: function() {
	    this.listenTo(MarkdownSelectionActions.selectionSet, this.handleSelectionSet);
	    this.listenTo(MarkdownSelectionActions.selectionCleared, this.handleSelectionCleared);
	  },

	  handleSelectionCleared: function() {
	    this.trigger({type: 'clear'});
	  },

	  handleSelectionSet: function() {
	    this.trigger({type: 'set'});
	  }
	});

	module.exports = MarkdownSelectionStore;


/***/ },

/***/ 310:
/***/ function(module, exports) {

	var RegularMarkdownToken = function(token, isSymetric) {
	  this.token = token;
	  this.isSymetric = isSymetric;
	};

	RegularMarkdownToken.prototype.applyTokenTo = function(_text) {
	  var res = this.token;
	  res += _text;

	  if (this.isSymetric) {
	    res += this.token;
	  }

	  return res;
	};

	var NullMarkdownToken = function() {
	  RegularMarkdownToken.call(this, '', false);
	};

	NullMarkdownToken.prototype = Object.create(RegularMarkdownToken.prototype);

	NullMarkdownToken.prototype.applyTokenTo = function(_text) {
	  return _text;
	};

	var HeaderMarkdownToken = function(_token) {
	  var t = _token || '##';
	  RegularMarkdownToken.call(this, t, false);
	};

	HeaderMarkdownToken.prototype = Object.create(RegularMarkdownToken.prototype);

	HeaderMarkdownToken.prototype.applyTokenTo = function(_text) {
	  return '\n' + this.token + ' ' + _text + '\n';
	};

	var SubHeaderMarkdownToken = function() {
	  HeaderMarkdownToken.call(this, '###', false);
	};

	SubHeaderMarkdownToken.prototype = Object.create(HeaderMarkdownToken.prototype);

	var UrlMarkdownToken = function() {
	  RegularMarkdownToken.call(this, null, false);
	};

	UrlMarkdownToken.prototype = Object.create(RegularMarkdownToken.prototype);

	UrlMarkdownToken.prototype.applyTokenTo = function(_text) {
	  return '[' + _text + '](' + _text + ')';
	};

	var ListMarkdownToken = function() {
	  RegularMarkdownToken.call(this, null, false);
	};

	ListMarkdownToken.prototype = Object.create(RegularMarkdownToken.prototype);

	ListMarkdownToken.prototype.applyTokenTo = function(_text) {
	  var items = _text.split('\n');
	  var t = items.reduce(function(acc, item) {
	    return acc + '+ ' + item + '\n';
	  }, '\n');

	  return t + '\n';
	};

	var ImageMarkdownToken = function() {
	  RegularMarkdownToken.call(this, null, false);
	};

	ImageMarkdownToken.prototype = Object.create(RegularMarkdownToken.prototype);

	ImageMarkdownToken.prototype.applyTokenTo = function(_text) {
	  return '![' + _text + '](' + _text + ')';
	};

	module.exports = {
	  RegularMarkdownToken: RegularMarkdownToken,
	  NullMarkdownToken: NullMarkdownToken,
	  HeaderMarkdownToken: HeaderMarkdownToken,
	  SubHeaderMarkdownToken: SubHeaderMarkdownToken,
	  UrlMarkdownToken: UrlMarkdownToken,
	  ListMarkdownToken: ListMarkdownToken,
	  ImageMarkdownToken: ImageMarkdownToken
	};


/***/ },

/***/ 311:
/***/ function(module, exports) {

	var toMarkdown =  function(text) {
	  return text.replace(/[\n\r]/g, '  \n');
	};

	module.exports = {
	  toMarkdown: toMarkdown
	};


/***/ },

/***/ 312:
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		MarkdownEditor: __webpack_require__(303).MarkdownEditor,
		MarkdownEditorContentStore: __webpack_require__(306)
	}

/***/ },

/***/ 314:
/***/ function(module, exports) {

	"use strict";

	module.exports = function (store, definition) {
	    for (var name in definition) {
	        if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
	            var propertyDescriptor = Object.getOwnPropertyDescriptor(definition, name);

	            if (!propertyDescriptor.value || typeof propertyDescriptor.value !== "function" || !definition.hasOwnProperty(name)) {
	                continue;
	            }

	            store[name] = definition[name].bind(store);
	        } else {
	            var property = definition[name];

	            if (typeof property !== "function" || !definition.hasOwnProperty(name)) {
	                continue;
	            }

	            store[name] = property.bind(store);
	        }
	    }

	    return store;
	};

/***/ },

/***/ 315:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(34),
	    ActionMethods = __webpack_require__(199),
	    PublisherMethods = __webpack_require__(163),
	    Keep = __webpack_require__(162);

	var allowed = { preEmit: 1, shouldEmit: 1 };

	/**
	 * Creates an action functor object. It is mixed in with functions
	 * from the `PublisherMethods` mixin. `preEmit` and `shouldEmit` may
	 * be overridden in the definition object.
	 *
	 * @param {Object} definition The action object definition
	 */
	var createAction = function createAction(definition) {

	    definition = definition || {};
	    if (!_.isObject(definition)) {
	        definition = { actionName: definition };
	    }

	    for (var a in ActionMethods) {
	        if (!allowed[a] && PublisherMethods[a]) {
	            throw new Error("Cannot override API method " + a + " in Reflux.ActionMethods. Use another method name or override it on Reflux.PublisherMethods instead.");
	        }
	    }

	    for (var d in definition) {
	        if (!allowed[d] && PublisherMethods[d]) {
	            throw new Error("Cannot override API method " + d + " in action creation. Use another method name or override it on Reflux.PublisherMethods instead.");
	        }
	    }

	    definition.children = definition.children || [];
	    if (definition.asyncResult) {
	        definition.children = definition.children.concat(["completed", "failed"]);
	    }

	    var i = 0,
	        childActions = {};
	    for (; i < definition.children.length; i++) {
	        var name = definition.children[i];
	        childActions[name] = createAction(name);
	    }

	    var context = _.extend({
	        eventLabel: "action",
	        emitter: new _.EventEmitter(),
	        _isAction: true
	    }, PublisherMethods, ActionMethods, definition);

	    var functor = function functor() {
	        var triggerType = functor.sync ? "trigger" : "triggerAsync";
	        return functor[triggerType].apply(functor, arguments);
	    };

	    _.extend(functor, childActions, context);

	    Keep.createdActions.push(functor);

	    return functor;
	};

	module.exports = createAction;

/***/ },

/***/ 316:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Reflux = {
	    version: {
	        "reflux-core": "0.3.0"
	    }
	};

	Reflux.ActionMethods = __webpack_require__(199);

	Reflux.ListenerMethods = __webpack_require__(64);

	Reflux.PublisherMethods = __webpack_require__(163);

	Reflux.StoreMethods = __webpack_require__(200);

	Reflux.createAction = __webpack_require__(315);

	Reflux.createStore = __webpack_require__(201);

	var maker = __webpack_require__(202).staticJoinCreator;

	Reflux.joinTrailing = Reflux.all = maker("last"); // Reflux.all alias for backward compatibility

	Reflux.joinLeading = maker("first");

	Reflux.joinStrict = maker("strict");

	Reflux.joinConcat = maker("all");

	var _ = Reflux.utils = __webpack_require__(34);

	Reflux.EventEmitter = _.EventEmitter;

	Reflux.Promise = _.Promise;

	/**
	 * Convenience function for creating a set of actions
	 *
	 * @param definitions the definitions for the actions to be created
	 * @returns an object with actions of corresponding action names
	 */
	Reflux.createActions = (function () {
	    var reducer = function reducer(definitions, actions) {
	        Object.keys(definitions).forEach(function (actionName) {
	            var val = definitions[actionName];
	            actions[actionName] = Reflux.createAction(val);
	        });
	    };

	    return function (definitions) {
	        var actions = {};
	        if (definitions instanceof Array) {
	            definitions.forEach(function (val) {
	                if (_.isObject(val)) {
	                    reducer(val, actions);
	                } else {
	                    actions[val] = Reflux.createAction(val);
	                }
	            });
	        } else {
	            reducer(definitions, actions);
	        }
	        return actions;
	    };
	})();

	/**
	 * Sets the eventmitter that Reflux uses
	 */
	Reflux.setEventEmitter = function (ctx) {
	    Reflux.EventEmitter = _.EventEmitter = ctx;
	};

	/**
	 * Sets the method used for deferring actions and stores
	 */
	Reflux.nextTick = function (nextTick) {
	    _.nextTick = nextTick;
	};

	Reflux.use = function (pluginCb) {
	    pluginCb(Reflux);
	};

	/**
	 * Provides the set of created actions and stores for introspection
	 */
	/*eslint-disable no-underscore-dangle*/
	Reflux.__keep = __webpack_require__(162);
	/*eslint-enable no-underscore-dangle*/

	/**
	 * Warn if Function.prototype.bind not available
	 */
	if (!Function.prototype.bind) {
	    console.error("Function.prototype.bind not available. " + "ES5 shim required. " + "https://github.com/spoike/refluxjs#es5");
	}

	exports["default"] = Reflux;
	module.exports = exports["default"];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 317:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(34);

	module.exports = function mix(def) {
	    var composed = {
	        init: [],
	        preEmit: [],
	        shouldEmit: []
	    };

	    var updated = (function mixDef(mixin) {
	        var mixed = {};
	        if (mixin.mixins) {
	            mixin.mixins.forEach(function (subMixin) {
	                _.extend(mixed, mixDef(subMixin));
	            });
	        }
	        _.extend(mixed, mixin);
	        Object.keys(composed).forEach(function (composable) {
	            if (mixin.hasOwnProperty(composable)) {
	                composed[composable].push(mixin[composable]);
	            }
	        });
	        return mixed;
	    })(def);

	    if (composed.init.length > 1) {
	        updated.init = function () {
	            var args = arguments;
	            composed.init.forEach(function (init) {
	                init.apply(this, args);
	            }, this);
	        };
	    }
	    if (composed.preEmit.length > 1) {
	        updated.preEmit = function () {
	            return composed.preEmit.reduce((function (args, preEmit) {
	                var newValue = preEmit.apply(this, args);
	                return newValue === undefined ? args : [newValue];
	            }).bind(this), arguments);
	        };
	    }
	    if (composed.shouldEmit.length > 1) {
	        updated.shouldEmit = function () {
	            var args = arguments;
	            return !composed.shouldEmit.some(function (shouldEmit) {
	                return !shouldEmit.apply(this, args);
	            }, this);
	        };
	    }
	    Object.keys(composed).forEach(function (composable) {
	        if (composed[composable].length === 1) {
	            updated[composable] = composed[composable][0];
	        }
	    });

	    return updated;
	};

/***/ },

/***/ 318:
/***/ function(module, exports, __webpack_require__) {

	var ListenerMethods = __webpack_require__(64),
	    ListenerMixin = __webpack_require__(164),
	    _ = __webpack_require__(34);

	module.exports = function(listenable, key) {

	    _.throwIf(typeof(key) === 'undefined', 'Reflux.connect() requires a key.');

	    return {
	        getInitialState: function() {
	            if (!_.isFunction(listenable.getInitialState)) {
	                return {};
	            }

	            return _.object([key],[listenable.getInitialState()]);
	        },
	        componentDidMount: function() {
	            var me = this;

	            _.extend(me, ListenerMethods);

	            this.listenTo(listenable, function(v) {
	                me.setState(_.object([key],[v]));
	            });
	        },
	        componentWillUnmount: ListenerMixin.componentWillUnmount
	    };
	};


/***/ },

/***/ 319:
/***/ function(module, exports, __webpack_require__) {

	var ListenerMethods = __webpack_require__(64),
	    ListenerMixin = __webpack_require__(164),
	    _ = __webpack_require__(34);

	module.exports = function(listenable, key, filterFunc) {

	    _.throwIf(_.isFunction(key), 'Reflux.connectFilter() requires a key.');

	    return {
	        getInitialState: function() {
	            if (!_.isFunction(listenable.getInitialState)) {
	                return {};
	            }

	            // Filter initial payload from store.
	            var result = filterFunc.call(this, listenable.getInitialState());
	            if (typeof(result) !== 'undefined') {
	                return _.object([key], [result]);
	            } else {
	                return {};
	            }
	        },
	        componentDidMount: function() {
	            var me = this;

	            _.extend(this, ListenerMethods);

	            this.listenTo(listenable, function(value) {
	                var result = filterFunc.call(me, value);
	                me.setState(_.object([key], [result]));
	            });
	        },
	        componentWillUnmount: ListenerMixin.componentWillUnmount
	    };
	};


/***/ },

/***/ 320:
/***/ function(module, exports, __webpack_require__) {

	var ListenerMethods = __webpack_require__(64);

	/**
	 * A mixin factory for a React component. Meant as a more convenient way of using the `ListenerMixin`,
	 * without having to manually set listeners in the `componentDidMount` method.
	 *
	 * @param {Action|Store} listenable An Action or Store that should be
	 *  listened to.
	 * @param {Function|String} callback The callback to register as event handler
	 * @param {Function|String} defaultCallback The callback to register as default handler
	 * @returns {Object} An object to be used as a mixin, which sets up the listener for the given listenable.
	 */
	module.exports = function(listenable,callback,initial){
	    return {
	        /**
	         * Set up the mixin before the initial rendering occurs. Import methods from `ListenerMethods`
	         * and then make the call to `listenTo` with the arguments provided to the factory function
	         */
	        componentDidMount: function() {
	            for(var m in ListenerMethods){
	                if (this[m] !== ListenerMethods[m]){
	                    if (this[m]){
	                        throw "Can't have other property '"+m+"' when using Reflux.listenTo!";
	                    }
	                    this[m] = ListenerMethods[m];
	                }
	            }
	            this.listenTo(listenable,callback,initial);
	        },
	        /**
	         * Cleans up all listener previously registered.
	         */
	        componentWillUnmount: ListenerMethods.stopListeningToAll
	    };
	};


/***/ },

/***/ 321:
/***/ function(module, exports, __webpack_require__) {

	var ListenerMethods = __webpack_require__(64);

	/**
	 * A mixin factory for a React component. Meant as a more convenient way of using the `listenerMixin`,
	 * without having to manually set listeners in the `componentDidMount` method. This version is used
	 * to automatically set up a `listenToMany` call.
	 *
	 * @param {Object} listenables An object of listenables
	 * @returns {Object} An object to be used as a mixin, which sets up the listeners for the given listenables.
	 */
	module.exports = function(listenables){
	    return {
	        /**
	         * Set up the mixin before the initial rendering occurs. Import methods from `ListenerMethods`
	         * and then make the call to `listenTo` with the arguments provided to the factory function
	         */
	        componentDidMount: function() {
	            for(var m in ListenerMethods){
	                if (this[m] !== ListenerMethods[m]){
	                    if (this[m]){
	                        throw "Can't have other property '"+m+"' when using Reflux.listenToMany!";
	                    }
	                    this[m] = ListenerMethods[m];
	                }
	            }
	            this.listenToMany(listenables);
	        },
	        /**
	         * Cleans up all listener previously registered.
	         */
	        componentWillUnmount: ListenerMethods.stopListeningToAll
	    };
	};


/***/ },

/***/ 650:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';

	var _core = __webpack_require__(65);

	var React = __webpack_require__(1);
	var actions = __webpack_require__(4);
	// var Navbar = require('../components/navbar');
	var lodash = __webpack_require__(5);
	var MarkdownEditor = __webpack_require__(312).MarkdownEditor;
	var Select = __webpack_require__(3);
	var TextInputField = __webpack_require__(9);


	module.exports = React.createClass({
	  displayName: 'exports',

	  getInitialState: function getInitialState() {
	    return {
	      organization: {},
	      loaded: false
	    };
	  },
	  handleSave: function handleSave() {
	    actions.upsertOrganization(this.state.organization);
	  },
	  handleChange: function handleChange(field, e) {
	    if (e.target) {
	      // normal input handler
	      this.handleChangeValue(field, e.target.value);
	    } else if (e.value) {
	      // dropdown handler
	      this.handleChangeValue(field, e.value);
	    } else {
	      this.handleChangeValue(field, e);
	    }
	  },
	  handleChangeValue: function handleChangeValue(field, value) {
	    var organization = this.state.organization;
	    organization[field] = value;
	    this.setState({ organization: organization });
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      id: null
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var self = this;
	    if (self.props.id && !isNaN(self.props.id)) {
	      actions.getOrganizationById(self.props.id).then(function (result) {
	        self.setState({ organization: result.organization, loaded: true });
	        self.forceUpdate();
	      });
	    }
	  },
	  render: function render() {
	    console.log('rendering org', this.state.organization);
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h2',
	        null,
	        'Create/Edit Organization ',
	        this.state.organization.name
	      ),
	      React.createElement(TextInputField, { label: 'Name', value: this.state.organization.name, onChange: this.handleChange.bind(this, 'name') }),
	      React.createElement(TextInputField, { label: 'Secret Passphrase (required to join your organization)', value: this.state.organization.passphrase, onChange: this.handleChange.bind(this, 'passphrase') }),
	      React.createElement(TextInputField, { label: 'Logo Url', value: this.state.organization.logo_url, onChange: this.handleChange.bind(this, 'logo_url') }),
	      this.state.organization.logo_url && React.createElement('img', { src: this.state.organization.logo_url, style: { height: 50, width: 50 } }),
	      React.createElement(
	        'h2',
	        null,
	        'Marketing Copy'
	      ),
	      this.state.loaded && React.createElement(MarkdownEditor, { initialContent: this.state.organization.overview_copy, onContentChange: this.handleChange.bind(this, 'overview_copy') }),
	      React.createElement('hr', null),
	      React.createElement(
	        'button',
	        { className: 'pt-button pt-icon-add', onClick: this.handleSave },
	        'Save'
	      )
	    );
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 674:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var actions = __webpack_require__(4);
	// var Navbar = require('../components/navbar');
	var Organization = __webpack_require__(650);
	var lodash = __webpack_require__(5);

	module.exports = React.createClass({
	  displayName: 'exports',

	  getInitialState: function getInitialState() {
	    return {};
	  },
	  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	    if (!nextProps.token) {
	      actions.goto('/');
	    }
	  },
	  render: function render() {
	    return React.createElement(Organization, { id: this.props.params.id });
	  }
	});

/***/ }

});