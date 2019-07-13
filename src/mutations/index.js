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