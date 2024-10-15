import React from 'react';
import moment from 'moment';

// firebase
// The components
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

// The customized components
// CSS
import styles from './Layout.module.css';

// The stores
// The customized hooks
import { useHandleBindingClass } from '../../hooks/useHandleBindingClass';

// The constants

export interface IBaseHeader {
    pageName: string;
    time?: boolean;
    children?: React.ReactNode;
    isNotification?: boolean;
    notificationQuanlity?: number;
}

const BaseHeader: React.FC<IBaseHeader> = ({ pageName, time, isNotification, notificationQuanlity }) => {
    const cx = useHandleBindingClass(styles);

    return (
        <div
            className={cx(
                '',
                'relative flex flex-col justify-between text-[1.8rem] min-h-[5.2rem] h-auto bg-white p-1 rounded-xl max-[639px]:m-[1.2rem]  m-[2.4rem]',
            )}
        >
            <h2 className={cx('', 'pl-[1.2rem]')}>{pageName}</h2>
            {time && (
                <p className={cx('', 'text-[#ADA7A7] my-1 text-[1.2rem] pl-[1.4rem]')}>
                    {`${moment(new Date()).format('ddd, DD MMM YYYY')}`}
                </p>
            )}
            {isNotification && (
                <Badge
                    className={cx('', '!absolute w-[2.4rem] h-[2.4rem] top-[50%] translate-y-[-50%] right-[1.2rem]')}
                    badgeContent={notificationQuanlity}
                    color="primary"
                >
                    <NotificationsNoneIcon className={cx('', '!w-[2.4rem] !h-[2.4rem] hover:cursor-pointer')} color="action" />
                </Badge>
            )}
            <Divider className={cx('container', 'flex-0 min-w-full ')} />
        </div>
    );
};

export default BaseHeader;
