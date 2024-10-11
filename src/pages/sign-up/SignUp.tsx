import React, { useState } from 'react';

// firebase
// import { firebaseApp } from '../../firebase';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

// components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';

// css
import { styled } from '@mui/material/styles';
import { useHandleNavigation } from '../../hooks/useHandleNavigation';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: '100%',
    padding: 4,
    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
        backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
}));

export const loaderSignUpPage = async (): Promise<Response | string> => {
    return await 'loaderSignUpPage';
};

const SignUp: React.FC = () => {
    // The hooks were customized
    const handleNavigation = useHandleNavigation();

    // state
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');

    /**
     * function to validate form
     * @returns
     */
    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        const confirmPassword = document.getElementById('confirm-password') as HTMLInputElement;
        const name = document.getElementById('name') as HTMLInputElement;

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (password.value && (!confirmPassword.value || confirmPassword.value !== password.value)) {
            setConfirmPasswordError(true);
            setConfirmPasswordErrorMessage('Confirm Password no match!!!');
            // setPasswordError(true);
            // setPasswordErrorMessage('');
            isValid = false;
        } else {
            setConfirmPasswordError(false);
            setConfirmPasswordErrorMessage('');
            // setPasswordError(false);
            // setPasswordErrorMessage('');
        }

        if (!name.value || name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('Name is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        return isValid;
    };

    /**
     * function to submit form sign up
     * @param event Event DOM
     * @returns
     */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (emailError || passwordError || confirmPasswordError || nameError) {
            return;
        }

        const data = new FormData(event.currentTarget);
        const email = String(data.get('email'));
        // const name = String(data.get('name'));
        const password = String(data.get('password'));
        // const allowExtraEmails = String(data.get('allowExtraEmails'));

        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('userCredential:', userCredential);
            console.log('user:', userCredential.user);

            // save user in database

            // redirect /sign-in
            handleNavigation('/sign-in');

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setEmailError(true);
                    setEmailErrorMessage('Email exists');
                    break;
                default:
                    setNameError(true);
                    setEmailError(true);
                    setPasswordError(true);
                    setConfirmPasswordError(true);
                    setNameErrorMessage('The system is experiencing an error, please try again later.');
                    setEmailErrorMessage('The system is experiencing an error, please try again later.');
                    setPasswordErrorMessage('The system is experiencing an error, please try again later.');
                    setConfirmPasswordErrorMessage('The system is experiencing an error, please try again later.');
                    // ===== TODO =====
                    // send mail for admin
                    // === END TODO ===
                    break;
            }
        }
    };

    return (
        <>
            <SignUpContainer direction="column" justifyContent="space-between">
                <Stack
                    sx={{
                        justifyContent: 'center',
                        height: '100dvh',
                        p: 2,
                    }}
                >
                    <Card variant="outlined">
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}
                        >
                            Sign up
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <FormControl>
                                <FormLabel htmlFor="name">Full name</FormLabel>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    placeholder="Jon Snow"
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    placeholder="your@email.com"
                                    name="email"
                                    autoComplete="email"
                                    variant="outlined"
                                    error={emailError}
                                    helperText={emailErrorMessage}
                                    color={passwordError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    placeholder="••••••"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    variant="outlined"
                                    error={passwordError}
                                    helperText={passwordErrorMessage}
                                    color={passwordError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    placeholder="••••••"
                                    type="password"
                                    id="confirm-password"
                                    autoComplete="new-password"
                                    variant="outlined"
                                    error={confirmPasswordError}
                                    helperText={confirmPasswordErrorMessage}
                                    color={confirmPasswordError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox name="allowExtraEmails" color="primary" />}
                                label="I want to receive updates via email."
                            />
                            <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
                                Sign up
                            </Button>
                            <Typography sx={{ textAlign: 'center' }}>
                                Already have an account?{' '}
                                <span>
                                    <Link
                                        className="cursor-pointer"
                                        variant="body2"
                                        sx={{ alignSelf: 'center' }}
                                        onClick={() => {
                                            handleNavigation('/sign-in');
                                        }}
                                    >
                                        Sign in
                                    </Link>
                                </span>
                            </Typography>
                        </Box>
                    </Card>
                </Stack>
            </SignUpContainer>
        </>
    );
};

export default SignUp;
