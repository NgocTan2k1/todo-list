import React from 'react';

// firebase
// The components
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// The customized components
// CSS
import styles from './BaseModal.module.css';

// The Stores
// The customized hooks
import { useHandleBindingClass } from '../../hooks/useHandleBindingClass';

// The constants

export interface IBaseModal {
    isOpen: boolean;
    setIsOpen: () => void;
    tailwindCSSModal?: string;
    tailwindCSSChildren?: string;
    children?: React.ReactNode;
}

const BaseModal: React.FC<IBaseModal> = ({ isOpen, setIsOpen, children, tailwindCSSModal, tailwindCSSChildren }) => {
    // The customized hooks
    const cx = useHandleBindingClass(styles);

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={cx('wrapper__base-modal', `flex items-center justify-center ${tailwindCSSModal}`)}
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
