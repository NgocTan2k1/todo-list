import React, { ReactElement } from 'react';

import HomePage from '../pages/home/HomePage';
import ProfilePage from '../pages/profile/ProfilePage';
import SignInPage, { loaderSignInPage } from '../pages/sign-in/SignIn';
import SignUpPage, { loaderSignUpPage } from '../pages/sign-up/SignUp';
import NotFoundPage, { loaderNotFoundPage } from '../pages/not-found/NotFound';

import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import ManageHistoryOutlinedIcon from '@mui/icons-material/ManageHistoryOutlined';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

export interface IRoute {
    id: string;
    path: string;
    Component: React.FC;
    loader?: () => void;
    tooltipText?: string;
    primaryText?: string;
    isMenu: boolean;
    IconMenu?: ReactElement;
    children?: IRoute[];
}

export const privateRoutes: IRoute[] = [
    {
        id: 'HomePage',
        path: '/home',
        Component: HomePage,
        tooltipText: 'Home',
        primaryText: 'Home',
        isMenu: true,
        IconMenu: <HomeIcon />,
    },
    {
        id: 'WorkPage',
        path: '/my-work/:userId',
        Component: ProfilePage,
        tooltipText: 'My Work',
        primaryText: 'My Work',
        isMenu: true,
        IconMenu: <BusinessCenterIcon />,
        children: [
            {
                id: 'My Projects',
                path: '/projects',
                Component: HomePage,
                tooltipText: 'Projects',
                primaryText: 'My Projects',
                isMenu: true,
                IconMenu: <ManageHistoryOutlinedIcon />,
            },
            {
                id: 'My Tasks',
                path: '/tasks',
                Component: HomePage,
                tooltipText: 'Tasks',
                primaryText: 'My Tasks',
                isMenu: true,
                IconMenu: <AssignmentRoundedIcon />,
            },
        ],
    },
    {
        id: 'ProfilePage',
        path: '/profile/:id',
        Component: ProfilePage,
        tooltipText: 'Profile',
        primaryText: 'My Profile',
        isMenu: true,
        IconMenu: <AccountCircleIcon />,
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
