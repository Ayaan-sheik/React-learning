import App from './App.jsx'
import Profile from './Profile.jsx'
import ErrorPage from './ErrorPage.jsx'

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/:name",
    element: <Profile />,
  },
];

export default routes;