import React, { Component } from 'react';
import Routers from '../Routers/routes';
import { Provider } from 'react-redux'
import store from '../store'
import PersistentDrawerLeft from '../Screens/Dashboard/Dashboard';
import AdminRouters from '../Routers/adminRoutes';
import MainRouters from '../Routers/mainRoutes';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <MainRouters />
      </Provider>
    );
  }
}

export default App;
