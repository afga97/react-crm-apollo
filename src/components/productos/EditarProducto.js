import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo';

import { PRODUCTO_QUERY } from '../../queries'

import FormularioEditarProducto from './FormularioEditarProducto';


export class EditarProducto extends Component {
    render() {
        const { id } = this.props.match.params;
        return (
            <Fragment>
                <h1 className="text-center mb-5">Editar productos</h1>
                <div className="row justify-content-center">
                    <Query
                        query={PRODUCTO_QUERY}
                        variables={{ id }}
                    >
                    {( { loading, error, data, refetch} ) => {
                        if (loading) return "Cargando...";
                        if (error) return `Error! ${error.message}`                    
                        return (
                            <FormularioEditarProducto 
                                producto={data.getProducto}
                                refetch={refetch}
                            />
                        ) 
                    }}
                    </Query>
                </div>
            </Fragment>
        )
    }
}

export default EditarProducto
