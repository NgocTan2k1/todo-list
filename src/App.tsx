import React, { useEffect } from 'react';
import './assets/styles/App.css';
import { RouterProvider } from 'react-router-dom';

// routes
import { privateRoutes, publicRoutes } from './routers/routes';

// Stores
import useAuthenticationStores from './stores/authenticationStores';
import useCommonStores from './stores/commonStores';
import LinearIndeterminate from './components/loading/linear-loading/LinearLoading';

const App: React.FC = () => {
    // stores
    const isLoading = useCommonStores((state) => state.isLoading);
    const isLogged = useAuthenticationStores((state) => state.isLogged);
    const setIsLoading = useCommonStores((state) => state.setIsLoading);

    useEffect(() => {
        setIsLoading(false);

        return () => {
            console.log('===== Unmouted App.tsx =====');
        };
    }, []);

    return (
        <>
            {isLoading && <LinearIndeterminate />}
            {isLogged ? <RouterProvider router={privateRoutes} /> : <RouterProvider router={publicRoutes} />}
        </>
    );
};

export default App;
