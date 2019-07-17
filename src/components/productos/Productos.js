import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo';

import { PRODUCTOS_QUERY } from '../../queries'

export class Productos extends Component {
    render() {
        return (
            <Fragment>
                <h1 className="text-center mb-5">Productos</h1>
                <Query
                    query={ PRODUCTOS_QUERY }
                >
                {({ loading, error, data})=> {
                    if (loading) return "Cargando.....";
                    if (error) return `Error: ${error.message}`
                    console.log(data);
                    return (
                        <p>hOLA</p>
                    )
                }}
                </Query>
            </Fragment>
        );
    }
}

export default Productos
