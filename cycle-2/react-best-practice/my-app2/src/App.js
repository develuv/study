import { Switch, Route, useLocation } from "react-router-dom";

import NavBar from './components/NavBar';
import HistoryBack from './HistoryBack';


import ProductsPage from './pages/LocalState';
import DetailPage from './pages/LocalState/DetailPage';

import ProductsGlobalPage from './pages/GlobalState';
import DetailGlobalPage from './pages/GlobalState/DetailPage';

import ProductsPopupPage from './pages/Popup';
import DetailPopupPage from './pages/Popup/DetailPage';
import ModalDetailPopupPage from './pages/Popup/ModalDetailPage';
import './App.css';

function App() {
  const location = useLocation();
  let background = location.state && location.state.background;
  return (
    <>
      <HistoryBack /> 
      <NavBar />
      <Switch location={background || location}>
        {/* <Route exact path={"/"} component={HomePage}> */}
        <Route exact path={"/local/product"} component={ProductsPage} />
        <Route exact path={"/local/product/:id"} component={DetailPage} />

        <Route exact path={"/global/product"} component={ProductsGlobalPage} />
        <Route exact path={"/global/product/:id"} component={DetailGlobalPage} />

        <Route exact path={"/popup/product"} component={ProductsPopupPage} />
        <Route exact path={"/popup/product/:id"} component={DetailPopupPage} />
        {/* </Route> */}
      </Switch>

      {background && <Route path="/popup/product/:id" component={ModalDetailPopupPage} />}
      
    </>
  );
}

export default App;
