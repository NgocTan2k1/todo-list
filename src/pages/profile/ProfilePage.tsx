import React from 'react';

// firebase
import { getAuth, signOut } from 'firebase/auth';
import { firebaseApp } from '../../firebase';

// The components
// The customized components
import BaseNewPage from '../../components/layout/BasePage';

// CSS
// The stores
// The customized hooks
// The constants

const ProfilePage: React.FC = () => {
    // firebase
    const auth = getAuth(firebaseApp);

    return (
        <BaseNewPage>
            <div className="text-9xl bg-blue-500 text-white p-5">Profile Page</div>{' '}
            <button
                onClick={() => {
                    signOut(auth);
                }}
            >
                SignOut
            </button>
        </BaseNewPage>
    );
};

export default ProfilePage;
