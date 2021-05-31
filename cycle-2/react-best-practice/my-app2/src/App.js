import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './modules'

import NavBar from './components/NavBar';
import HistoryBack from './HistoryBack';
// import HomePage from './pages/HomePage';
import ProductsPage from './pages/LocalState';
import DetailPage from './pages/LocalState/DetailPage';

import ProductsGlobalPage from './pages/GlobalState';
import DetailGlobalPage from './pages/GlobalState/DetailPage';
import './App.css';

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Switch>
          {/* <Route exact path={"/"} component={HomePage}> */}
          <Route exact path={"/local/product"} component={ProductsPage} />
          <Route exact path={"/local/product/:id"} component={DetailPage} />

          <Route exact path={"/global/product"} component={ProductsGlobalPage} />
          <Route exact path={"/global/product/:id"} component={DetailGlobalPage} />
          {/* </Route> */}
        </Switch>
        <HistoryBack /> 
      </BrowserRouter>
    </Provider>
  );
}

export default App;
