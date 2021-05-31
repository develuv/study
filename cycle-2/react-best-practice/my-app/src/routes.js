
import { Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout'

import NotFound from './pages/NotFound'
import LocalState from './pages/LocalState'
import GlobalState from './pages/GlobalState'

const routes = [
  {
    path: '',
    element: <MainLayout />,
    children: [
      { path: 'local', element: <LocalState /> },
      { path: 'global', element: <GlobalState /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
];

export default routes;