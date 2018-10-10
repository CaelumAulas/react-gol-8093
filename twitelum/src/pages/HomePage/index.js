import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet'
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import Modal from '../../components/Modal'
import PropTypes from 'prop-types'

import * as TweetsActions from '../../actions/TweetsActions'
// import { carregaTweets } from '../../actions/TweetsActions'

class HomePage extends Component {
    
    constructor() {
        super()
        
        this.state = {
            novoTweet: '',
            tweets: [],
            tweetAtivo: {}
        }
        // this.adicionaTweet = this.adicionaTweet.bind(this)
    }
    
    static contextTypes = {
        store: PropTypes.object
    }

    // https://reactjs.org/docs/state-and-lifecycle.html
    // import * as TweetsActions from '../../actions/TweetsActions'
    componentDidMount() { // Server Side Render
        this.context.store.subscribe(() => {
            this.setState({
                tweets: this.context.store.getState().listaDeTweets,
                tweetAtivo: this.context.store.getState().tweetAtivo
            })
        })
        // Thunk Action: Ação que faz algo assincrono
        this.context.store.dispatch(TweetsActions.carregaTweets)
    }
    
    adicionaTweet = (infosDoEvento) => {
        infosDoEvento.preventDefault()
        // console.log(TweetsActions.adicionaTweet(this.state.novoTweet))

        this.context.store.dispatch(
            TweetsActions.adicionaTweet(this.state.novoTweet)
        )

        this.setState({
            novoTweet: ''
        })
    }

    // removeTweet = (idDoTweetQueVaiSumir) => {
    //     this.context.store.dispatch(
    //         TweetsActions.removeTweet(idDoTweetQueVaiSumir)
    //     )
    //     this.setState({
    //         tweetAtivo: {}
    //     })
    // }

    abreModal = (tweetQueVaiNoModal) => {
        this.context.store.dispatch(TweetsActions.abreModal(tweetQueVaiNoModal))
        // this.setState({
        //     tweetAtivo: tweetQueVaiNoModal
        // }, () => {
        //     console.log('Tweet adicionado no modal com sucesso!', this.state)
        // })
    }

    fechaModal = (infosDoEvento) => {
        const isModal = infosDoEvento.target.classList.contains('modal')
        
        console.log('isModal', isModal)
        if(isModal) {
            this.setState({
                tweetAtivo: {}
            })
        }
    }


  render() {
    return (
      <Fragment>
        <Helmet>
            <title>Home - {`${this.state.tweets.length}`} Tweets Novos - Twitelum</title>
        </Helmet>
        <Cabecalho>
            <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>
                    <form className="novoTweet" onSubmit={ this.adicionaTweet }>
                        <div className="novoTweet__editorArea">
                            {/* Se tiver mais que 140 caracteres,
                                adicionar a classe: novoTweet__status--invalido */}
                            <span
                                className={
                                    `novoTweet__status
                                    ${
                                        this.state.novoTweet.length > 140 // Validação
                                        ? 'novoTweet__status--invalido' // true
                                        : '' // false
                                    }
                                    `
                                }>
                                { this.state.novoTweet.length }/140
                            </span>
                            <textarea
                                onChange={ (infosDoEvento) => {
                                    // console.log('usuário digitou...', infosDoEvento.target.value)
                                    // this.state.novoTweet = infosDoEvento.target.value
                                    // this.render()
                                    // atualiza o documentVirtual
                                    // o react roda um algoritmo de diff
                                    this.setState({
                                        novoTweet: infosDoEvento.target.value
                                    })
                                    // Precisamos pegar o que o usuário digitou
                                }}
                                value={this.state.novoTweet}
                                className="novoTweet__editor"
                                placeholder="O que está acontecendo?">
                            </textarea>
                        </div>
                        <button disabled={this.state.novoTweet.length > 140 || this.state.novoTweet.length === 0} type="submit" className="novoTweet__envia">Tweetar</button>
                    </form>
                </Widget>
                <Widget>
                    <TrendsArea />
                </Widget>
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <div className="tweetsArea">
                        {
                            this.state.tweets.map((tweetAtual, indice) => {
                                return <Tweet 
                                    key={tweetAtual._id}
                                    id={tweetAtual._id}
                                    texto={tweetAtual.conteudo}
                                    usuario={tweetAtual.usuario}
                                    likeado={tweetAtual.likeado || false}
                                    removivel={tweetAtual.removivel}
                                    totalLikes={tweetAtual.totalLikes}
                                    removeHandler={() => { this.removeTweet(tweetAtual._id) }}
                                    handleAbreModal={
                                        () => this.abreModal(tweetAtual)
                                    }/>
                            })
                        }
                        {
                            this.state.tweets.length === 0
                            ? 'Cria um tweet ai vai :)'
                            : ''
                        }
                    </div>
                </Widget>
            </Dashboard>
            {/* Definir onde vamos clicar */}
            {/* Limpar o tweet ativo */}
            <Modal
                isAberto={Boolean(this.state.tweetAtivo._id)}
                handleFechaModal={this.fechaModal}>
                {
                    Boolean(this.state.tweetAtivo._id)
                    && <Widget>
                        <Tweet 
                            key={this.state.tweetAtivo._id}
                            id={this.state.tweetAtivo._id}
                            texto={this.state.tweetAtivo.conteudo}
                            usuario={this.state.tweetAtivo.usuario}
                            likeado={this.state.tweetAtivo.likeado || false}
                            removivel={this.state.tweetAtivo.removivel}
                            totalLikes={this.state.tweetAtivo.totalLikes}
                            removeHandler={() => { this.removeTweet(this.state.tweetAtivo._id) }}/>
                        </Widget>
                }
            </Modal>
        </div>
      </Fragment>
    );
  }
}

export default HomePage;
