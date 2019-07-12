import { gql } from "apollo-boost";

export const CLIENTS_QUERY = gql`{
    getClientes{
        id
        nombre
        apellido
        empresa
    }
}`;