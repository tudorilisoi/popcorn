import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

export default class PromiseContainer extends Component {


    //props: renderFn and promise

    constructor(props) {
        super(props)
        this.state = {
            promise: this.props.promise,
            resolved: null, //null, true or false
            resolvedValue: null,
        }
    }

    componentDidMount() {
        this.firePromise()
    }

    componentDidUpdate() {
        if (this.state.promise !== this.props.promise) {
            this.setState({
                resolved: null,
                promise: this.props.promise
            }, () => {
                this.firePromise()
            })
        }
    }

    firePromise() {
        const { promise, ...rest } = this.props
        this.props.promise(rest)
            .then(resolvedValue => {
                this.setState({ resolved: true, resolvedValue })
            })
            .catch(err => {
                this.setState({ resolved: false, resolvedValue: err })
            })
    }

    render() {
        const { resolved, resolvedValue } = this.state
        if (resolved === null) {
            return (
                <div>Loading....</div>
            )
        }
        if (resolved === false) {
            return (
                <div>There was an error, retry?</div>
            )
        }
        const props = { ...this.props, resolvedValue }
        return this.props.renderFn(props)
    }

}

export const PromiseContainerWithRouter = withRouter(PromiseContainer)
