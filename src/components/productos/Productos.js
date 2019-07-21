import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';

import { Query, Mutation } from 'react-apollo';

import { PRODUCTOS_QUERY } from '../../queries'
import { ELIMINAR_PRODUCTO } from '../../mutations'

import Alerta from '../alertas/Alert';
import Paginator from '../Paginator';

export class Productos extends Component {

    state = {
        alerta: {
            mostrar: false,
            mensaje: '',
            type: ''
        },
        paginator: {
            offset: 0,
            actual: 1
        },
        limite: 3
    }

    paginaAnterior = () => {
        this.setState({
            paginator: {
                offset: this.state.paginator.offset - this.state.limite,
                actual: this.state.paginator.actual - 1
            }
        })
    }

    paginaSiguiente = () => {
        this.setState({
            paginator: {
                offset: this.state.paginator.offset + this.state.limite,
                actual: this.state.paginator.actual + 1
            }
        })
    }

    render() {
        const { alerta: {mostrar, mensaje, type} }  = this.state;
        let alerta = (mostrar) ? <Alerta mensaje={mensaje} type={type} /> : '';
        return (
            <Fragment>
                {alerta}
                <h1 className="text-center mb-5">Productos</h1>
                <Query
                    query={ PRODUCTOS_QUERY }
                    fetchPolicy="network-only"
                    variables={
                        {
                            limite: this.state.limite,
                            offset: this.state.paginator.offset
                        }
                    }
                >
                {({ loading, error, data, startPolling, stopPolling})=> {
                    if (loading) return "Cargando.....";
                    if (error) return `Error: ${error.message}`
                    return (
                        <Fragment>
                            <table className="table">
                                <thead>
                                    <tr className="table-primary">
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Existencia</th>
                                        <th scope="col">Editar</th>
                                        <th scope="col">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {data.getProductos.map( item => {
                                    const { id } = item;
                                    return (
                                        <tr key={id}>
                                            <td>{ item.nombre }</td>
                                            <td>{ item.precio }</td>
                                            <td>{ item.stock } </td>
                                            <td>
                                                <Link
                                                    to={`/productos/editar/${id}`}
                                                    className="btn btn-warning"
                                                >
                                                Editar
                                                </Link>
                                            </td>
                                            <td>
                                                <Mutation
                                                    mutation={ ELIMINAR_PRODUCTO }
                                                    onCompleted={ (data) => {
                                                        this.setState({
                                                            alerta:{
                                                                mostrar: true,
                                                                mensaje: data.eliminarProducto,
                                                                type: 'success'
                                                            }
                                                        }, () => {
                                                            setTimeout(() => {
                                                                this.setState({
                                                                    alerta: {
                                                                        mostrar: false,
                                                                        mensaje: '',
                                                                        type: ''
                                                                    }
                                                                })
                                                            }, 5000);
                                                        })
                                                    }}
                                                >
                                                { eliminarProducto => (
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={ (e) => {
                                                            e.preventDefault()
                                                            if (window.confirm('Deseas eliminar este producto')) {
                                                                eliminarProducto({
                                                                    variables: { id }
                                                                });
                                                            }
                                                        }}
                                                    >
                                                    &times; Eliminar
                                                    </button>
                                                )}
                                                </Mutation>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table> 
                            <Paginator 
                                actual={this.state.paginator.actual}
                                total={data.totalProductos}
                                limite={this.state.limite}
                                paginaAnterior={this.paginaAnterior}
                                paginaSiguiente={this.paginaSiguiente}
                            />
                        </Fragment>
                    )
                }}
                </Query>
            </Fragment>
        );
    }
}

export default Productos
