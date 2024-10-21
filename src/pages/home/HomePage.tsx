import React, { useState } from 'react';

// firebase
// The components
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// The customized components
import BaseNewPage from '../../components/layout/BasePage';
import BaseHeader from '../../components/layout/BaseHeader';

// CSS
import styles from './HomePage.module.css';

// The stores
// The customized hooks
import { useHandleBindingClass } from '../../hooks/useHandleBindingClass';
import ProjectItem from './components/ProjectItem';

// The constants

const HomePage: React.FC = () => {
    // The customized hooks
    const cx = useHandleBindingClass(styles);

    const [array, setArray] = useState([
        {
            projectName: 'ProjectName1',
            status: 'pending',
            startDate: '2024/09/01',
            endDate: undefined,
            projectManager: 'Tanpn',
        },
        {
            projectName: 'ProjectName1',
            status: 'done',
            startDate: '2024/09/01',
            endDate: '2024/20/10',
            projectManager: 'Tanpn',
        },
        {
            projectName: 'ProjectName1',
            status: 'onprogress',
            startDate: '2024/09/01',
            endDate: undefined,
            projectManager: 'Tanpn',
        },
        {
            projectName: 'ProjectName1',
            status: 'fail',
            startDate: '2024/09/01',
            endDate: '2024/09/10',
            projectManager: 'Tanpn',
        },
    ]);
    console.log(array);
    return (
        <BaseNewPage tailwindCSS={cx('wrapper__home-page', 'flex flex-col h-full ')}>
            <BaseHeader pageName="HomePage" />
            <div className={cx('', 'flex-full h-full overflow-y-auto px-2')}>
                <Box
                    className={cx(
                        '',
                        'flex flex-wrap sm:w-[28rem] max-[639px]:w-[24rem] md:w-[59rem] lg:w-[90rem] 2xl:w-[121rem] min-[1660px]:w-[152rem] h-auto sm:justify-center md:justify-start gap-x-12 gap-y-12 my-4 mx-auto',
                        'max-[639px]:!min-w-[24rem] max-[639px]:!min-h-[20rem]',
                    )}
                >
                    <Paper
                        key={0}
                        component={Button}
                        className={cx(
                            '',
                            '!min-w-[28rem] !min-h-[24rem] !max-w-[28rem] !max-h-[24rem] !rounded-3xl hover:bg-neutral-100',
                            'max-[639px]:!min-w-[24rem] max-[640px]:!min-h-[20rem] ',
                        )}
                        elevation={3}
                        onClick={() =>
                            setArray((prev) => {
                                return [
                                    ...prev,
                                    {
                                        projectName: 'ProjectName1',
                                        status: 'pending',
                                        startDate: '2024/09/01',
                                        endDate: undefined,
                                        projectManager: 'Tanpn',
                                    },
                                ];
                            })
                        }
                    >
                        <AddCircleOutlineIcon className={cx('item__icon', '!w-[4rem] !h-[4rem]')} />
                    </Paper>
                    {array.map((project, index) => (
                        <ProjectItem
                            key={index}
                            projectName={project.projectName}
                            status={project.status}
                            startDate={project.startDate}
                            endDate={project.endDate}
                            projectManager={project.projectManager}
                        />
                    ))}
                </Box>
            </div>
        </BaseNewPage>
    );
};

export default HomePage;
