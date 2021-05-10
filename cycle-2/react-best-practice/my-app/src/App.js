import {
  useRoutes
} from "react-router-dom";
import { store } from './app/store';
import { Provider } from 'react-redux';

import routes from './routes'

function App() {
  const routing = useRoutes(routes);
  console.log(routing)
  return (
    <Provider store={store}>
      {routing}
    </Provider>
  );
}

export default App;
