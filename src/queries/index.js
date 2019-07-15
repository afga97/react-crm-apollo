import { gql } from "apollo-boost";

export const CLIENTS_QUERY = gql`
    query getClientes($limite: Int, $offset: Int){
        getClientes(limite: $limite, offset: $offset){
            id
            nombre
            apellido
            empresa
        }
        totalClientes
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