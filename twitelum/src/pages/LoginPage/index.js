import React, { Component } from 'react'
import Widget from '../../components/Widget'

import './loginPage.css'

// CAPÍTULO 13: pg45
class LoginPage extends Component {
    fazerLogin = (infosDoEvento) => {
        infosDoEvento.preventDefault()

        const dadosDeLogin = {
            login: this.refs.inputLogin.value,
            senha: this.refs.inputSenha.value
        }

        fetch('http://twitelum-api.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosDeLogin)
        })
        .then((responseDoServer) => {
            if(!responseDoServer.ok) throw Error(responseDoServer.status);

            return responseDoServer.json()
        })
        .then((dadosDoServidorEmObj) => {
            const token = dadosDoServidorEmObj.token
            localStorage.setItem('TOKEN', token)
            this.props.history.push('/')
        })
        .catch((err) => {
            console.log('Status do Erro: ',err.message)
        })
    }

    render() {
        return (
            <div className="loginPage">
                <div className="container">
                    <Widget>
                        <h1 className="loginPage__title">Twitelum</h1>
                        <form className="loginPage__form" onSubmit={this.fazerLogin}>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="login">Login</label> 
                                <input
                                    className="loginPage__input"
                                    type="text"
                                    id="login"
                                    ref="inputLogin"
                                    name="login"/>
                            </div>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="senha">Senha</label> 
                                <input
                                    className="loginPage__input"
                                    type="password"
                                    id="senha"
                                    ref="inputSenha"
                                    name="senha"/>
                            </div>
                            {/* <div className="loginPage__errorBox">
                                Mensagem de erro!
                            </div> */}
                            <div className="loginPage__inputWrap">
                                <button className="loginPage__btnLogin" type="submit">
                                    Logar
                                </button>
                            </div>
                        </form>
                    </Widget>
                </div>
            </div>
        )
    }
}


export default LoginPage