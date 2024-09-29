import { createBrowserRouter } from 'react-router-dom';
import SignInPage, { loaderSignInPage } from '../pages/sign-in/SignIn';
import SignUpPage, { loaderSignUpPage } from '../pages/sign-up/SignUp';
import HomePage from '../pages/home/HomePage';
import NotFoundPage, { loaderNotFoundPage } from '../pages/not-found/NotFound';

const privateRoutes = createBrowserRouter([
    {
        id: 'HomePage',
        path: '/home',
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
        id: 'SignIn',
        path: '/sign-in',
        Component: SignInPage,
        loader: loaderSignInPage,
    },
    {
        id: 'SignUp',
        path: '/sign-up',
        Component: SignUpPage,
        loader: loaderSignUpPage,
    },
    {
        id: 'NotFound',
        path: '*',
        Component: NotFoundPage,
        loader: loaderNotFoundPage,
    },
]);

export { privateRoutes, publicRoutes };
