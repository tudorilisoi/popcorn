import React, { Component } from 'react';
import { PromiseContainerWithRouter } from '../../containers/PromiseContainer'
import SearchForm from '../SearchForm'


//props: searchString, searchResults, history
export default function HomePage(props) {
    const { searchString, searchResults, history } = props
    const message = !searchString ? 'Please search for a movie' : `Results for ${searchString}`
    return (
        <div>
            <h1>Home!</h1>
            <h3>{message}</h3>
            <SearchForm history={history} initialValue={searchString} />
        </div>
    )
}

const promise = props => {
    return Promise.resolve('FOO')
}

const renderFn = (props) => {
    const searchString = props.match.params.searchString || ''
    const searchResults = props.resolvedValue
    const p = { searchString, searchResults, history: props.history }
    return <HomePage {...p} />
}

const connectedProps = { promise, renderFn }

//this is where the homepage connects with the router and the data is being fetched
export const HomePageWithData = () => <PromiseContainerWithRouter {...connectedProps} />