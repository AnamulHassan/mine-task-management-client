import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/Main';
import AddTask from '../pages/AddTask/AddTask';
import FinishTask from '../pages/FinishedTask/FinishedTask';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import MyTask from '../pages/MyTask/MyTask';
import Profile from '../pages/Profile/Profile';
import SignUp from '../pages/SignUp/SignUp';
import AuthRoute from './AuthRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/home',
        element: <Home></Home>,
      },
      {
        path: '/add_task',
        element: (
          <AuthRoute>
            <AddTask></AddTask>
          </AuthRoute>
        ),
      },
      {
        path: '/my_task',
        element: (
          <AuthRoute>
            <MyTask></MyTask>
          </AuthRoute>
        ),
      },
      {
        path: '/finished_task',
        element: (
          <AuthRoute>
            <FinishTask></FinishTask>
          </AuthRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <AuthRoute>
            <Profile></Profile>
          </AuthRoute>
        ),
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/sign_up',
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

export default router;
