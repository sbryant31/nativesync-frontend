webpackJsonp([11],{

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

/***/ 100:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';

	var React = __webpack_require__(1);
	var _ = __webpack_require__(6);
	// var lodash = require('lodash');
	var actions = __webpack_require__(4);
	var Select = __webpack_require__(3);

	module.exports = React.createClass({
	  displayName: 'exports',

	  getInitialState: function getInitialState() {
	    return {
	      services: [],
	      serviceOptions: []
	    };
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      creatable: false,
	      value: [],
	      onChange: function onChange(services) {
	        console.log('change services', services);
	      },
	      label: "Services"
	    };
	  },
	  handleChange: function handleChange(selection) {
	    var selectedIDs = _.pluck(selection, 'value');
	    var services = _.filter(this.state.services, function (service) {
	      return selectedIDs.indexOf(service.id) !== -1;
	    });
	    this.props.onChange(services);
	  },
	  componentDidMount: function componentDidMount() {
	    var _this = this;

	    console.log('loading options for service');
	    return actions.getServices().then(function (result) {
	      var serviceOptions = _.map(result.services, function (service) {
	        return {
	          value: service.id,
	          label: service.name
	        };
	      });
	      _this.setState({
	        services: result.services,
	        serviceOptions: serviceOptions
	      });
	    });
	  },
	  render: function render() {
	    var value = _.map(this.props.value, function (service) {
	      return { value: service.id, label: service.name };
	    });

	    return React.createElement(
	      'label',
	      { className: 'pt-label pt-inline' },
	      this.props.label,
	      React.createElement(Select, {
	        name: 'service-multi-select',
	        multi: true,
	        value: value,
	        options: this.state.serviceOptions,
	        onChange: this.handleChange
	      })
	    );
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 648:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';

	var _reactRouter = __webpack_require__(111);

	var React = __webpack_require__(1);
	var actions = __webpack_require__(4);
	// var _ = require('underscore');
	// var Select = require('react-select');
	// var TextInputField = require('../inputs/text_input_field');
	// import StripeCheckout from 'react-stripe-checkout';
	var ServiceMultiSelect = __webpack_require__(100);
	// var Json = require('react-json');


	module.exports = React.createClass({
	  displayName: 'exports',
	  getDefaultProps: function getDefaultProps() {
	    return {};
	  },
	  getInitialState: function getInitialState() {
	    return {
	      // organization: {}
	      new_status: "unsubmitted"
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    // var org = actions.getState('org');
	    // return actions.getOrganizationById(org.id)
	    // .then((result) => {
	    //   this.setState({ organization: result.organization });
	    // });
	  },
	  onToken: function onToken(token) {
	    var self = this;
	    console.log('got token', token);
	    var organization = this.state.organization;
	    organization.stripeToken = token;
	    return actions.updateOrganization(organization).then(function (organization) {
	      self.setState({ organization: organization, formComplete: true });
	    });
	  },
	  handleOrganizationChange: function handleOrganizationChange(field, e) {
	    var organization = this.state.organization;
	    if (e.value) {
	      organization[field] = e.value;
	    } else if (e.target) {
	      organization[field] = e.target.value;
	    } else {
	      organization[field] = e;
	    }
	    this.setState({ organization: organization });
	  },
	  newIntegrationRequestOnSubmit: function newIntegrationRequestOnSubmit(e) {
	    var _this = this;

	    e.preventDefault();
	    // todo: switch on integration type
	    var org = actions.getState('org');
	    var request_object = {
	      organization_id: org.id,
	      integration_id: this.props.id,
	      contact_name: this.props.name,
	      contact_email: this.props.email,
	      contact_phone: this.props.phone,
	      services: this.props.apps,
	      details: this.props.details,
	      type: this.props.onboarding ? this.props.onboarding : 'implement',
	      jobStatus: 'assigned',
	      discount: 0,
	      discountCode: 0
	    };
	    console.log("About to submit the following data for an integration request: ", request_object);
	    actions.createIntegrationRequest(request_object).then(function (result) {
	      // return actions.goto('/integration_request/' + result.integrationRequest.id);
	      _this.setState({ new_status: "submitted" });
	    });
	  },
	  __new_form: function __new_form() {
	    return React.createElement(
	      'div',
	      { className: 'NewIntegrationRequestForm row' },
	      React.createElement(
	        'div',
	        { className: 'col-lg-5 col-md-6 col-sm-8 col-xs-12' },
	        React.createElement(
	          'div',
	          { className: 'content pt-card pt-elevation-3' },
	          React.createElement(
	            'h1',
	            null,
	            'Get your app connected!'
	          ),
	          React.createElement(
	            'h3',
	            null,
	            'Fill the form out below and an integration specialist will be in touch momentarily.'
	          ),
	          React.createElement(
	            'form',
	            { onSubmit: this.newIntegrationRequestOnSubmit },
	            React.createElement(
	              'label',
	              { className: 'pt-label' },
	              'Name *',
	              React.createElement('input', {
	                autoFocus: true,
	                required: true,
	                placeholder: 'Your Name',
	                id: 'name',
	                className: 'pt-input pt-large pt-fill',
	                value: this.props.id,
	                onChange: this.props.inputOnChange
	              })
	            ),
	            React.createElement(
	              'label',
	              { className: 'pt-label' },
	              'Email *',
	              React.createElement('input', {
	                required: true,
	                placeholder: 'Enter email address',
	                id: 'email',
	                className: 'pt-input pt-large pt-fill',
	                value: this.props.email,
	                onChange: this.props.inputOnChange,
	                pattern: '^[-a-z0-9~!$%^&*_=+}{\'?]+(\\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))(:[0-9]{1,5})?$'
	              })
	            ),
	            React.createElement(
	              'label',
	              { className: 'pt-label' },
	              'Phone',
	              React.createElement('input', {
	                placeholder: 'Enter phone number',
	                id: 'phone',
	                className: 'pt-input pt-large pt-fill',
	                value: this.props.phone,
	                onChange: this.props.inputOnChange
	              })
	            ),
	            React.createElement(ServiceMultiSelect, {
	              value: this.props.apps ? this.props.apps : [],
	              onChange: this.props.handleAppSelectorChange,
	              label: 'Apps you need to connect'
	            }),
	            React.createElement(
	              'label',
	              { className: 'pt-label' },
	              'Details',
	              React.createElement('textarea', {
	                id: 'details',
	                className: 'pt-input pt-large pt-fill',
	                value: this.props.details,
	                onChange: this.props.inputOnChange,
	                placeholder: 'Tell us more about your business. What are your app integration needs?'
	              })
	            ),
	            React.createElement(
	              'button',
	              { type: 'submit', className: 'pt-button pt-intent-primary pt-large' },
	              'Send'
	            )
	          ),
	          React.createElement('hr', null),
	          React.createElement(
	            'h4',
	            null,
	            'Or call us any time at 1-352-538-2624'
	          )
	        )
	      )
	    );
	  },
	  __new_success: function __new_success() {
	    return React.createElement(
	      'div',
	      { className: 'NewIntegrationRequestSuccess row' },
	      React.createElement(
	        'div',
	        { className: 'col-lg-offset-2 col-lg-8' },
	        React.createElement(
	          'div',
	          { className: 'content pt-card pt-elevation-3' },
	          React.createElement('i', { className: 'fa fa-thumbs-o-up', 'aria-hidden': 'true' }),
	          React.createElement(
	            'h2',
	            null,
	            'Thanks!'
	          ),
	          React.createElement(
	            'h4',
	            null,
	            'Our integration specialist will be in touch momentarily.'
	          ),
	          React.createElement(
	            _reactRouter.Link,
	            { to: '/' },
	            'Back to the Marketplace'
	          )
	        )
	      )
	    );
	  },
	  _new: function _new() {
	    switch (this.state.new_status) {
	      case "unsubmitted":
	        return this.__new_form();
	      case "submitted":
	        return this.__new_success();
	    }
	  },
	  _show: function _show() {
	    return this.props.id ?
	    // if the data has finished loading
	    React.createElement(
	      'div',
	      { className: 'IntegrationRequest-Show' },
	      React.createElement(
	        'h1',
	        null,
	        'This will be a screen to view an already-submitted integration request'
	      ),
	      React.createElement(
	        'p',
	        null,
	        JSON.stringify(this.props)
	      )
	    ) :

	    // not finished loading yet
	    React.createElement(
	      'p',
	      null,
	      'Loading...'
	    );
	  },
	  render: function render() {
	    console.log("PROPS: ", this.props);
	    return this.props.mode === "show" ?
	    // if there's an ID then just show the request
	    this._show() :
	    // otherwise show the form for creating a new integration request
	    this._new();
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 667:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	__webpack_require__(747);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var React = __webpack_require__(1);
	var actions = __webpack_require__(4);
	var state = __webpack_require__(179);
	// var Navbar = require('../../components/navbar');
	// var DeveloperView = require('../../components/integration_request/developer_view');
	var CustomerView = __webpack_require__(648);
	// var lodash = require('lodash');

	// CSS


	module.exports = React.createClass({
	  displayName: 'exports',
	  getInitialState: function getInitialState() {
	    return {
	      apps: actions.getState('integration_request_services')
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var _this = this;

	    if (this.props.params.id) {
	      actions.getIntegrationRequestById(this.props.params.id).then(function (result) {
	        // console.log("RESULT: ", result);
	        _this.setState(result.integrationRequest);
	      });
	    } else {
	      // delete the below property in the store if it exists. It will only be there if the user
	      // got here by clicking on "Get this integration" in the integration details page.
	      state.delete('integration_request_services');
	    }
	  },
	  handleAppSelectorChange: function handleAppSelectorChange(apps) {
	    console.log("handleAppSelectorChange()", apps);
	    this.setState({ apps: apps });
	  },
	  inputOnChange: function inputOnChange(e) {
	    switch (e.target.id) {
	      case "name":
	      case "email":
	      case "phone":
	      case "details":
	        this.setState(_defineProperty({}, e.target.id, e.target.value));
	        break;
	      default:
	        return;
	    }
	  },
	  render: function render() {
	    var org = actions.getState('org');
	    return React.createElement(
	      'div',
	      { className: 'IntegrationRequest' },
	      this.props.params.id ?
	      // SHOW
	      React.createElement(CustomerView, _extends({
	        mode: 'show'
	      }, this.state)) :
	      // NQ: DECIDE LATER WHETHER OR NOT WE WANT TO HAVE A SEPARATE DEVELOPER VIEW
	      // (org.id === this.state.organization_id ?
	      //   <CustomerView
	      //     {...this.state}
	      //     handleAppSelectorChange={this.handleAppSelectorChange}
	      //     inputOnChange={this.inputOnChange}
	      //   /> :
	      //   <DeveloperView {...this.state} />
	      // ) :
	      // NEW
	      React.createElement(CustomerView, _extends({}, this.state, {
	        handleAppSelectorChange: this.handleAppSelectorChange,
	        inputOnChange: this.inputOnChange
	      }))
	    );
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 725:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(271)();
	// imports


	// module
	exports.push([module.id, ".IntegrationRequest .NewIntegrationRequestForm {\n  margin: 0px 0px;\n}\n\n.IntegrationRequest .NewIntegrationRequestForm [class^=col-] {\n  margin: 0px auto;\n}\n\n.IntegrationRequest .NewIntegrationRequestForm .content {\n  margin-top: 50px;\n  padding: 30px 50px 50px 50px;\n}\n\n.IntegrationRequest .NewIntegrationRequestForm .content h3 {\n  line-height: 30px;\n  margin-bottom: 30px;\n}\n\n.IntegrationRequest .NewIntegrationRequestForm .content label {\n  margin-bottom: 20px;\n}\n\n.IntegrationRequest .NewIntegrationRequestForm .content textarea {\n  height: 105px;\n}\n\n.IntegrationRequest .NewIntegrationRequestForm .content button {\n  margin-top: 10px;\n  width: 200px;\n}\n\n.IntegrationRequest .NewIntegrationRequestSuccess .content.pt-card {\n  margin: 50px 0px;\n  padding: 150px 0px;\n  text-align: center;\n  border-radius: 5px;\n}\n\n.IntegrationRequest .NewIntegrationRequestSuccess .content.pt-card .fa {\n  font-size: 10em;\n  color: #6B75DD;\n}\n\n.IntegrationRequest .NewIntegrationRequestSuccess .content.pt-card h2 {\n  font-size: 2.1em;\n}\n\n.IntegrationRequest .NewIntegrationRequestSuccess .content.pt-card h4 {\n  margin-bottom: 70px;\n}\n\n.IntegrationRequest .NewIntegrationRequestSuccess .content.pt-card a {\n  font-size: 1.3em;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL25hdGhhbi9TaXRlcy9uYXRpdmVzeW5jLWZyb250ZW5kL2FwcC9wYWdlcy9pbnRlZ3JhdGlvbl9yZXF1ZXN0L2ludGVncmF0aW9uX3JlcXVlc3Quc2NzcyIsInNvdXJjZXMiOlsiL1VzZXJzL25hdGhhbi9TaXRlcy9uYXRpdmVzeW5jLWZyb250ZW5kL2FwcC9wYWdlcy9pbnRlZ3JhdGlvbl9yZXF1ZXN0L2ludGVncmF0aW9uX3JlcXVlc3Quc2NzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIuSW50ZWdyYXRpb25SZXF1ZXN0IHtcbiAgLk5ld0ludGVncmF0aW9uUmVxdWVzdEZvcm0ge1xuICAgIG1hcmdpbjogMHB4IDBweDtcbiAgICBbY2xhc3NePWNvbC1dIHtcbiAgICAgIG1hcmdpbjogMHB4IGF1dG87XG4gICAgfVxuICAgIC5jb250ZW50IHtcbiAgICAgIG1hcmdpbi10b3A6IDUwcHg7XG4gICAgICBwYWRkaW5nOiAzMHB4IDUwcHggNTBweCA1MHB4O1xuICAgICAgaDMge1xuICAgICAgICBsaW5lLWhlaWdodDogMzBweDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcbiAgICAgIH1cbiAgICAgIGxhYmVsIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgIH1cbiAgICAgIHRleHRhcmVhIHtcbiAgICAgICAgaGVpZ2h0OiAxMDVweDtcbiAgICAgIH1cbiAgICAgIGJ1dHRvbiB7XG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgICAgIHdpZHRoOiAyMDBweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLk5ld0ludGVncmF0aW9uUmVxdWVzdFN1Y2Nlc3Mge1xuICAgIC5jb250ZW50LnB0LWNhcmQge1xuICAgICAgbWFyZ2luOiA1MHB4IDBweDtcbiAgICAgIHBhZGRpbmc6IDE1MHB4IDBweDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgIC5mYSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTBlbTtcbiAgICAgICAgY29sb3I6ICM2Qjc1REQ7XG4gICAgICB9XG4gICAgICBoMiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMi4xZW07XG4gICAgICB9XG4gICAgICBoNCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDcwcHg7XG4gICAgICB9XG4gICAgICBhIHtcbiAgICAgICAgZm9udC1zaXplOiAxLjNlbTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxBQUNFLG1CQURpQixDQUNqQiwwQkFBMEIsQ0FBQztFQUN6QixNQUFNLEVBQUUsT0FBTyxHQXNCaEI7RUF4QkgsQUFHSSxtQkFIZSxDQUNqQiwwQkFBMEIsRUFFeEIsQUFBQSxLQUFDLEVBQUQsSUFBQyxBQUFBLEVBQWE7SUFDWixNQUFNLEVBQUUsUUFBUSxHQUNqQjtFQUxMLEFBTUksbUJBTmUsQ0FDakIsMEJBQTBCLENBS3hCLFFBQVEsQ0FBQztJQUNQLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLE9BQU8sRUFBRSxtQkFBbUIsR0FlN0I7SUF2QkwsQUFTTSxtQkFUYSxDQUNqQiwwQkFBMEIsQ0FLeEIsUUFBUSxDQUdOLEVBQUUsQ0FBQztNQUNELFdBQVcsRUFBRSxJQUFJO01BQ2pCLGFBQWEsRUFBRSxJQUFJLEdBQ3BCO0lBWlAsQUFhTSxtQkFiYSxDQUNqQiwwQkFBMEIsQ0FLeEIsUUFBUSxDQU9OLEtBQUssQ0FBQztNQUNKLGFBQWEsRUFBRSxJQUFJLEdBQ3BCO0lBZlAsQUFnQk0sbUJBaEJhLENBQ2pCLDBCQUEwQixDQUt4QixRQUFRLENBVU4sUUFBUSxDQUFDO01BQ1AsTUFBTSxFQUFFLEtBQUssR0FDZDtJQWxCUCxBQW1CTSxtQkFuQmEsQ0FDakIsMEJBQTBCLENBS3hCLFFBQVEsQ0FhTixNQUFNLENBQUM7TUFDTCxVQUFVLEVBQUUsSUFBSTtNQUNoQixLQUFLLEVBQUUsS0FBSyxHQUNiOztBQXRCUCxBQTBCSSxtQkExQmUsQ0F5QmpCLDZCQUE2QixDQUMzQixRQUFRLEFBQUEsUUFBUSxDQUFDO0VBQ2YsTUFBTSxFQUFFLFFBQVE7RUFDaEIsT0FBTyxFQUFFLFNBQVM7RUFDbEIsVUFBVSxFQUFFLE1BQU07RUFDbEIsYUFBYSxFQUFFLEdBQUcsR0FjbkI7RUE1Q0wsQUErQk0sbUJBL0JhLENBeUJqQiw2QkFBNkIsQ0FDM0IsUUFBUSxBQUFBLFFBQVEsQ0FLZCxHQUFHLENBQUM7SUFDRixTQUFTLEVBQUUsSUFBSTtJQUNmLEtBQUssRUFBRSxPQUFPLEdBQ2Y7RUFsQ1AsQUFtQ00sbUJBbkNhLENBeUJqQiw2QkFBNkIsQ0FDM0IsUUFBUSxBQUFBLFFBQVEsQ0FTZCxFQUFFLENBQUM7SUFDRCxTQUFTLEVBQUUsS0FBSyxHQUNqQjtFQXJDUCxBQXNDTSxtQkF0Q2EsQ0F5QmpCLDZCQUE2QixDQUMzQixRQUFRLEFBQUEsUUFBUSxDQVlkLEVBQUUsQ0FBQztJQUNELGFBQWEsRUFBRSxJQUFJLEdBQ3BCO0VBeENQLEFBeUNNLG1CQXpDYSxDQXlCakIsNkJBQTZCLENBQzNCLFFBQVEsQUFBQSxRQUFRLENBZWQsQ0FBQyxDQUFDO0lBQ0EsU0FBUyxFQUFFLEtBQUssR0FDakIifQ== */", "", {"version":3,"sources":["/./app/pages/integration_request/integration_request.scss","/./app/pages/integration_request/integration_request.scss"],"names":[],"mappings":"AAAA;EAEI,gBAAe;CCAlB;;AAED;EACE,iBDEgB;CCDjB;;AAED;EACE,iBDEmB;ECDnB,6BDTA;CCUD;;AAED;EACE,kBDdF;ECeE,oBDKsB;CCJvB;;ADhBD;EA2BM,oBAAgB;CCPrB;;AAED;EDtBA,cAAA;CCwBC;;AAED;EACE,iBDSiB;EApCnB,aAAA;CC6BC;;AAED;EACE,iBAAiB;EACjB,mBAAmB;EACnB,mBAAmB;EACnB,mBAAmB;CACpB;;AAED;EACE,gBAAgB;EAChB,eAAe;CAChB;;AAED;EACE,iBAAiB;CAClB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,iBAAiB;CAClB;;AAED,ykGAAykG","file":"integration_request.scss","sourcesContent":[".IntegrationRequest {\n  .NewIntegrationRequestForm {\n    margin: 0px 0px;\n    [class^=col-] {\n      margin: 0px auto;\n    }\n    .content {\n      margin-top: 50px;\n      padding: 30px 50px 50px 50px;\n      h3 {\n        line-height: 30px;\n        margin-bottom: 30px;\n      }\n      label {\n        margin-bottom: 20px;\n      }\n      textarea {\n        height: 105px;\n      }\n      button {\n        margin-top: 10px;\n        width: 200px;\n      }\n    }\n  }\n  .NewIntegrationRequestSuccess {\n    .content.pt-card {\n      margin: 50px 0px;\n      padding: 150px 0px;\n      text-align: center;\n      border-radius: 5px;\n      .fa {\n        font-size: 10em;\n        color: #6B75DD;\n      }\n      h2 {\n        font-size: 2.1em;\n      }\n      h4 {\n        margin-bottom: 70px;\n      }\n      a {\n        font-size: 1.3em;\n      }\n    }\n  }\n}\n",".IntegrationRequest .NewIntegrationRequestForm {\n  margin: 0px 0px;\n}\n\n.IntegrationRequest .NewIntegrationRequestForm [class^=col-] {\n  margin: 0px auto;\n}\n\n.IntegrationRequest .NewIntegrationRequestForm .content {\n  margin-top: 50px;\n  padding: 30px 50px 50px 50px;\n}\n\n.IntegrationRequest .NewIntegrationRequestForm .content h3 {\n  line-height: 30px;\n  margin-bottom: 30px;\n}\n\n.IntegrationRequest .NewIntegrationRequestForm .content label {\n  margin-bottom: 20px;\n}\n\n.IntegrationRequest .NewIntegrationRequestForm .content textarea {\n  height: 105px;\n}\n\n.IntegrationRequest .NewIntegrationRequestForm .content button {\n  margin-top: 10px;\n  width: 200px;\n}\n\n.IntegrationRequest .NewIntegrationRequestSuccess .content.pt-card {\n  margin: 50px 0px;\n  padding: 150px 0px;\n  text-align: center;\n  border-radius: 5px;\n}\n\n.IntegrationRequest .NewIntegrationRequestSuccess .content.pt-card .fa {\n  font-size: 10em;\n  color: #6B75DD;\n}\n\n.IntegrationRequest .NewIntegrationRequestSuccess .content.pt-card h2 {\n  font-size: 2.1em;\n}\n\n.IntegrationRequest .NewIntegrationRequestSuccess .content.pt-card h4 {\n  margin-bottom: 70px;\n}\n\n.IntegrationRequest .NewIntegrationRequestSuccess .content.pt-card a {\n  font-size: 1.3em;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL25hdGhhbi9TaXRlcy9uYXRpdmVzeW5jLWZyb250ZW5kL2FwcC9wYWdlcy9pbnRlZ3JhdGlvbl9yZXF1ZXN0L2ludGVncmF0aW9uX3JlcXVlc3Quc2NzcyIsInNvdXJjZXMiOlsiL1VzZXJzL25hdGhhbi9TaXRlcy9uYXRpdmVzeW5jLWZyb250ZW5kL2FwcC9wYWdlcy9pbnRlZ3JhdGlvbl9yZXF1ZXN0L2ludGVncmF0aW9uX3JlcXVlc3Quc2NzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIuSW50ZWdyYXRpb25SZXF1ZXN0IHtcbiAgLk5ld0ludGVncmF0aW9uUmVxdWVzdEZvcm0ge1xuICAgIG1hcmdpbjogMHB4IDBweDtcbiAgICBbY2xhc3NePWNvbC1dIHtcbiAgICAgIG1hcmdpbjogMHB4IGF1dG87XG4gICAgfVxuICAgIC5jb250ZW50IHtcbiAgICAgIG1hcmdpbi10b3A6IDUwcHg7XG4gICAgICBwYWRkaW5nOiAzMHB4IDUwcHggNTBweCA1MHB4O1xuICAgICAgaDMge1xuICAgICAgICBsaW5lLWhlaWdodDogMzBweDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcbiAgICAgIH1cbiAgICAgIGxhYmVsIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgIH1cbiAgICAgIHRleHRhcmVhIHtcbiAgICAgICAgaGVpZ2h0OiAxMDVweDtcbiAgICAgIH1cbiAgICAgIGJ1dHRvbiB7XG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgICAgIHdpZHRoOiAyMDBweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLk5ld0ludGVncmF0aW9uUmVxdWVzdFN1Y2Nlc3Mge1xuICAgIC5jb250ZW50LnB0LWNhcmQge1xuICAgICAgbWFyZ2luOiA1MHB4IDBweDtcbiAgICAgIHBhZGRpbmc6IDE1MHB4IDBweDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgIC5mYSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTBlbTtcbiAgICAgICAgY29sb3I6ICM2Qjc1REQ7XG4gICAgICB9XG4gICAgICBoMiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMi4xZW07XG4gICAgICB9XG4gICAgICBoNCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDcwcHg7XG4gICAgICB9XG4gICAgICBhIHtcbiAgICAgICAgZm9udC1zaXplOiAxLjNlbTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxBQUNFLG1CQURpQixDQUNqQiwwQkFBMEIsQ0FBQztFQUN6QixNQUFNLEVBQUUsT0FBTyxHQXNCaEI7RUF4QkgsQUFHSSxtQkFIZSxDQUNqQiwwQkFBMEIsRUFFeEIsQUFBQSxLQUFDLEVBQUQsSUFBQyxBQUFBLEVBQWE7SUFDWixNQUFNLEVBQUUsUUFBUSxHQUNqQjtFQUxMLEFBTUksbUJBTmUsQ0FDakIsMEJBQTBCLENBS3hCLFFBQVEsQ0FBQztJQUNQLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLE9BQU8sRUFBRSxtQkFBbUIsR0FlN0I7SUF2QkwsQUFTTSxtQkFUYSxDQUNqQiwwQkFBMEIsQ0FLeEIsUUFBUSxDQUdOLEVBQUUsQ0FBQztNQUNELFdBQVcsRUFBRSxJQUFJO01BQ2pCLGFBQWEsRUFBRSxJQUFJLEdBQ3BCO0lBWlAsQUFhTSxtQkFiYSxDQUNqQiwwQkFBMEIsQ0FLeEIsUUFBUSxDQU9OLEtBQUssQ0FBQztNQUNKLGFBQWEsRUFBRSxJQUFJLEdBQ3BCO0lBZlAsQUFnQk0sbUJBaEJhLENBQ2pCLDBCQUEwQixDQUt4QixRQUFRLENBVU4sUUFBUSxDQUFDO01BQ1AsTUFBTSxFQUFFLEtBQUssR0FDZDtJQWxCUCxBQW1CTSxtQkFuQmEsQ0FDakIsMEJBQTBCLENBS3hCLFFBQVEsQ0FhTixNQUFNLENBQUM7TUFDTCxVQUFVLEVBQUUsSUFBSTtNQUNoQixLQUFLLEVBQUUsS0FBSyxHQUNiOztBQXRCUCxBQTBCSSxtQkExQmUsQ0F5QmpCLDZCQUE2QixDQUMzQixRQUFRLEFBQUEsUUFBUSxDQUFDO0VBQ2YsTUFBTSxFQUFFLFFBQVE7RUFDaEIsT0FBTyxFQUFFLFNBQVM7RUFDbEIsVUFBVSxFQUFFLE1BQU07RUFDbEIsYUFBYSxFQUFFLEdBQUcsR0FjbkI7RUE1Q0wsQUErQk0sbUJBL0JhLENBeUJqQiw2QkFBNkIsQ0FDM0IsUUFBUSxBQUFBLFFBQVEsQ0FLZCxHQUFHLENBQUM7SUFDRixTQUFTLEVBQUUsSUFBSTtJQUNmLEtBQUssRUFBRSxPQUFPLEdBQ2Y7RUFsQ1AsQUFtQ00sbUJBbkNhLENBeUJqQiw2QkFBNkIsQ0FDM0IsUUFBUSxBQUFBLFFBQVEsQ0FTZCxFQUFFLENBQUM7SUFDRCxTQUFTLEVBQUUsS0FBSyxHQUNqQjtFQXJDUCxBQXNDTSxtQkF0Q2EsQ0F5QmpCLDZCQUE2QixDQUMzQixRQUFRLEFBQUEsUUFBUSxDQVlkLEVBQUUsQ0FBQztJQUNELGFBQWEsRUFBRSxJQUFJLEdBQ3BCO0VBeENQLEFBeUNNLG1CQXpDYSxDQXlCakIsNkJBQTZCLENBQzNCLFFBQVEsQUFBQSxRQUFRLENBZWQsQ0FBQyxDQUFDO0lBQ0EsU0FBUyxFQUFFLEtBQUssR0FDakIifQ== */"],"sourceRoot":"webpack://"}]);

	// exports


/***/ },

/***/ 747:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(725);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(327)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/resolve-url-loader/index.js!./../../../node_modules/sass-loader/index.js?sourceMap!./integration_request.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/resolve-url-loader/index.js!./../../../node_modules/sass-loader/index.js?sourceMap!./integration_request.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }

});