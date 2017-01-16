import React, { Component } from 'react';

class TextInputField extends Component {

    constructor(props) {
        super(props)
    }

    get value() {
        return this.refs.root.value
    }

    render() {
        const { label, onChange, defaultValue } = this.props
        return <label className="pt-label pt-inline col-xs">
            <span>{label}</span>
            <input type='pt-input' onChange={onChange} defaultValue={defaultValue} ref='root' />
        </label>
    }
}

module.exports = TextInputField;
// export default TextInputField