import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

function getRouteKey(props) {
    return props.location && props.location.key ? props.location.key : null
}

export default class PromiseContainer extends Component {


    //props: renderFn and promise
    constructor(props) {
        super(props)
        this.state = {
            key: null, //enable router dependent state by tracking router.location.key
            promise: this.props.promise,
            resolved: null, //null, true or false
            resolvedValue: null,
        }
    }

    componentDidMount() {
        this.firePromise()
    }

    componentDidUpdate() {
        const newKey = getRouteKey(this.props)
        const { key } = this.state
  
        if (key !== newKey) {
            this.setState({ key: newKey }, () => {
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
