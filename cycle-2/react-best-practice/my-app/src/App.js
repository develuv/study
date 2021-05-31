import { useEffect } from 'react';
import {useRoutes, useLocation} from "react-router-dom";
import history from 'history/browser';
import { store } from './app/store';
import { Provider } from 'react-redux';

import routes from './routes'

function App() {
  const routing = useRoutes(routes);
  // const location = useLocation();
  

  useEffect(() => {
    const linstener = ({action}) => {
      console.log(`navigation action ${action}`);
    }
  
    history.listen(linstener);

    return linstener
  }, [])


  return (
    <Provider store={store}>
      {routing}
    </Provider>
  );
}

export default App;
