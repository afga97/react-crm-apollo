import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';

// Components
import Paginator from '../Paginator';
import Alerta from '../alertas/Alert';


import { CLIENTS_QUERY } from '../../queries';
import { ELIMINAR_CLIENTE } from '../../mutations';

class Clientes extends Component {

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

    eliminarCliente = (data) => {
        this.setState({
            alerta:{
                mostrar: true,
                mensaje: data.eliminarCliente,
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
    }

    render() {
        const { alerta: {mostrar, mensaje, type} }  = this.state;
        let alerta = (mostrar) ? <Alerta mensaje={mensaje} type={type} /> : '';
        return (
            <Query
                query={CLIENTS_QUERY}
                fetchPolicy="network-only"
                variables={
                    {
                        limite: this.state.limite,
                        offset: this.state.paginator.offset
                    }
                }
            >
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;

                    return (
                        <Fragment>
                            {alerta}
                            <h2 className="text-center mt-4">Listado de clientes</h2>
                            <ul className="list-group mt-4">
                                {data.getClientes.map(item => (
                                    <li key={item.id} className="list-group-item">
                                        <div className="row justify-content-between aling-items-center">
                                            <div className="col-md-6 d-flex justify-content-between aling-items-cente">
                                                {item.nombre} {item.apellido} - {item.empresa}
                                            </div>
                                            <div className="col-md-6 d-flex justify-content-end">
                                                <Link className="btn btn-warning d-block d-md-inline-block mr-2"
                                                    to={`/pedidos/nuevo/${item.id}`}
                                                >
                                                    &#43; Nuevo Pedido
                                                </Link>
                                                <Link className="btn btn-primary d-block d-md-inline-block mr-2"
                                                    to={`/pedidos/${item.id}`}
                                                >
                                                    Ver Pedidos
                                                </Link>
                                                <Link className="btn btn-success d-block d-md-inline-block mr-2"
                                                    to={`/clientes/editar/${item.id}`}>
                                                    Editar Cliente
                                                </Link>
                                                <Mutation
                                                    mutation={ELIMINAR_CLIENTE}
                                                    onCompleted={ (data) => {this.eliminarCliente(data)}}
                                                >
                                                    {eliminarCliente => (
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger d-block d-md-inline-block"
                                                            onClick={() => {
                                                                let id = item.id
                                                                if(window.confirm(`Desea eliminar a ${item.nombre} ${item.apellido}?`)){
                                                                    eliminarCliente({
                                                                        variables: { id }
                                                                    })
                                                                }
                                                            }}
                                                        >
                                                            &times; Eliminar Cliente
                                                    </button>
                                                    )}
                                                </Mutation>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <Paginator 
                                actual={this.state.paginator.actual}
                                total={data.totalClientes}
                                limite={this.state.limite}
                                paginaAnterior={this.paginaAnterior}
                                paginaSiguiente={this.paginaSiguiente}
                            />
                        </Fragment>
                    );
                }}
            </Query>

        )
    }
}
export default Clientes;