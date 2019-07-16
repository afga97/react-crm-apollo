import React, { Fragment } from 'react';
import { ApolloProvider } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//  Componentes
import Header from './components/layout/Header';
import Clients from './components/clientes/Clientes';
import CrearCliente from './components/clientes/CrearCliente';
import EditarCliente from './components/clientes/EditarCliente';

const client = new ApolloClient({
  uri: "http://192.168.1.2:4000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({networkError, graphQLErrors}) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Clients} />
              <Route exact path="/cliente/nuevo" component={CrearCliente} />
              <Route exact path="/cliente/editar/:id" component={EditarCliente} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ApolloProvider>
  );
}

export default App;
