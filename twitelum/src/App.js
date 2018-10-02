import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {

    constructor() {
        super()

        this.state = {
            novoTweet: 'alo alo w brazil'
        }
    }

  render() {
    return (
      <Fragment>
        <Cabecalho>
            <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>
                    <form className="novoTweet">
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
                                    console.log('usuário digitou...', infosDoEvento.target.value)
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
                        <Tweet />
                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default App;
