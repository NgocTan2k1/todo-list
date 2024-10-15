import React from 'react';

// firebase
import { getAuth } from 'firebase/auth';
import { firebaseApp } from '../../firebase';

// The components
// The customized components
import BaseNewPage from '../../components/layout/BasePage';

// CSS
import styles from './ProfilePage.module.css';
// The stores
// The customized hooks
import { useHandleBindingClass } from '../../hooks/useHandleBindingClass';
import BaseHeader from '../../components/layout/BaseHeader';

// The constants

const ProfilePage: React.FC = () => {
    // The customized hooks
    const cx = useHandleBindingClass(styles);

    // firebase
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const auth = getAuth(firebaseApp);

    return (
        <BaseNewPage tailwindCSS={cx('wrapper__profile-page', 'flex flex-col h-full w-full')}>
            {/* <div
                className={cx('title', 'relative text-[1.8rem] h-auto bg-white p-1 rounded-xl max-[639px]:m-[1.2rem] m-[2.4rem]')}
            >
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
            </div> */}
            <BaseHeader pageName="Welcome, Taan" time={true} isNotification={true} notificationQuanlity={20} />
            <div
                className={cx(
                    '',
                    'flex-full overflow-y-auto min-w-auto bg-white shadow-xl rounded-xl max-[639px]:mx-[1.2rem] mx-[2.4rem]',
                )}
            ></div>
        </BaseNewPage>
    );
};

export default ProfilePage;
