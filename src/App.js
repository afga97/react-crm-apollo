import React, { Fragment } from 'react';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//  Componentes
import Header from './components/Header';
import Clients from './components/Clientes';
import CrearCliente from './components/CrearCliente';
import EditarCliente from './components/EditarCliente';

const client = new ApolloClient({
  uri: "http://192.168.1.2:4000/graphql"
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
