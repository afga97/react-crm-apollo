import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { CLIENTS_QUERY } from '../queries';

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
                                    <Link className="btn btn-success d-block d-md-inline-block"
                                        to={`/cliente/editar/${item.id}`}>
                                        Editar Cliente
                                    </Link>
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