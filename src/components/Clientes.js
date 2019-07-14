import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';

import { CLIENTS_QUERY } from '../queries';
import { ELIMINAR_CLIENTE } from '../mutations';

const Contacts = () => (
    <Query
        query={CLIENTS_QUERY}
        pollInterval={1000}
    >
        {({ loading, error, data, startPolling, stopPolling }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
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
                </Fragment>
            );
        }}
    </Query>
);
export default Contacts;