import React, { Component } from 'react';
import { PromiseContainerWithRouter } from '../../containers/PromiseContainer'
import { searchById } from '../../lib/tmdbLoader';

export default function AnalyzePage(props) {
    const { movie } = props
    const style = { maxWidth: '300px' }
    return (
        <div>
            <h1>{movie.title}</h1>
            <img src={movie.poster} style={style}></img>
        </div>
    )
}

const promise = props => {
    const id = props.match.params.id
    return searchById(id)
}

const renderFn = (props) => {
    const id = props.match.params.id
    const movie = props.resolvedValue
    const p = { id, movie, history: props.history }
    return <AnalyzePage {...p} />
}

const connectedProps = { promise, renderFn }

export const AnalyzePageWithData = () => <PromiseContainerWithRouter {...connectedProps} />