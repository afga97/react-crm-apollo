import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom'

import { ACTUALIZAR_PRODUCTO } from '../../mutations';

const initialState = {
    nombre: '',
    precio: '',
    stock: ''
}

export class FormularioEditarProducto extends Component {
    state = {  
        ...this.props.producto
    }

    actualizarState = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    validarForm = () => {
        const { nombre, precio, stock } = this.state;
        let noValido = !nombre || !precio || !stock
        return noValido;
    }

    editarProductoForm = (e, actualizarProducto) => {
        e.preventDefault();

        actualizarProducto().then( data => {
            this.setState({
                ...initialState
            })
        })
    }

    render() {
        const { id, nombre, precio, stock } = this.state;

        const input = {
            id,
            nombre,
            precio: Number(precio),
            stock: Number(stock)
        }
        return (
            <Mutation
                mutation={ACTUALIZAR_PRODUCTO}
                variables={ {input} }
                onCompleted={ () => {
                    this.props.refetch().then( (data) => {
                        this.props.history.push('/productos')
                    })
                }}
            >
                {( actualizarProducto, {loading, error, data}) => {
                    return(
                        <form
                            className="col-md-8"
                            onSubmit={ e => this.editarProductoForm(e, actualizarProducto)}
                        >
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input
                                    onChange={this.actualizarState}
                                    type="text"
                                    name="nombre"
                                    className="form-control"
                                    placeholder="Nombre del Producto"
                                    value={this.state.nombre}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio:</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">$</div>
                                    </div>
                                    <input
                                        onChange={this.actualizarState}
                                        type="number"
                                        name="precio"
                                        className="form-control"
                                        placeholder="Precio del Producto"
                                        value={this.state.precio}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Stock:</label>
                                <input
                                    onChange={this.actualizarState}
                                    type="number"
                                    name="stock"
                                    className="form-control"
                                    placeholder="stock del Producto"
                                    value={this.state.stock}
                                />
                            </div>
                            <button
                                disabled={this.validarForm()}
                                type="submit"
                                className="btn btn-success float-right">
                                Guardar Cambios
                                </button>
                        </form>
                    )
                }}
            </Mutation>
        )
    }
}

export default withRouter(FormularioEditarProducto)
