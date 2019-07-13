import { gql } from "apollo-boost";

export const CLIENTS_QUERY = gql`
{
    getClientes{
        id
        nombre
        apellido
        empresa
    }
}`;

export const CLIENTE_QUERY = gql`
    query ConsultarCliente($id: ID){
        getCliente(id: $id) {
            id
            nombre
            apellido
            emails {
                email
            }
            empresa
            edad
            tipo
        }
    }`;