import React from 'react';

const Alert = ({ type, mensaje }) => {
    console.log(`${type} ${mensaje}`)
    if (type === 'success') {
        return (
            <p className="alert alert-success py-3 text-center my-3">{mensaje}</p>
        )
    }
}

export default Alert;