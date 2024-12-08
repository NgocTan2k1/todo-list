import React, { useEffect, useRef, useState } from 'react';

// firebase
// The components
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';

// The customized components
import BaseNewPage from '../../components/layout/BasePage';
import BaseHeader from '../../components/layout/BaseHeader';
import ProjectItem from './components/ProjectItem';

// CSS
import styles from './HomePage.module.css';

// The stores
import useAuthenticationStores from '../../stores/authenticationStores';

// The customized hooks
import { useHandleBindingClass } from '../../hooks/useHandleBindingClass';
import ProjectCreatingModal from '../../components/modal/ProjectCreatingModal';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from '../../firebase';
import { useHandleNavigation } from '../../hooks/useHandleNavigation';

// The constants

// The interfaces
export interface IValidation {
    [key: string]: {
        isError: boolean;
        errorMessage: string;
    };
}
export interface Project {
    projectName: string;
    status: string;
    startDate: string | undefined;
    endDate: string | undefined;
    projectManager: string;
}

const HomePage: React.FC = () => {
    // The customized hooks
    const cx = useHandleBindingClass(styles);
    const handleNavigation = useHandleNavigation();

    // stores
    // authentication stores
    const setIsLoadingUser = useAuthenticationStores((state) => state.setIsLoadingUser);

    // states
    const [isProjectCreatingModal, setIsProjectCreatingModal] = useState(false);
    const timeoutId = useRef<any>();

    // const projectNameRef = useRef('');
    // const startDateRef = useRef<Dayjs | null>(null);
    // const endDateRef = useRef<Dayjs | null>(null);
    // const validateRef = useRef<IValidation>({});
    const [array, setArray] = useState<Project[]>([
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

    // effect
    useEffect(() => {
        console.log('===== Mouted HomePage.tsx component =====');
        setIsLoadingUser(true);
        // firebase
        const auth = getAuth(firebaseApp);
        const user = auth.currentUser;
        console.log('currentUser:', user);
        if (!user) {
            handleNavigation('/sign-in');
        }
        setIsLoadingUser(false);
        return () => {
            console.log('===== Unmouted HomePage.tsx component =====');
            clearTimeout(timeoutId.current);
        };
    }, []);

    // functions
    const handleShowProject = (project: Project | undefined) => {
        if (project !== undefined) {
            setArray((prevProjects) => [...prevProjects, project]);
        }

        setIsProjectCreatingModal(false);
    };

    return (
        <BaseNewPage tailwindCSS={cx('wrapper__home-page', 'flex flex-col h-full ')}>
            <BaseHeader pageName="HomePage" />
            <ProjectCreatingModal isOpen={isProjectCreatingModal} onClose={handleShowProject} />
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
                        onClick={() => setIsProjectCreatingModal(true)}
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
