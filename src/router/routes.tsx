import { RouteObject } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Login from '../pages/Login'
import Unauthenticated from '../layouts/Unauthenticated'
import Authenticated from '../layouts/Authenticated'

const routes: RouteObject[] = [
  {
    element: <Authenticated />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    element: <Unauthenticated />,
    children: [
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]

export default routes
