import React from 'react';

// firebase
import { getAuth } from 'firebase/auth';
import { firebaseApp } from '../../firebase';

// The components
// The customized components
import BaseNewPage from '../../components/layout/BasePage';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

// CSS
import styles from './ProfilePage.module.css';
// The stores
// The customized hooks
import { useHandleBindingClass } from '../../hooks/useHandleBindingClass';
import moment from 'moment';
// The constants

const ProfilePage: React.FC = () => {
    // The customized hooks
    const cx = useHandleBindingClass(styles);

    // firebase
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const auth = getAuth(firebaseApp);

    return (
        <BaseNewPage
            tailwindCSS={cx(
                'wrapper__profile-page',
                'flex flex-col h-full w-full over overflow-hidden max-[639px]:p-[1.4rem] max-[639px]:p-[0.7rem] p-[2.4rem] bg-[#F9F9F9]',
            )}
        >
            <div className={cx('title', 'relative text-[1.8rem] h-auto bg-white p-1 rounded-xl')}>
                <h2 className={cx('', 'pl-[1.2rem]')}>Welcome, My Name</h2>
                <p className={cx('', 'text-[#ADA7A7] my-1 text-[1.2rem] pl-[1.4rem]')}>
                    {`${moment(new Date()).format('ddd, DD MMM YYYY')}`}
                </p>
                <Badge
                    className={cx('', '!absolute w-[2.4rem] h-[2.4rem] top-[50%] translate-y-[-50%] right-[1.2rem]')}
                    badgeContent={4}
                    color="primary"
                >
                    <NotificationsNoneIcon className={cx('', '!w-[2.4rem] !h-[2.4rem] hover:cursor-pointer')} color="action" />
                </Badge>
                <Divider className={cx('container', 'flex-0 min-w-full ')} />
            </div>
            <div
                className={cx('container', 'flex-full overflow-y-auto min-w-full md:mt-[2.4rem] bg-white shadow-xl rounded-xl')}
            ></div>
        </BaseNewPage>
    );
};

export default ProfilePage;
