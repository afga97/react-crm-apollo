import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { PRODUCTO_QUERY, OBTENER_PEDIDOS } from '../../queries';
import ResumenProducto from './ResumenProducto';
import { ACTUALIZAR_ESTADO } from '../../mutations';

const Pedido = (props) => {
    const pedido = props.pedido;
    const { id, estado } = pedido;
    const fecha = new Date(Number(pedido.fecha))

    let clase;
    if (estado === 'PENDIENTE') {
        clase = 'border-light';
    }else if (estado === 'CANCELADO') {
        clase = 'border-danger'
    } else {
        clase = 'border-success'
    }

    const divStyle = {
        borderWidth: '4px'
    }
    return (
        <div className="col-md-4">
            <div className={`card mb-3 ${clase}`} style={divStyle}>
                <div className="card-body">
                    <p className="card-text font-weight-bold ">Estado:
                        <Mutation
                            mutation={ACTUALIZAR_ESTADO}   
                            key={id}                
                        >
                        { actualizarEstado => (
                            <select 
                                className="form-control my-3"
                                value={pedido.estado}
                                onChange= { e => {
                                    const input = {
                                        id,
                                        fecha: pedido.fecha,
                                        pedido: pedido.pedido,
                                        total: pedido.total,
                                        cliente: pedido.cliente.id,
                                        estado: e.target.value
                                    }

                                    const cliente_id = pedido.cliente.id;
                                    actualizarEstado({
                                        variables: { input },
                                        refetchQueries: [
                                            { 
                                                query: OBTENER_PEDIDOS,
                                                variables: { cliente: cliente_id }
                                            }
                                        ]
                                    })
                                }}
                            >
                                <option value="PENDIENTE">PENDIENTE</option>
                                <option value="COMPLETADO">COMPLETADO</option>
                                <option value="CANCELADO">CANCELADO</option>
                            </select>

                        )}
                        </Mutation>
                    </p>
                    <p className="card-text font-weight-bold">Pedido ID:
                        <span className="font-weight-normal"> { pedido.id }</span>
                    </p>
                    <p className="card-text font-weight-bold">Fecha Pedido:
                        <span className="font-weight-normal"> {fecha.toLocaleString("es-CO")}</span>
                    </p>
                    <p className="card-text font-weight-bold">Total:
                        <span className="font-weight-normal"> ${pedido.total}</span>
                    </p>
                    <h3 className="card-text text-center mb-3">Artículos del pedido</h3>
                    {pedido.pedido.map(producto => {
                        const { id } = producto;
                        return (
                            <Query key={id} query={PRODUCTO_QUERY} variables={{ id }}>
                                {({loading, error, data}) => {
                                    if (loading) return 'Cargando...';
                                    if (error) return `Error ${error}`
                                    const instance_producto = data.getProducto;
                                    return (
                                        <ResumenProducto 
                                            producto={instance_producto}
                                            cantidad={producto.cantidad}
                                            key={id}
                                        />
                                    )
                                }}
                            </Query>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Pedido;