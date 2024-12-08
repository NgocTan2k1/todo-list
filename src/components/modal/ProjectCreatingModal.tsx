import React, { useCallback, useEffect, useRef, useState } from 'react';

// firebase
// The components
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';

// The customized components
// CSS
import styles from './ProjectCreatingModal.module.css';

// The stores
// The customized hooks
import { useHandleBindingClass } from '../../hooks/useHandleBindingClass';

// The constants
// The interfaces
import { Project } from '../../pages/home/HomePage';

// The globals
export interface IValidation {
    [key: string]: {
        isError: boolean;
        errorMessage: string;
    };
}

export interface IProjectCreatingModal {
    isOpen: boolean;
    onClose: (project?: Project) => void;
    children?: React.ReactNode;
}

const ProjectCreatingModal: React.FC<IProjectCreatingModal> = ({ isOpen, onClose }) => {
    // The customized hooks
    const cx = useHandleBindingClass(styles);

    // states
    const [isLoadingCreateNewProject, setIsLoadingCreateNewProject] = useState(false);
    const timeoutId = useRef<NodeJS.Timeout>();
    const [projectName, setProjectName] = useState<string>('');
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [validate, setValidate] = useState<IValidation>({});

    // effect
    useEffect(() => {
        return () => {
            console.log('===== Unmouted ProjectCreatingModal.tsx component =====');
            clearTimeout(timeoutId.current);
        };
    }, []);

    // functions
    /**
     * The validation function of the form
     */
    const handleValidation = useCallback(() => {
        let isValid = false;
        if (projectName === '') {
            setValidate((prevValidate) => ({
                ...prevValidate,
                projectName: {
                    isError: true,
                    errorMessage: 'Project Name cannot be empty',
                },
            }));
            isValid = true;
        }

        if (startDate === null) {
            setValidate((prevValidate) => ({
                ...prevValidate,
                startDate: {
                    isError: true,
                    errorMessage: 'Start Date cannot be empty',
                },
            }));
            isValid = true;
        }

        if (endDate === null) {
            setValidate((prevValidate) => ({
                ...prevValidate,
                endDate: {
                    isError: true,
                    errorMessage: 'End Date cannot be empty',
                },
            }));
            isValid = true;
        }

        if (endDate !== null && startDate !== null && endDate < startDate) {
            setValidate((prevValidate) => ({
                ...prevValidate,
                startDate: {
                    isError: true,
                    errorMessage: '',
                },
                endDate: {
                    isError: true,
                    errorMessage: '',
                },
                date: {
                    isError: true,
                    errorMessage: 'Please check the values of Start Date and End Date again.',
                },
            }));
            isValid = true;
        }

        return isValid;
    }, [projectName, startDate, endDate]);

    /**
     * The function create a new project
     */
    const handleCreateNewProject = useCallback(() => {
        setIsLoadingCreateNewProject(true);
        if (handleValidation()) {
            setIsLoadingCreateNewProject(false);
            return;
        }
        // =========== START TODO CALL API ==========
        timeoutId.current = setTimeout(() => {
            setIsLoadingCreateNewProject(false);
            handleClose({
                projectName: projectName,
                status: handleSetStatus(startDate),
                startDate: startDate?.format('YYYY/MM/DD'),
                endDate: endDate?.format('YYYY/MM/DD'),
                projectManager: 'Taan',
            });
        }, 2000);
        // =========== END TODO CALL API ==========
    }, [projectName, startDate, endDate]);

    const handleSetStatus = (startDate: Dayjs | null) => {
        if (startDate && startDate > dayjs()) return 'Coming Soon';
        return 'Starting';
    };

    const handleClose = (project?: Project | undefined) => {
        if (project !== undefined) {
            onClose(project);
        } else {
            onClose();
        }
        setProjectName('');
        setStartDate(null);
        setEndDate(null);
        setValidate({});
    };

    return (
        <Dialog
            open={isOpen}
            onClose={() => handleClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={cx('modal__add-project', '!min-w-[40%]')}
        >
            <DialogTitle id="alert-dialog-title" className={cx('modal__title', '!text-[1.8rem] !pb-0')}>
                Create A New Project
            </DialogTitle>
            <DialogContent className={cx('modal__content', '!text-normal !py-[24px]')}>
                <div id="alert-dialog-description" className={cx('modal__group--item', '!text-normal flex flex-col gap-4')}>
                    <TextField
                        error={validate?.projectName?.isError}
                        helperText={validate?.projectName?.errorMessage}
                        id="outlined-required"
                        className={cx('input__item', '!text-normal')}
                        label="Project Name *"
                        value={projectName}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setValidate({
                                ...validate,
                                projectName: {
                                    isError: false,
                                    errorMessage: '',
                                },
                            });
                            setProjectName(event.target.value);
                        }}
                    />
                    {/* <TextField id="outlined-required" className={cx('input__item', '!text-normal')} label="Status" /> */}
                    <div
                        className={cx(
                            'group__date',
                            'relative flex flex-wrap h-auto justify-between items-start max-[785px]:gap-y-4',
                        )}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start Date *"
                                disablePast
                                className={cx(
                                    'date__item',
                                    '!text-normal !w-fit',
                                    'max-[785px]:!w-full !border-rose-600',
                                    validate?.startDate?.isError && 'g__date__item--error',
                                )}
                                value={startDate}
                                onChange={(newValue) => {
                                    setValidate({
                                        ...validate,
                                        startDate: {
                                            isError: false,
                                            errorMessage: '',
                                        },
                                        endDate: {
                                            isError: validate?.date?.isError ? false : validate?.endDate?.isError ? true : false,
                                            errorMessage: validate?.endDate?.isError ? validate?.endDate?.errorMessage : '',
                                        },
                                        date: {
                                            isError: false,
                                            errorMessage: '',
                                        },
                                    });
                                    setStartDate(newValue);
                                }}
                                slotProps={{
                                    textField: {
                                        helperText: validate?.startDate?.errorMessage,
                                    },
                                }}
                            />
                            <div
                                className={cx(
                                    '',
                                    'flex !w-fit !h-[5.6rem] items-center !text-[2.8rem] rotate-180 max-[785px]:!hidden',
                                )}
                            >
                                <KeyboardBackspaceRoundedIcon className={cx('!h-full !text-[2.8rem]')} />
                            </div>
                            <DatePicker
                                label="End Date *"
                                disabled={startDate === null}
                                minDate={startDate || undefined}
                                className={cx(
                                    'date__item',
                                    '!text-normal !w-fit',
                                    'max-[785px]:!w-full',
                                    validate?.endDate?.isError && 'g__date__item--error',
                                )}
                                value={endDate}
                                onChange={(newValue) => {
                                    setValidate({
                                        ...validate,
                                        startDate: {
                                            isError: validate?.date?.isError
                                                ? false
                                                : validate?.startDate?.isError
                                                  ? true
                                                  : false,
                                            errorMessage: validate?.startDate?.isError ? validate?.startDate?.errorMessage : '',
                                        },
                                        endDate: {
                                            isError: false,
                                            errorMessage: '',
                                        },
                                        date: {
                                            isError: false,
                                            errorMessage: '',
                                        },
                                    });
                                    setEndDate(newValue);
                                }}
                                slotProps={{
                                    textField: {
                                        helperText: validate?.endDate?.errorMessage,
                                    },
                                }}
                            />
                            <p
                                className={cx(
                                    '',
                                    !validate?.date?.isError && 'hidden',
                                    'text-[1.2rem] mt-[3px] mx-[1.4rem] text-[#d62f2f]',
                                )}
                            >
                                {validate?.date?.errorMessage}
                            </p>
                        </LocalizationProvider>
                    </div>
                    {/* <TextField
                            required
                            id="outlined-required"
                            className={cx('input__item', '!text-normal')}
                            label="Project Manager"
                        /> */}
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    className={cx('button__item', '')}
                    disabled={isLoadingCreateNewProject}
                    variant="outlined"
                    onClick={() => handleClose()}
                >
                    Cancel
                </Button>
                <LoadingButton
                    className={cx('button__item', '')}
                    disabled={Object.keys(validate)?.some((key) => validate[key]?.isError === true)}
                    loading={isLoadingCreateNewProject}
                    variant="contained"
                    onClick={handleCreateNewProject}
                >
                    Create
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectCreatingModal;
