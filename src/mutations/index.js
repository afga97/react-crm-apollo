import { gql } from "apollo-boost";

export const NUEVO_CLIENTE = gql`
    mutation crearCliente($input: ClienteInput){
        crearCliente(input: $input) {
            id
            nombre
            apellido
            empresa
        }
    }
`;

export const ACTUALIZAR_CLIENTE = gql`
    mutation actualizarCliente($input: ClienteInput){
        actualizarCliente(input: $input){
            id
            nombre
            apellido
            emails {
                email
            }
            tipo
            empresa
            edad
        }
    }
`;

export const ELIMINAR_CLIENTE = gql`
    mutation elimiarCliente($id: ID){
        eliminarCliente(id: $id)
    }
`;


export const NUEVO_PRODUCTO = gql`
    mutation crearProducto($input: ProductoInput){
        crearProducto(input: $input){
            id
            nombre
            precio
            stock
        }
    }
`;

export const ACTUALIZAR_PRODUCTO = gql`
    mutation actualizarProducto($input: ProductoInput){
        actualizarProducto(input: $input){
            id
            nombre
            precio
            stock
        }
    }
`;

export const ELIMINAR_PRODUCTO = gql`
    mutation eliminarProducto($id: ID){
        eliminarProducto(id: $id)
    }
`;