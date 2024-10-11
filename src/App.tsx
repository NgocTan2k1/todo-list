import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routers/routes';

// firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from './firebase';

// components
import LinearIndeterminate from './components/loading/linear-loading/LinearLoading';
import CircularIndeterminate from './components/loading/circular-loading/CircularLoading';

// stores
import useAuthenticationStores from './stores/authenticationStores';
import useCommonStores from './stores/commonStores';

// the customized hooks

// css
import './assets/styles/App.css';

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
    const [routes, setRoutes] = useState<any>(undefined);

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

    if (!routes) {
        return (
            <div className="flex h-[100vh] w-full items-center justify-center ">
                <CircularIndeterminate />
            </div>
        );
    }

    return (
        <>
            {isLoading && <LinearIndeterminate />}
            {routes && <RouterProvider router={routes} />}
        </>
    );
};

export default App;
