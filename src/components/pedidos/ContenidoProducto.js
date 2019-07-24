import React, { Component, Fragment } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export class ContenidoProducto extends Component {
    state = {
        productos: []
    }

    seleccionarProducto = (productos) => {
        this.setState({
            productos
        })
    }

    render() {
        return (
            <Fragment>
                <h2 className="text-center mb-5">Seleccionar Articulos</h2>
                <Select options={this.props.productos} 
                    isMulti={true}
                    components={makeAnimated()}
                    placeholder={"Seleccionar Productos"}
                    getOptionValue={(options) => options.id}
                    getOptionLabel={(options) => options.nombre}
                    onChange={ this.seleccionarProducto }
                />
            </Fragment>
        )
    }
}

export default ContenidoProducto
