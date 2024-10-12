import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { type IRoute, privateRoutes, publicRoutes } from './routers/routes';
// firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from './firebase';

// The components
import Box from '@mui/material/Box';

// The customized components
import LinearIndeterminate from './components/loading/linear-loading/LinearLoading';
import CircularIndeterminate from './components/loading/circular-loading/CircularLoading';
import BaseMenu from './components/layout/BaseMenu';

// CSS
// The stores
import useAuthenticationStores from './stores/authenticationStores';
import useCommonStores from './stores/commonStores';

// The customized hooks
// The constants

const App: React.FC = () => {
    // firebase
    const auth = getAuth(firebaseApp);

    // stores
    const isLogged = useAuthenticationStores((state) => state.isLogged);
    const setIsLogged = useAuthenticationStores((state) => state.setIsLogged);
    const isLoading = useCommonStores((state) => state.isLoading);
    const setIsLoading = useCommonStores((state) => state.setIsLoading);

    // states
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [routes, setRoutes] = useState<IRoute[] | []>([]);

    useEffect(() => {
        setIsLoading(false);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogged(true);
                setRoutes(privateRoutes);
            } else {
                setIsLogged(false);
                setRoutes(publicRoutes);
            }
        });

        return () => {
            console.log('===== Unmouted App.tsx component =====');
        };
    }, [isLogged]);

    if (routes.length === 0) {
        return (
            <div className="flex h-[100vh] w-full items-center justify-center z-[9999] ">
                <CircularIndeterminate />
            </div>
        );
    }

    return (
        <div className="h-[100vh]">
            {isLoading && <LinearIndeterminate />}
            <Box className="flex h-full">
                {isLogged && <BaseMenu />}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Routes>
                        {routes?.map((route) => <Route key={route.id} path={route.path} Component={route.Component}></Route>)}
                    </Routes>
                </Box>
            </Box>
        </div>
    );
};

export default App;
