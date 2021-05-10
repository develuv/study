
import { Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout'

import Local from './pages/LocalState'

const routes = [
  {
    path: '',
    element: <Local />,
    children: [
      { path: 'local', element: <Local /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;