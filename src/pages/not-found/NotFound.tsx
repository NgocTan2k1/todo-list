import React, { useEffect, useState } from 'react';
import useAuthenticationStores from '../../stores/authenticationStores';
import { useHandleNavigation } from '../../hooks/useHandleNavigation';
// import useAuthenticationStores from '../../stores/authenticationStores';

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
        <div>
            <h2>NotFound Page</h2>
            <button className="link underline" onClick={handleNavigate}>
                The page will be redirected to the <strong>{isLogged ? 'Home' : 'Sign In'}</strong> page after {countDown}{' '}
                seconds.
            </button>
        </div>
    );
};

export default NotFoundPage;
