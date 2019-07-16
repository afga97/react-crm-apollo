import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';

// Components
import Paginator from '../Paginator';


import { CLIENTS_QUERY } from '../../queries';
import { ELIMINAR_CLIENTE } from '../../mutations';

class Clientes extends Component {

    state = {
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
        return (
            <Query
                query={CLIENTS_QUERY}
                pollInterval={1000}
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
                    console.log(data);
                    return (
                        <Fragment>
                            <h2 className="text-center mt-4">Listado de clientes</h2>
                            <ul className="list-group mt-4">
                                {data.getClientes.map(item => (
                                    <li key={item.id} className="list-group-item">
                                        <div className="row justify-content-between aling-items-center">
                                            <div className="col-md-8 d-flex justify-content-between aling-items-cente">
                                                {item.nombre} {item.apellido} - {item.empresa}
                                            </div>
                                            <div className="col-md-4 d-flex justify-content-end">
                                                <Link className="btn btn-success d-block d-md-inline-block mr-2"
                                                    to={`/cliente/editar/${item.id}`}>
                                                    Editar Cliente
                                            </Link>
                                                <Mutation
                                                    mutation={ELIMINAR_CLIENTE}
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
                                totalClientes={data.totalClientes}
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