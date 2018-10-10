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
        console.log('Botao de like em produção')
        const totalLikes = this.state.totalLikes
        const likeado = this.state.likeado
        const idDoTweet = this.props.id
        this.setState({
            likeado: !likeado,
            totalLikes: likeado ? totalLikes - 1 : totalLikes + 1
        })

        fetch(`https://twitelum-api.herokuapp.com/tweets/${idDoTweet}/like?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'POST'
        })
        .then((reponseDoServer) => {
            return reponseDoServer.json()
        })
        .then((reponseDoServer) => {
            console.log('Like com sucesso!', reponseDoServer)
        })
    }

    render() {
        return (
            <Tweet {...this.props} removeTweet={this.removeTweet} likeado={this.state.likeado} />
        )
    }
}