import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { firebaseApp } from '../../firebase';

const HomePage: React.FC = () => {
    // firebase
    const auth = getAuth(firebaseApp);

    return (
        <>
            <div className="text-9xl bg-blue-500 text-white p-5">Home Page</div>{' '}
            <button
                onClick={() => {
                    signOut(auth);
                }}
            >
                SignOut
            </button>
        </>
    );
};

export default HomePage;
