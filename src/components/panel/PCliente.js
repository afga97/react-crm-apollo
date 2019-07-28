import React from 'react';
import { Query } from 'react-apollo'
import { TOP_CLIENTES } from '../../queries';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const PanelCliente = () => {
    return (  
        <Query
            query={TOP_CLIENTES}
        >
            {({loading, error, data }) => {
                if (loading) return "Cargando..."
                if (error) return `Error ${error.message}`;
                
                const topClientesGrafica = [];

                data.topClientes.map(function(pedido, index){
                    topClientesGrafica[index] = {
                        ...pedido.cliente[0],
                        total: pedido.total
                    }
                });
                if (data.topClientes.length > 0) {
                    return (
                        <BarChart 
                            width={900} height={300} data={ topClientesGrafica }
                            margin={{ top: 5, right: 30, left: 20, bottom: 5}}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="nombre"/>
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" fill="#8884d8"/>
                        </BarChart>
                    )
                } else {
                    return (
                        <h2 className="text-center">No se encuentran pedidos</h2>
                    )
                }
            }}
        </Query>
    );
}

export default PanelCliente;