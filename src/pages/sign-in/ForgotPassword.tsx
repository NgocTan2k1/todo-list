import React from 'react';

// firebase
// The components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';

// The customized components
// CSS
// The stores
// The customized hooks
// The constants
interface IForgotPassword {
    open: boolean;
    handleClose: () => void;
}

const ForgotPassword: React.FC<IForgotPassword> = ({ open, handleClose }) => {
    const handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void = (event) => {
        const data = new FormData(event.currentTarget);
        console.log('call reset password api with', {
            email: data.get('email'),
        });
        event.preventDefault();
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleOnSubmit,
            }}
        >
            <DialogTitle>Reset password</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                <DialogContentText>
                    Enter your account&apos;s email address, and we&apos;ll send you a link to reset your password.
                </DialogContentText>
                <OutlinedInput
                    autoFocus
                    required
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email address"
                    placeholder="Email address"
                    type="email"
                    fullWidth
                />
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" type="submit">
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ForgotPassword;
