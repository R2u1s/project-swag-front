import './App.css'
import { createBrowserRouter } from "react-router-dom";
import Layout from './components/Layout/Layout'
import Catalog from './pages/Catalog/Catalog'
import Error from './pages/Error/Error'
import Home from './pages/Home/Home';
import Selected from './pages/Selected/Selected';
import Cart from './pages/Cart/Cart';
import Contacts from './pages/Contacts/Contacts';
import ProductCard from './pages/ProductCard/ProductCard';
import Registration from './pages/Registration/Registration';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    // path: "/",
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/*",
        element: <Error />,
      },
      {
        path: "/product",
        children: [
          {
            index: true,
            element: <Catalog />,
          },
          {
            path: ":id",
            element: <ProductCard/>,
          },
        ],
      },
      {
        path: "/catalog",
        children: [
          {
            index: true,
            element: <Catalog />
          },
          {
            path: ":category/:subcategory?/:subsubcategory?",
            element: <Catalog />
          }
        ]
      },
      {
        path: "/selected",
        element: <Selected />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
]);