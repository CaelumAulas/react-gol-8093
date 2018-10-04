import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

// High Order Component
class PrivateRoute extends React.Component {
    render() {
        console.log('PrivateRoute', this)
        if( localStorage.getItem('TOKEN') )  {
            const ComponenteDaRotaAtual = this.props.component
            return <ComponenteDaRotaAtual />
        } else {
            // this.props.history.push('/login')
            return <Redirect to="/login" />
        }
    }
}

const NotFoundPage = (props) => { // Não tem state, pode ser um "Presentational component"
    console.log(props)
    return (
        <h1>Você caiu na página 404</h1>
    )
}


export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <PrivateRoute path="/" exact component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route component={NotFoundPage} />
            </Switch>
        )
    }
}