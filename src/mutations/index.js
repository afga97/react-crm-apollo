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