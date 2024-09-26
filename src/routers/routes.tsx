import { createBrowserRouter } from 'react-router-dom';
import LoginPage, { loaderLoginPage } from '../pages/login/Login';
import HomePage from '../pages/home/HomePage';
import NotFoundPage, { loaderNotFoundPage } from '../pages/not-found/NotFound';

const privateRoutes = createBrowserRouter([
    {
        id: 'HomePage',
        path: '/',
        Component: HomePage,
    },
    {
        id: 'NotFound',
        path: '*',
        Component: NotFoundPage,
        loader: loaderNotFoundPage,
    },
]);

const publicRoutes = createBrowserRouter([
    {
        id: 'LoginPage',
        path: '/login',
        Component: LoginPage,
        loader: loaderLoginPage,
    },
    {
        id: 'NotFound',
        path: '*',
        Component: NotFoundPage,
        loader: loaderNotFoundPage,
    },
]);

export { privateRoutes, publicRoutes };
