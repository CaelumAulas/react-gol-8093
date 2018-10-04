import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet'
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'


class HomePage extends Component {
    
    constructor() {
        super()
        
        this.state = {
            novoTweet: '',
            tweets: []
        }
        // this.adicionaTweet = this.adicionaTweet.bind(this)
    }
    
    // https://reactjs.org/docs/state-and-lifecycle.html
    componentDidMount() {
        fetch('https://twitelum-api.herokuapp.com/tweets')
        .then((dadosDoServidor) => {
            return dadosDoServidor.json()
        })
        .then((tweetsVindosDoServidor) => {
            // console.log(tweetsVindosDoServidor)
            this.setState({
                tweets: tweetsVindosDoServidor
            })
        })
    }
    
    adicionaTweet = (infosDoEvento) => {
        infosDoEvento.preventDefault()
        if(this.state.novoTweet.length > 0) {   
            fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ conteudo: this.state.novoTweet })
            })
            .then((respostaDoServer) => {
                return respostaDoServer.json()
            })
            .then((tweetVindoDoServidor) => {
                console.log(tweetVindoDoServidor)
                this.setState({
                    tweets: [tweetVindoDoServidor, ...this.state.tweets]
                })
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
                                    key={indice}
                                    texto={tweetAtual.conteudo}
                                    usuario={tweetAtual.usuario}/>
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
        </div>
      </Fragment>
    );
  }
}

export default HomePage;
