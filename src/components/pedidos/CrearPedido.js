import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo';

import { PRODUCTOS_QUERY } from '../../queries';

import ContenidoPedido from './ContenidoPedido';
import DatosCliente from './DatosCliente';

export class CrearPedido extends Component {
    render() {
        const { id } = this.props.match.params;
        return (
            <Fragment>
                <h1 className="text-center mb-5"> Nuevo Pedido</h1>
                <div className="row">
                    <div className="col-md-3">
                        <DatosCliente id={id}/>
                    </div>
                    <div className="col-md-9">
                        <Query
                            query={ PRODUCTOS_QUERY }
                            variables={{ stock: true }}
                            fetchPolicy="network-only"
                        >
                            { ({loading, error, data}) => {
                                if (loading) return "Cargando...";
                                if (error) return `Error ${error.message}`

                                return (
                                    <ContenidoPedido 
                                        productos={data.getProductos}
                                        idCliente={id}
                                    />
                                )
                            } }
                        </Query>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default CrearPedido
