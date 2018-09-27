import React, { Component } from 'react';
import propTypes from 'prop-types'
import { PromiseContainerWithRouter } from '../../containers/PromiseContainer'
import { searchById } from '../../lib/tmdbLoader';

export default function AnalyzePage(props) {
    const { movie } = props
    const style = { maxWidth: '300px' }
    const img = movie.hasPoster ? (<img src={movie.poster} style={style}></img>) : null
    return (
        <div>
            <h1>{movie.title}</h1>
            {img}
        </div>
    )
}
AnalyzePage.propTypes = {
    movie: propTypes.object.isRequired
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