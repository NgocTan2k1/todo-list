import React from 'react';
// import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

export interface IBaseModal {
    isOpen: boolean;
    setIsOpen: () => void;
    tailwindCSSModal?: string;
    tailwindCSSChildren?: string;
    children?: React.ReactNode;
}

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         modal: {
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//         },
//         paper: {
//             backgroundColor: theme.palette.background.paper,
//             border: '2px solid #000',
//             boxShadow: theme.shadows[5],
//             padding: theme.spacing(2, 4, 3),
//         },
//     }),
// );

const BaseModal: React.FC<IBaseModal> = ({ isOpen, setIsOpen, children, tailwindCSSModal, tailwindCSSChildren }) => {
    // const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={`flex items-center justify-center ${tailwindCSSModal}`}
            open={isOpen}
            onClose={setIsOpen}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <div
                    className={`bg-white border border-solid border-black shadow-xl focus-visible:outline-none ${tailwindCSSChildren}`}
                >
                    {children}
                </div>
            </Fade>
        </Modal>
    );
};

export default BaseModal;
