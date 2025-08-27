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
import ProjectCreatingModal from '../../components/modal/ProjectCreatingModal';

// CSS
import styles from './HomePage.module.css';

// The stores
import useAuthenticationStores from '../../stores/authenticationStores';

// The customized hooks
import { useHandleBindingClass } from '../../hooks/useHandleBindingClass';
import { useHandleNavigation } from '../../hooks/useHandleNavigation';

// types
import { Project } from '../../types/Project';

// The constants

// The interfaces
export interface IValidation {
    [key: string]: {
        isError: boolean;
        errorMessage: string;
    };
}

const HomePage: React.FC = () => {
    // The customized hooks
    const cx = useHandleBindingClass(styles);
    const handleNavigation = useHandleNavigation();

    // stores
    // authentication stores
    const setIsLoadingUser = useAuthenticationStores((state) => state.setIsLoadingUser);
    const isLogged = useAuthenticationStores((state) => state.isLogged);

    // states
    const [isProjectCreatingModal, setIsProjectCreatingModal] = useState(false);
    const timeoutId = useRef<any>();

    // const projectNameRef = useRef('');
    // const startDateRef = useRef<Dayjs | null>(null);
    // const endDateRef = useRef<Dayjs | null>(null);
    // const validateRef = useRef<IValidation>({});
    const [array, setArray] = useState<Project[] | []>([]);

    // effect
    useEffect(() => {
        console.log('===== Mouted HomePage.tsx component =====');
        setIsLoadingUser(true);
        if (!isLogged) {
            handleNavigation('/sign-in');
        }
        setIsLoadingUser(false);
        return () => {
            console.log('===== Unmouted HomePage.tsx component =====');
            clearTimeout(timeoutId.current);
        };
    }, [isLogged]);

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
                        <ProjectItem key={index} project={project} />
                    ))}
                </Box>
            </div>
        </BaseNewPage>
    );
};

export default HomePage;
