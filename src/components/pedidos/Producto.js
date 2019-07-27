import React, { Component, Fragment } from 'react'

export class Producto extends Component {
    state = {
        ...this.props
    }    

    render() {
        return (
            <Fragment>
                <tr>
                    <td width="20">{ this.state.producto.nombre }</td>
                    <td width="20">{ this.state.producto.precio }</td>
                    <td width="20">{ this.state.producto.stock }</td>
                    <td width="20">
                        <input
                            type="number"
                            className="form-control"
                            onChange={e => {
                                if (e.target.value > this.state.producto.stock){
                                    e.target.value = 0;
                                }
                                this.props.actualizarCantidad(e.target.value, this.props.index)
                            }}
                        />
                    </td>
                    <td width="20">
                        <button
                            className="btn btn-danger d-block d-md-inline-block pull-right"
                            onClick={ () => this.props.eliminarProducto(this.state.producto.id)}
                        >
                            &times; Remover
                        </button>
                    </td>

                </tr>
            </Fragment>
        )
    }
}

export default Producto
