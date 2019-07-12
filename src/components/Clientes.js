import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { CLIENTS_QUERY } from '../queries';

const Contacts = () => (
    <Query
        query={CLIENTS_QUERY}
    >
    {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return (
            <Fragment>
                <h2 className="text-center">Listado de clientes</h2>
                <ul className="list-group">
                    {data.getClientes.map(item => (
                        <li key={item.id} className="list-group-item">
                            <div className="row justify-content-between aling-items-center">
                                <div className="col-md-8 d-flex justify-content-between aling-items-cente">
                                    {item.nombre} {item.apellido} {item.empresa}
                                </div>
                                <div className="col-md-4 d-flex justify-content-end">
                                    <a className="btn btn-success d-block d-md-inline-block">
                                        Editar Cliente
                                    </a>
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