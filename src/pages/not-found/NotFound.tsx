import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthenticationStores from '../../stores/authenticationStores';
// import useAuthenticationStores from '../../stores/authenticationStores';

export const loaderNotFoundPage = async (): Promise<string> => {
    // const isLogged = useAuthenticationStores((state) => state.isLogged);
    // console.log(isLogged);

    return 'loaderNotFoundPage';
};

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();
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
            navigate('/sign-in');
        } else {
            navigate('/home');
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
