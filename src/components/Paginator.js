import React, { Component } from 'react'

class Paginator extends Component {
    state = {
        paginator: {
            paginas: Math.ceil(Number(this.props.totalClientes) / Number(this.props.limite))
        }
    }

    render() {
        const { actual } = this.props;
        const btnAnterior = ( actual > 1) 
            ? <button type="button" 
                className="btn btn-success mr-2"
                onClick={this.props.paginaAnterior}
            >&laquo; Anterior </button> : '';

            const { paginas } = this.state.paginator;
            const btnSiguiente = ( actual !== paginas ) 
            ? <button type="button" 
                className="btn btn-success"
                onClick={this.props.paginaSiguiente}
            >Siguiente &raquo;</button> : ''; 
                
        return (
            <div className="mt-5 d-flex justify-content-center">
                {btnAnterior}
                {btnSiguiente}
            </div>
        )
    }
}

export default Paginator
