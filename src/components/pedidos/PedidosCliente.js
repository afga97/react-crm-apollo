import React, { Fragment } from 'react'
import { Query } from 'react-apollo';

import { OBTENER_PEDIDOS } from '../../queries';
import Pedido from './Pedido';

const PedidosCliente = (props) => {
    const cliente = props.match.params.id;
    return ( 
        <Fragment>
            <h1 className="text-center mb-5">Peidods del cliente</h1>
            <div className="row">
                <Query
                    query={OBTENER_PEDIDOS}
                    variables={{ cliente }}
                >
                {({loading, error, data}) => {
                    if (loading) return 'Cargando...';
                    if (error) return `Error ${error.message}`
                    return (
                        data.getPedidos.map(pedido => (
                            <Pedido 
                                key={pedido.id}
                                pedido={pedido}
                                cliente={cliente}
                            />
                        ))
                    )
                }}
                </Query>
            </div>
        </Fragment>
    );
}

export default PedidosCliente;