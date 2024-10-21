import React from 'react';

// firebase
// The components
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';

// The customized components

// CSS
import styles from './ProjectItem.module.css';

// The stores
// The customized hooks
import { useHandleBindingClass } from '../../../hooks/useHandleBindingClass';

// The constants
export interface IProjectItem {
    key: string | number;
    status: string;
    projectName: string;
    startDate: string;
    endDate: string | undefined;
    projectManager: string;
}
const ProjectItem: React.FC<IProjectItem> = (project: IProjectItem) => {
    const cx = useHandleBindingClass(styles);

    return (
        <Paper
            component={Button}
            className={cx(
                '',
                'flex flex-col gap-2 !justify-start !items-start !min-w-[28rem] !min-h-[24rem] !max-w-[28rem] !max-h-[24rem] !rounded-3xl hover:bg-neutral-100 !normal-case',
                'max-[639px]:!min-w-[24rem] max-[639px]:!min-h-[20rem]',
            )}
            elevation={3}
        >
            <div className={cx('', '!flex w-full justify-center items-center h-[calc(100%-11.2rem-2rem)]')}>
                <h2 className={cx('project-name', 'w-full text-center text-[1.8rem]')}>{project.projectName}</h2>
            </div>
            <div className={cx('', 'w-full')}>
                <div className={cx('', 'flex gap-4 px-8')}>
                    <div className={cx('', 'flex text-normal min-w-[6.4rem] justify-between')}>
                        <strong className={cx('', 'text-normal')}>Status</strong>
                        <strong className={cx('', 'text-normal')}>:</strong>
                    </div>
                    <p className={cx('', 'text-normal uppercase')}>{project.status}</p>
                </div>
                <div className={cx('', 'flex gap-4 px-8')}>
                    <div className={cx('', 'flex text-normal min-w-[6.4rem] justify-between')}>
                        <strong className={cx('', 'text-normal')}>Start</strong>
                        <strong className={cx('', 'text-normal')}>:</strong>
                    </div>
                    <p className={cx('', 'text-normal font-normal')}>{project.startDate}</p>
                </div>
                <div className={cx('', 'flex gap-4 px-8')}>
                    <div className={cx('', 'flex text-normal min-w-[6.4rem] justify-between')}>
                        <strong className={cx('', 'text-normal')}>End</strong>
                        <strong className={cx('', 'text-normal')}>:</strong>
                    </div>
                    <p className={cx('', 'text-normal font-normal')}>{project.endDate || project.status}</p>
                </div>
                <div className={cx('', 'flex gap-4 px-8 w-full')}>
                    <div className={cx('', 'flex text-normal min-w-[6.4rem] justify-between')}>
                        <strong className={cx('', 'text-normal')}>PM</strong>
                        <strong className={cx('', 'text-normal')}>:</strong>
                    </div>
                    <p
                        className={cx(
                            '',
                            'text-normal font-normal max-w-[calc(100%-6.4rem-1.rem)] overflow-hidden text-ellipsis',
                        )}
                    >
                        {project.projectManager}
                    </p>
                </div>
            </div>
        </Paper>
    );
};

export default ProjectItem;
