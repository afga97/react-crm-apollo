import React from 'react';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

//  Componentes
import Header from './components/Header';
import Clients from './components/Clientes';

const client = new ApolloClient({
  uri: "http://192.168.1.2:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <div className="container">
        <Clients />
      </div>
    </ApolloProvider>
  );
}

export default App;
