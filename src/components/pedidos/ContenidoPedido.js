import React, { Component, Fragment } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import Resumen from './Resumen';

export class ContenidoPedido extends Component {
    state = {
        productos: [],
        total: 0
    }

    seleccionarProducto = (productos) => {
        this.setState({
            productos
        })
    }

    calcularTotal = () => {
        const productos = this.state.productos;        
        let nuevoTotal = 0;

        if (productos.length === 0) {
            this.setState({
                total: nuevoTotal
            });
            return;
        }
        productos.map(producto => nuevoTotal += producto.cantidad ? (producto.cantidad * producto.precio) : 0 );

        this.setState({
            total: nuevoTotal
        })
    }

    actualizarCantidad = (cantidad, index) => {
        const productos = this.state.productos;        
        productos[index].cantidad = Number(cantidad);

        this.setState({
            productos
        }, () => {
            this.calcularTotal()
        })
    }

    eliminarProducto = (id) => {
        let productos = this.state.productos;
        const productosRestantes = productos.filter(producto => producto.id !== id);

        this.setState({
            productos: productosRestantes
        }, () => {
            this.calcularTotal()
        })
    }

    render() {
        return (
            <Fragment>
                <h2 className="text-center mb-5">Seleccionar Articulos</h2>
                <Select options={this.props.productos} 
                    isMulti={true}
                    components={makeAnimated()}
                    placeholder={"Seleccionar Productos"}
                    getOptionValue={(options) => options.id}
                    getOptionLabel={(options) => options.nombre}
                    onChange={ this.seleccionarProducto }
                    value={this.state.productos}
                />
                <Resumen 
                    productos={this.state.productos}
                    actualizarCantidad={this.actualizarCantidad}
                    eliminarProducto={this.eliminarProducto}
                />
                <p className="font-weight-bold float-right mt-3">
                    Total:
                    <span className="font-weight-normal">
                            $ {this.state.total}
                    </span>
                </p>
            </Fragment>
        )
    }
}

export default ContenidoPedido
