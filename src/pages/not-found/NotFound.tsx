import React, { useEffect, useState } from 'react';

// The customized components
// CSS
// The stores
import useAuthenticationStores from '../../stores/authenticationStores';

// The customized hooks
import { useHandleNavigation } from '../../hooks/useHandleNavigation';

// The constants

export const loaderNotFoundPage = async (): Promise<string> => {
    // const isLogged = useAuthenticationStores((state) => state.isLogged);
    // console.log(isLogged);

    return 'loaderNotFoundPage';
};

const NotFoundPage: React.FC = () => {
    // be customzied hooks
    const handleNavigation = useHandleNavigation();
    const isLogged = useAuthenticationStores((state) => state.isLogged);
    const [countDown, setCountDown] = useState(5);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleNavigate();
        }, 5000);
        const timeintervalId = setInterval(() => {
            setCountDown((prevCountDown) => prevCountDown - 1);
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(timeintervalId);
        };
    }, []);

    /**
     * function navigate
     */
    const handleNavigate = () => {
        if (!isLogged) {
            handleNavigation('/sign-in');
        } else {
            handleNavigation('/home');
        }
    };
    return (
        <div className="absolute z-[5000] top-0 bottom-0 right-0 left-0 bg-slate-100">
            <h2>NotFound Page</h2>
            <button className="link underline" onClick={handleNavigate}>
                The page will be redirected to the <strong>{isLogged ? 'Home' : 'Sign In'}</strong> page after {countDown}{' '}
                seconds.
            </button>
        </div>
    );
};

export default NotFoundPage;
