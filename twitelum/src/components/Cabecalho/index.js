import React, { Component } from 'react' // Lib externa só o nome
import NavMenu from '../NavMenu'
import './cabecalho.css' // Arquivo do projeto ./


export default class Cabecalho extends Component {
    render() {
        console.log(this.props.usuario)
        return (
<header className="cabecalho">
    <div className="cabecalho__container container">
        <h1 className="cabecalho__logo">
            <a href="">Twitelum</a>
        </h1>
        { this.props.children }
    </div>
</header>
        )
    }

}

// JSX === HTML só que no JavaScript
// React.createElement(
//     "header",
//     { "class": "cabecalho seila" },
//     React.createElement(
//       "p",
//       null,
//       "alo alo w brazil"
//     )
//   );