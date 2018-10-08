import React, { Component } from 'react'
import './Modal.css'

export default class Modal extends Component {
    render() {
        return (
            <div className={`modal ${ this.props.isAberto && 'modal--active' }`} onClick={this.props.handleFechaModal}>
                <div className="modal__wrap">
                    { this.props.children }
                </div>
            </div>
        )
    }
}