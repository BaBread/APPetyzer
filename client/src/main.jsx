import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Recipe from './pages/Recipe';
import Login from './pages/Login';
import SingleThought from './pages/SingleThought';
import ErrorPage from './pages/ErrorPage';
import SearchResultsPage from './pages/SearchResultsPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
          path: '/signup',
          element: <Recipe />
      }, {
        path: '/thoughts/:thoughtId',
        element: <SingleThought />
      }, {
        path: '/search-results',
        element: <SearchResultsPage />
      }, {
        path: '/search-results/:searchTerm',
        element: <SearchResultsPage />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
