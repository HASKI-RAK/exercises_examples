import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './ErrorPage';
import CartPage from './pages/CartPage';
import Layout from './pages/Layout';
import ProductPage from './pages/ProductPage';
import RegistrationForm from './pages/Registration';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <div>Home</div>,
      },
      {
        path: '/products',
        element: <ProductPage />,
      },
      {
        path: '/registration',
        element: <RegistrationForm />,
      },
      {
        path: '/cart',
        element: <CartPage />, // !Facade Pattern implicit: CartPage is a facade for the Command Pattern and the Store
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
