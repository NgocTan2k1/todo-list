import React from 'react';
import './assets/styles/App.css';
import { RouterProvider } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routers/routes';

const App: React.FC = () => {
    const isLogin = true;

    return <>{isLogin ? <RouterProvider router={privateRoutes} /> : <RouterProvider router={publicRoutes} />}</>;
};

export default App;
