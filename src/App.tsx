import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './ErrorPage';
import CartPage from './pages/CartPage';
import Layout from './pages/Layout';
import RegistrationForm from './pages/Registration';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/registration',
        element: <RegistrationForm />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
    ],
  },
  {
    path: '/error',
    element: <ErrorPage />,
  },
  {
    path: '/registration',
    element: <RegistrationForm />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
