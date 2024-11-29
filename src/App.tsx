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
import './assets/styles/App.css';

// The stores
import useAuthenticationStores from './stores/authenticationStores';
import useCommonStores from './stores/commonStores';

// The customized hooks
// The constants

const App: React.FC = () => {
    // firebase
    const auth = getAuth(firebaseApp);

    // the hooks customized

    // stores
    // authentication stores
    const isLogged = useAuthenticationStores((state) => state.isLogged);
    const setIsLogged = useAuthenticationStores((state) => state.setIsLogged);
    const isLoadingUser = useAuthenticationStores((state) => state.isLoadingUser);
    const setIsLoadingUser = useAuthenticationStores((state) => state.setIsLoadingUser);
    // common stores
    const isLoading = useCommonStores((state) => state.isLoading);
    const setIsLoading = useCommonStores((state) => state.setIsLoading);

    // states
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [routes, setRoutes] = useState<IRoute[] | []>([]);

    useEffect(() => {
        setIsLoading(false);
        onAuthStateChanged(auth, (user) => {
            setIsLoadingUser(true);
            if (user) {
                setIsLogged(true);
                setRoutes(privateRoutes);
            } else {
                setIsLogged(false);
                setRoutes(publicRoutes);
            }
            setIsLoadingUser(false);
        });
        return () => {
            console.log('===== Unmouted App.tsx component =====');
        };
    }, []);

    if (routes.length === 0 || isLoadingUser) {
        return (
            <div className="flex h-[100vh] w-full items-center justify-center z-[99999] ">
                <CircularIndeterminate />
            </div>
        );
    }

    return (
        <div className="w-full h-full">
            {isLoading && <LinearIndeterminate />}
            <Box key={'wrapper'} className="flex !max-h-full !max-w-full !h-full !w-full">
                {isLogged && <BaseMenu />}
                <Box
                    key={'item'}
                    className="flex-full !max-h-full w-[calc(100%-57px)] overflow-hidden"
                    component="main"
                    sx={{ p: 0 }}
                >
                    {/* <div
                        className={`${isClipPath ? 'top--in' : ''} ${!isClipPath ? 'top--out' : ''} z-[999] w-full h-[50%] bg-slate-600`}
                    ></div>
                    <div
                        className={`${isClipPath ? 'bot--in' : ''} ${!isClipPath ? 'bot--out' : ''} z-[999] w-full h-[50%] bg-[blue]`}
                    ></div> */}

                    <Routes>
                        {routes?.map((route, index) => {
                            return <Route key={index + '-0'} path={route.path} Component={route.Component} />;
                        })}

                        {routes?.map((route, index) => {
                            return (
                                route?.children &&
                                route?.children.map((child, childIndex) => (
                                    <Route
                                        key={index + '-' + childIndex}
                                        path={route.path + child.path}
                                        Component={child.Component}
                                    />
                                ))
                            );
                        })}
                    </Routes>
                </Box>
            </Box>
        </div>
    );
};

export default App;
