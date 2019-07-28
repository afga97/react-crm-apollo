import React, { Fragment } from 'react'
import PanelCliente from './PCliente';

const Panel = () => {
    return (  
        <Fragment>
            <h1 className="text-center my-5">Top 10 Clientes que mas compran</h1>
            <div className="row justify-content-center">
                <PanelCliente />
            </div>
        </Fragment>
    );
}

export default Panel;