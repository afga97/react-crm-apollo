import React, { Fragment } from 'react';
import { ApolloProvider } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//  Componentes
import Header from './components/layout/Header';

import Clients from './components/clientes/Clientes';
import CrearCliente from './components/clientes/CrearCliente';
import EditarCliente from './components/clientes/EditarCliente';

import CrearProducto from './components/productos/NuevoProducto';
import Productos from './components/productos/Productos';
import ProductosEditar from './components/productos/EditarProducto';

import CrearPedido from './components/pedidos/CrearPedido';
import PedidosCliente from './components/pedidos/PedidosCliente';


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
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
              <Route exact path="/clientes" component={Clients} />
              <Route exact path="/clientes/editar/:id" component={EditarCliente} />
              <Route exact path="/clientes/nuevo" component={CrearCliente} />

              <Route exact path="/productos" component={Productos} />
              <Route exact path="/productos/editar/:id" component={ProductosEditar} />
              <Route exact path="/productos/nuevo" component={CrearProducto} />

              <Route exact path="/pedidos/nuevo/:id" component={CrearPedido} />
              <Route exact path="/pedidos/:id" component={PedidosCliente} />

            </Switch>
          </div>
        </Fragment>
      </Router>
    </ApolloProvider>
  );
}

export default App;
