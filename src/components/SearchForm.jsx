import React, { Component } from 'react';

//props: initialValue, history
export default class SearchForm extends Component {

    _inputRef = (ref) => {
        this.inputRef = ref
        if (ref && this.props.initialValue) {
            this.inputRef.value = this.props.initialValue
        }
    }

    render() {
        return (
            <form onSubmit={ev => {
                ev.preventDefault()
                const val = this.inputRef.value
                if (!val) {
                    return this.props.history.push('/')
                }
                this.props.history.push('/search/' + val)
            }}>

                <input type="text" ref={this._inputRef}></input>
            </form>
        )
    }
}
