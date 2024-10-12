import React from 'react';

import HomePage from '../pages/home/HomePage';
import ProfilePage from '../pages/profile/ProfilePage';
import SignInPage, { loaderSignInPage } from '../pages/sign-in/SignIn';
import SignUpPage, { loaderSignUpPage } from '../pages/sign-up/SignUp';
import NotFoundPage, { loaderNotFoundPage } from '../pages/not-found/NotFound';

export interface IRoute {
    id: string;
    path: string;
    Component: React.FC;
    loader?: () => void;
    tooltipText?: string;
    primaryText?: string;
    isMenu: boolean;
}

export const privateRoutes: IRoute[] = [
    {
        id: 'HomePage',
        path: '/home',
        Component: HomePage,
        tooltipText: 'Home',
        primaryText: 'Home',
        isMenu: true,
    },
    {
        id: 'ProfilePage',
        path: '/profile/:id',
        Component: ProfilePage,
        tooltipText: 'Profile',
        primaryText: 'Your Profile',
        isMenu: true,
    },
    {
        id: 'NotFound',
        path: '*',
        Component: NotFoundPage,
        loader: loaderNotFoundPage,
        isMenu: false,
    },
];

export const publicRoutes: IRoute[] = [
    {
        id: 'SignIn',
        path: '/sign-in',
        Component: SignInPage,
        loader: loaderSignInPage,
        isMenu: false,
    },
    {
        id: 'SignUp',
        path: '/sign-up',
        Component: SignUpPage,
        loader: loaderSignUpPage,
        isMenu: false,
    },
    {
        id: 'NotFound',
        path: '*',
        Component: NotFoundPage,
        loader: loaderNotFoundPage,
        isMenu: false,
    },
];
