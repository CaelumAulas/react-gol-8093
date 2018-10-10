import React, { Component } from 'react'
import Tweet from './index'
import PropTypes from 'prop-types'
import * as TweetsActions from '../../actions/TweetsActions'

export default class TweetContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalLikes: props.totalLikes,
            likeado: props.likeado
        }
    }

    static contextTypes = {
        store: PropTypes.object
    }

    removeTweet = (idDoTweetQueVaiSumir) => {
        console.log('Removendo o tweet com a função dentro do tweet')
        this.context.store.dispatch(
            TweetsActions.removeTweet(this.props.id)
        )
        this.context.store.dispatch(TweetsActions.fechaModal)
    }

    like = () => {
        const idDoTweet = this.props.id
        this.context.store.dispatch(TweetsActions.like(idDoTweet))
    }

    render() {
        return (
            <Tweet
                {...this.props}
                removeTweet={this.removeTweet}
                likeado={this.props.likeado}
                totalLikes={this.props.totalLikes}
                like={this.like} />
        )
    }
}