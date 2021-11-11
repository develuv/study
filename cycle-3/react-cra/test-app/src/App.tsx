import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const Main = lazy(() => import(/* webpackChunkName: 'Home'  */ 'Home'));

const App = function () {
  const element = useRoutes([{ path: '/', element: <Main /> }]);

  return element;
};

export default App;
